const API_KEY="ur3262771-ac3b8d56f4ffa3ad1ac23fb0";

async function update(){
 const res=await fetch("https://api.uptimerobot.com/v2/getMonitors",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({api_key:API_KEY,format:"json"})
 });
 const data=await res.json();
 const tunnels={AAN:[],CKB:[],KLINIK:[]};

 data.monitors.forEach(m=>{
  const name=m.friendly_name;
  const id=name.split("|")[1]?.trim()?.split(".")[0];
  if(id){
   const el=document.getElementById(id);
   if(el) el.className="node "+(m.status===2?"up":"down");
  }
  if(name.startsWith("AAN |")) tunnels.AAN.push(m.status);
  if(name.startsWith("CKB |")) tunnels.CKB.push(m.status);
  if(name.startsWith("KLINIK |")) tunnels.KLINIK.push(m.status);
 });

 setTunnel("aanTunnel",tunnels.AAN);
 setTunnel("ckbTunnel",tunnels.CKB);
 setTunnel("klinikTunnel",tunnels.KLINIK);
}

function setTunnel(id,arr){
 const el=document.getElementById(id);
 if(!el||!arr.length) return;
 if(arr.every(s=>s===2)) el.className="tunnel up";
 else if(arr.every(s=>s!==2)) el.className="tunnel down";
 else el.className="tunnel partial";
}

update();
setInterval(update,60000);