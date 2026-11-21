import {businessManifest,freezeData} from '../business-manifest.ts';
import type {PracticeDataset} from '../types.ts';
import type {Cell} from '../../contracts.ts';

// Semilla fija: importes enteros en MXN, fechas ISO y booleanos. No usa reloj ni azar.
const categoryNames=['Accesorios','Pantallas','Audio','Almacenamiento','Mobiliario','Redes'];
const items:[string,string,number][]=[['Teclado','Accesorios',500],['Mouse','Accesorios',250],['Monitor','Pantallas',3500],['Bocina','Audio',800],['Audífonos','Audio',1200],['SSD','Almacenamiento',1500],['Memoria USB','Almacenamiento',200],['Webcam','Accesorios',900],['Micrófono','Audio',1100],['Cable HDMI','Accesorios',150],['Pantalla portátil','Pantallas',2500],['Disco externo','Almacenamiento',1800],['Soporte','Accesorios',300],['Adaptador','Accesorios',250],['Lector de tarjetas','Accesorios',400],['Hub USB','Accesorios',700],['Control remoto','Accesorios',0],['Cable auxiliar','Audio',100]];
const stock=(product:number,warehouse:number)=>product===18?0:((product+warehouse)%5)*5;
const departments=['Dirección','Ventas','Operaciones','Finanzas'];
const names=['Ana','Luis','María','Carlos','Elena','José','Lucía','Raúl','Sofía','Diego','Inés','Andrés'];
const customers=Array.from({length:24},(_,i):Cell[]=>[i+1,`${names[i%12]} ${i+1}`,`cliente${i+1}@ejemplo.test`,['Monterrey','Guadalajara','Ciudad de México'][i%3],`${2024+i%3}-${String(i%12+1).padStart(2,'0')}-01`,i%4===0?null:i%5===0?'':`55501${String(i+1).padStart(3,'0')}`]);
const orders=Array.from({length:48},(_,i):Cell[]=>[i+1,i%18+1,i%5===0?null:i%12+1,`${2024+Math.floor(i/24)}-${String(i%12+1).padStart(2,'0')}-${String(i%20+1).padStart(2,'0')}`,i%8===7?'cancelado':i%3===0?'pendiente':'entregado']);
const details=orders.flatMap((row,i):Cell[][]=>[0,1].map(j=>{const tied=Number(row[1])>=17;const product=tied?j+1:(i*2+j)%15+1;return [row[0],product,j+1,items[product-1][2],!tied&&i%4===0?10:0];}));
const payments:Cell[][]=[];
for(const order of orders.slice(0,36)){
  if(order[4]==='cancelado')continue;
  const total=details.filter(d=>d[0]===order[0]).reduce((sum,d)=>sum+Number(d[2])*Number(d[3])*(100-Number(d[4]))/100,0);
  const portions=Number(order[0])<=24?[Number(order[0])%4===0?Math.floor(total/2):total]:[Math.floor(total/2),Math.floor(total/4)];
  for(const amount of portions)if(amount>0)payments.push([payments.length+1,order[0],order[3],amount,['tarjeta','transferencia','efectivo'][payments.length%3]]);
}
const inventory=items.flatMap((_,i):Cell[][]=>[1,2,3].map(w=>[w,i+1,stock(i+1,w)]));
const rows:Record<string,Cell[][]>={
  categorias:categoryNames.map((name,i)=>[i+1,name,i%2===0?null:`Productos de ${name}`]),
  proveedores:['Norte','Centro','Sur','Pacífico','Atlántico','Sin catálogo'].map((name,i)=>[i+1,`Distribuidora ${name}`,['México','Colombia','España'][i%3],i===5?null:`contacto${i+1}@ejemplo.test`]),
  productos:items.map(([name,category,price],i)=>[i+1,name,category,price,[1,2,3].reduce((sum,w)=>sum+stock(i+1,w),0),i>=16?null:i%4+1,i!==17]),
  clientes:customers,
  departamentos:departments.map((name,i)=>[i+1,name]),
  empleados:names.map((name,i)=>[i+1,name,i%4+1,i<3?null:i%3+1,20000+(i%4)*5000,`202${i%3+3}-01-15`]),
  pedidos:orders,detalle_pedidos:details,pagos:payments,
  almacenes:[[1,'Principal','Monterrey'],[2,'Occidente','Guadalajara'],[3,'Centro','Ciudad de México']],
  inventario:inventory,
  movimientos_stock:inventory.filter(row=>Number(row[2])>0).map((row,i)=>[i+1,row[1],row[0],i%7===0?null:i%12+1,'2024-01-01','entrada',row[2]]),
  cuentas:customers.map((row,i)=>[i+1,row[0],i===23?0:10000+(i%5)*1000,row[4]]),
};
export const businessDataset:PracticeDataset=freezeData({reference:businessManifest.reference,tables:businessManifest.tables.map(table=>({...table,rows:rows[table.name]}))});
