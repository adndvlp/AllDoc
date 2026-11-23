import {ensureSyntaxTree,syntaxTree} from '@codemirror/language';
import type {Completion,CompletionSource} from '@codemirror/autocomplete';
import type {RuntimeSchema} from './contracts.ts';

type Node=ReturnType<typeof syntaxTree>['topNode'];
type Token={node:Node;text:string;name:string;from:number;to:number};
type Source={name:string;alias:string;columns:readonly string[]};
type Scope={sources:Source[];ctes:Map<string,readonly string[]>;tokens:Token[];select:number;from:number};
const key=(name:string)=>name.toLowerCase();
const identifier=(value:string)=>value.startsWith('[')?value.slice(1,-1).replaceAll(']]',']')
 :value.startsWith('"')?value.slice(1,-1).replaceAll('""','"'):value.startsWith('`')?value.slice(1,-1).replaceAll('``','`'):value;
const quote=(value:string)=>/^[a-z_][a-z_0-9]*$/i.test(value)?value:'"'+value.replaceAll('"','""')+'"';
const isID=(token:Token|undefined)=>!!token&&/^(Identifier|QuotedIdentifier|CompositeIdentifier)$/.test(token.name);
const word=(token:Token|undefined,name:string)=>token?.name==='Keyword'&&key(token.text)===name;
const endFrom=new Set(['where','group','having','order','limit','offset','union','intersect','except','returning','window',';']);

