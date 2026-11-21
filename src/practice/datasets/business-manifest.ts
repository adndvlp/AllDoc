import type {DatasetColumn,DatasetManifest,DatasetTable} from './types.ts';
import type {ColumnType} from '../contracts.ts';

const c=(name:string,type:ColumnType='integer',extra:Partial<DatasetColumn>={}):DatasetColumn=>({name,type,nullable:false,...extra});
const fk=(column:string,table:string,target='id',onDelete?:'CASCADE'|'SET NULL')=>({columns:[column],references:{table,columns:[target]},...(onDelete?{onDelete}:{})});
const nonnegative=(column:string)=>({column,operator:'>=' as const,value:0});
const positive=(column:string)=>({column,operator:'>' as const,value:0});
export function freezeData<T>(value:T):T {
  if(value&&typeof value==='object'){for(const child of Object.values(value))freezeData(child);Object.freeze(value);}return value;
}
const tables:DatasetTable[]=[
  {name:'categorias',columns:[c('id'),c('nombre','text'),c('descripcion','text',{nullable:true,default:null})],primaryKey:['id'],unique:[['nombre']]},
  {name:'proveedores',columns:[c('id'),c('nombre','text'),c('pais','text'),c('email','text',{nullable:true})],primaryKey:['id']},
  {name:'productos',columns:[c('id'),c('nombre','text'),c('categoria','text'),c('precio'),c('stock','integer',{default:0}),c('proveedor_id','integer',{nullable:true}),c('activo','boolean',{default:true})],primaryKey:['id'],foreignKeys:[fk('categoria','categorias','nombre'),fk('proveedor_id','proveedores','id','SET NULL')],checks:[nonnegative('precio'),nonnegative('stock'),{column:'activo',operator:'in',value:[0,1]}]},
  {name:'clientes',columns:[c('id'),c('nombre','text'),c('email','text'),c('ciudad','text'),c('fecha_alta','date'),c('telefono','text',{nullable:true})],primaryKey:['id'],unique:[['email']]},
  {name:'departamentos',columns:[c('id'),c('nombre','text')],primaryKey:['id'],unique:[['nombre']]},
  {name:'empleados',columns:[c('id'),c('nombre','text'),c('departamento_id'),c('gerente_id','integer',{nullable:true}),c('salario'),c('fecha_ingreso','date')],primaryKey:['id'],foreignKeys:[fk('departamento_id','departamentos'),fk('gerente_id','empleados')],checks:[positive('salario')]},
  {name:'pedidos',columns:[c('id'),c('cliente_id'),c('empleado_id','integer',{nullable:true}),c('fecha','date'),c('estado','text',{default:'pendiente'})],primaryKey:['id'],foreignKeys:[fk('cliente_id','clientes'),fk('empleado_id','empleados','id','SET NULL')],checks:[{column:'estado',operator:'in',value:['pendiente','entregado','cancelado']}]},
  {name:'detalle_pedidos',columns:[c('pedido_id'),c('producto_id'),c('cantidad','integer',{default:1}),c('precio_unitario'),c('descuento','integer',{default:0})],primaryKey:['pedido_id','producto_id'],foreignKeys:[fk('pedido_id','pedidos','id','CASCADE'),fk('producto_id','productos')],checks:[positive('cantidad'),nonnegative('precio_unitario'),nonnegative('descuento'),{column:'descuento',operator:'<=',value:100}]},
  {name:'pagos',columns:[c('id'),c('pedido_id'),c('fecha','date'),c('importe'),c('metodo','text')],primaryKey:['id'],foreignKeys:[fk('pedido_id','pedidos','id','CASCADE')],checks:[positive('importe'),{column:'metodo',operator:'in',value:['tarjeta','transferencia','efectivo']}]},
  {name:'almacenes',columns:[c('id'),c('nombre','text'),c('ciudad','text')],primaryKey:['id']},
  {name:'inventario',columns:[c('almacen_id'),c('producto_id'),c('unidades','integer',{default:0})],primaryKey:['almacen_id','producto_id'],foreignKeys:[fk('almacen_id','almacenes'),fk('producto_id','productos','id','CASCADE')],checks:[nonnegative('unidades')]},
  {name:'movimientos_stock',columns:[c('id'),c('producto_id'),c('almacen_id'),c('empleado_id','integer',{nullable:true}),c('fecha','date'),c('tipo','text'),c('cantidad')],primaryKey:['id'],foreignKeys:[fk('producto_id','productos'),fk('almacen_id','almacenes'),fk('empleado_id','empleados','id','SET NULL')],checks:[positive('cantidad'),{column:'tipo',operator:'in',value:['entrada','salida']}]},
  {name:'cuentas',columns:[c('id'),c('cliente_id'),c('saldo','integer',{default:0}),c('fecha_apertura','date')],primaryKey:['id'],unique:[['cliente_id']],foreignKeys:[fk('cliente_id','clientes','id','CASCADE')],checks:[nonnegative('saldo')]},
];
export const businessManifest:DatasetManifest=freezeData({reference:{id:'negocio-relacional',version:1},title:'Negocio relacional',tables});
