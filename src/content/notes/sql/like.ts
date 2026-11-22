import {defineSqlGroup} from './factory.ts';import results from './results/like.ts';
const prefix={title:'Nombres que empiezan por M',code:"SELECT nombre FROM productos\nWHERE nombre LIKE 'M%';",hint:'% puede representar cero, uno o muchos caracteres.'};
export const notes=defineSqlGroup([
 {key:'like/definicion',examples:[prefix],remember:'LIKE busca un patrón, no una expresión regular.',note:'Mayúsculas y acentos dependen de la collation. SQLite normalmente ignora diferencias de mayúsculas en ASCII, no en todo Unicode.'},
 {key:'like/comodines',examples:[prefix,{title:'M y cuatro caracteres más',code:"SELECT nombre FROM productos\nWHERE nombre LIKE 'M____';",hint:'Cada _ representa exactamente un carácter: Mouse tiene cinco.'}],remember:'%: cualquier cantidad · _: un carácter. Para un % literal necesitas un escape.'},
 {key:'like/not-like',examples:[{title:'Excluir un prefijo',code:"SELECT nombre FROM productos\nWHERE nombre NOT LIKE 'M%';",hint:'Conserva nombres que no coinciden con ese patrón.'}],remember:'Un nombre NULL no pasa NOT LIKE: su comparación es desconocida.'},
],results);