/** Resolves only declared names and simple projections; it never runs SQL. */
export function sqlSchemaCompletion(schema:RuntimeSchema,base:CompletionSource):CompletionSource{
 const entities=new Map(schema.entities.map(entity=>[key(entity.name),{name:entity.name,columns:entity.columns.map(column=>column.name)}]));
 return async context=>{
  if(context.aborted)return null;
  const tree=ensureSyntaxTree(context.state,context.state.doc.length,30)??syntaxTree(context.state);
  const at=tree.resolveInner(context.pos,-1);
  for(let node:Node|null=at;node;node=node.parent)if(/^(String|LineComment|BlockComment)$/.test(node.name))return null;
  const document=context.state.doc;
  function tokens(node:Node):Token[]{
   const list:Token[]=[];
   for(let child=node.firstChild;child;child=child.nextSibling){
    if(!/Comment/.test(child.name)&&!['(',')',';'].includes(child.name))list.push({node:child,text:document.sliceString(child.from,child.to),name:child.name,from:child.from,to:child.to});
   }
   return list;
  }
  function path(token:Token):string[]{
   return token.name==='CompositeIdentifier'?tokens(token.node).filter(t=>isID(t)).map(t=>identifier(t.text)):[identifier(token.text)];
  }
  function scope(node:Node,inherited:Map<string,readonly string[]>,depth=0,position?:number):Scope{
   const list=tokens(node);const ctes=new Map(inherited);const sources:Source[]=[];
   if(depth>12)return {sources,ctes,tokens:list,select:-1,from:-1};
   let i=0;
   if(word(list[i],'with')){
    i++;if(word(list[i],'recursive'))i++;
    while(isID(list[i])){
     const name=identifier(list[i++].text);let declared:string[]|undefined;
     if(list[i]?.name==='Parens'){declared=tokens(list[i++].node).filter(isID).map(t=>identifier(t.text));}
     if(!word(list[i++],'as'))break;
     if(word(list[i],'not'))i++;
     if(word(list[i],'materialized'))i++;
     const query=list[i++];if(query?.name!=='Parens')break;
     if(declared)ctes.set(key(name),declared);
     ctes.set(key(name),declared??projection(scope(query.node,ctes,depth+1)));
     if(list[i]?.text!==',')break;i++;
    }
   }
   let select=list.findIndex((token,index)=>index>=i&&word(token,'select'));
   if(position!==undefined)for(let j=Math.max(select,0);j<list.length;j++)if(word(list[j],'select')&&list[j].from<position)select=j;
   let from=select<0?-1:list.findIndex((token,index)=>index>select&&word(token,'from'));
   let expectsSource=from>=0;
   for(let j=from+1;from>=0&&j<list.length;j++){
    const token=list[j];if(token.name==='Keyword'&&endFrom.has(key(token.text)))break;
    if(token.text===','||word(token,'join')){expectsSource=true;continue;}
    if(!expectsSource)continue;
    if(!isID(token)&&token.name!=='Parens')continue;
    expectsSource=false;let name:string,columns:readonly string[];
    if(token.name==='Parens'){name='';columns=projection(scope(token.node,ctes,depth+1));}
    else {name=path(token).at(-1)!;columns=ctes.get(key(name))??entities.get(key(name))?.columns??[];}
    let alias=name;
    if(word(list[j+1],'as')&&isID(list[j+2])){alias=identifier(list[j+2].text);j+=2;}
    else if(isID(list[j+1]))alias=identifier(list[++j].text);
    sources.push({name,alias,columns});
   }
   return {sources,ctes,tokens:list,select,from};
  }
  function projection(value:Scope):string[]{
   if(value.select<0)return [];
   const end=value.from<0?value.tokens.length:value.from;
   const groups:Token[][]=[[]];
   for(const token of value.tokens.slice(value.select+1,end)){
    if(word(token,'distinct')||word(token,'all'))continue;
    if(token.text===',')groups.push([]);else groups.at(-1)!.push(token);
   }
   const names:string[]=[];
   for(const group of groups){
    const as=group.findIndex(token=>word(token,'as'));
    if(as>=0&&isID(group[as+1])){names.push(identifier(group[as+1].text));continue;}
    const star=group.at(-1)?.text==='*';
    if(star){
     const qualifier=group.length>1?path(group[0])[0]:null;
     names.push(...value.sources.filter(source=>!qualifier||key(source.alias)===key(qualifier)).flatMap(source=>source.columns));continue;
    }
    if(group.length===1&&isID(group[0])){
     const parts=path(group[0]);const column=parts.at(-1)!;
     if(value.sources.some(source=>(parts.length===1||key(source.alias)===key(parts[0]))&&source.columns.some(name=>key(name)===key(column))))names.push(column);
    }
   }
   return Array.from(new Set(names));
  }
  function range(){
   let node:Node|null=at;
   while(node&&!['Identifier','QuotedIdentifier','Keyword'].includes(node.name))node=node.parent;
   if(node&&node.from<=context.pos&&node.to>=context.pos){
    return {from:node.from,to:node.to,quoted:node.name==='QuotedIdentifier'?document.sliceString(node.from,node.from+1):null};
   }
   return {from:context.pos,to:context.pos,quoted:null};
  }
  const span=range();
  const prefix=document.sliceString(span.from,context.pos);
  if(!context.explicit&&!prefix&&at.name!=='.')return null;
  const containers:Node[]=[];
  for(let node:Node|null=at;node;node=node.parent){
   if((node.name==='Parens'||node.name==='Statement')&&tokens(node).some(token=>word(token,'select')))containers.unshift(node);
  }
  if(!containers.length){
   let previous=tree.topNode.lastChild;
   while(previous&&previous.from>context.pos)previous=previous.prevSibling;
   if(previous?.name==='Statement'&&previous.to<=context.pos&&document.sliceString(previous.to,context.pos).trim()===''
    &&document.sliceString(previous.to-1,previous.to)!==';'&&tokens(previous).some(token=>word(token,'select')))containers.push(previous);
  }
  const scopes:Scope[]=[];
  for(const node of containers)scopes.push(scope(node,scopes.at(-1)?.ctes??new Map(),0,context.pos));
  const current=scopes.at(-1);
  const preceding=document.sliceString(0,span.from);
  // The parser's CompositeIdentifier keeps the qualifier separate from the replacement span.
  let composite:Node|null=at;
  while(composite&&composite.name!=='CompositeIdentifier')composite=composite.parent;
  let qualifier:string|undefined;
  if(composite){const parts=tokens(composite);const dot=parts.findIndex(token=>token.text==='.');if(dot>=0&&parts[dot].to<=span.from)qualifier=identifier(parts[0].text);}
  if(!qualifier&&/\.\s*$/.test(preceding)){
   const match=preceding.match(/("(?:[^"]|"")*"|`(?:[^`]|``)*`|\[(?:[^\]]|\]\])*\]|[\w]+)\s*\.\s*$/);if(match)qualifier=identifier(match[1]);
  }
  function result(options:Completion[]){
   const opening=span.quoted;const closing=opening==='['?']':opening;
   return {from:span.from,to:span.to,options:options.map(option=>opening?{...option,apply:opening+option.label.replaceAll(closing!,closing!+closing!)+closing}:option)};
  }
  if(qualifier){
   let columns:readonly string[]|undefined;let origin=qualifier;
   for(const value of [...scopes].reverse()){
    const source=value.sources.find(source=>key(source.alias)===key(qualifier!)||key(source.name)===key(qualifier!));
    if(source){columns=source.columns;origin=source.name||source.alias;break;}
    if(value.ctes.has(key(qualifier))){columns=value.ctes.get(key(qualifier));break;}
   }
   columns??=entities.get(key(qualifier))?.columns;
   return result((columns??[]).map(name=>({label:name,apply:quote(name),type:'property',detail:origin,boost:5})));
  }
  const previous=current?.tokens.filter(token=>token.to<=span.from).at(-1);
  const inFrom=current&&current.from>=0&&!current.tokens.some((token,index)=>index>current.from&&token.from<span.from&&token.name==='Keyword'&&endFrom.has(key(token.text)));
  const tablePosition=previous&&(word(previous,'from')||word(previous,'join')||word(previous,'update')||word(previous,'into')||word(previous,'table')
   ||(previous.text===','&&inFrom&&previous.from>current!.tokens[current!.from].from));
  if(tablePosition){
   const fallback=await base(context);
   if(context.aborted)return null;
   return result([...(fallback?.options??[]),...Array.from(current?.ctes.keys()??[]).map(name=>({label:name,apply:quote(name),type:'type'}))]);
  }
  if(!current&&!context.explicit)return base(context);
  const sources=current?.sources.length?current.sources:Array.from(entities.values()).map(entity=>({name:entity.name,alias:entity.name,columns:entity.columns}));
  const counts=new Map<string,number>();for(const source of sources)for(const column of source.columns)counts.set(key(column),(counts.get(key(column))??0)+1);
  const options:Completion[]=sources.flatMap(source=>source.columns.map(column=>{
   const ambiguous=counts.get(key(column))!>1;const label=ambiguous?source.alias+'.'+column:column;
   return {label,apply:ambiguous?quote(source.alias)+'.'+quote(column):quote(column),type:'property',detail:source.name||source.alias,boost:5};
  }));
  if(!current){const fallback=await base(context);if(context.aborted)return null;options.push(...(fallback?.options??[]));}
  return result(options);
 };
}
