import {spawn} from 'node:child_process';
import {createWriteStream} from 'node:fs';
import {finished} from 'node:stream/promises';

export async function runBrowserCommand({args, cwd, env, logPath, visible=false, onChild=()=>{}},
  {spawnProcess=spawn, openLog=createWriteStream}={}) {
  const log=openLog(logPath);
  let child,failure,closed=false,stopping=false,timer;
  const stop=()=>{
    if(!child||closed||stopping)return;
    stopping=true;
    try {child.kill('SIGTERM');} catch { /* Se conserva el error original. */ }
    timer=setTimeout(()=>{if(!closed)try{child.kill('SIGKILL');}catch{}},2000);
    timer.unref();
  };
  const fail=error=>{failure??=error;stop();};
  const logFinished=finished(log,{cleanup:true}).catch(error=>{fail(error);});
  const forward=(source,bytes)=>{
    if(failure)return;
    if(!log.write(bytes)){source.pause();log.once('drain',()=>source.resume());}
  };
  try {
    const code=await new Promise(resolve=>{
      child=spawnProcess(process.execPath,args,{cwd,env:{...process.env,DOCUSAURUS_NO_PERSISTENT_CACHE:'1',...env},stdio:['ignore','pipe','pipe']});
      onChild(child);
      child.stdout.on('data',bytes=>{forward(child.stdout,bytes);if(visible&&!failure)process.stdout.write(bytes);});
      child.stderr.on('data',bytes=>forward(child.stderr,bytes));
      child.once('error',fail);
      child.once('close',code=>{closed=true;clearTimeout(timer);onChild(undefined);resolve(code??1);});
    });
    if(!log.destroyed&&!log.writableEnded)log.end();
    await logFinished;
    if(failure)throw failure;
    return code;
  } finally {
    stop();clearTimeout(timer);
    if(!log.destroyed&&!log.writableEnded)log.end();
    await logFinished;
  }
}
