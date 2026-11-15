import {statfs} from 'node:fs/promises';

// Margen operativo para build, runtime y artefactos de dos workers; no es una
// estimación del tamaño final ni una garantía frente a otras escrituras.
export const minimumBrowserFreeBytes=512*1024*1024;
export async function requireBrowserSpace(paths,{filesystem=statfs}={}) {
  const samples=[];
  for(const path of new Set(paths)) {
    const stats=await filesystem(path),availableBytes=Number(stats.bsize)*Number(stats.bavail);
    if(!Number.isFinite(availableBytes)||availableBytes<0)throw new Error('No se pudo medir el espacio disponible de '+path);
    samples.push({path,availableBytes});
    if(availableBytes<minimumBrowserFreeBytes) {
      const error=new Error(`Espacio insuficiente en ${path}: ${Math.floor(availableBytes/1024/1024)} MiB libres; margen mínimo ${minimumBrowserFreeBytes/1024/1024} MiB. Libera espacio antes de repetir.`);
      error.code='INSUFFICIENT_DISK_SPACE';throw error;
    }
  }
  return {minimumFreeBytes:minimumBrowserFreeBytes,samples};
}
