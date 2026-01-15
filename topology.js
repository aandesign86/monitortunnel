const API_KEY = "ur3262771-ac3b8d56f4ffa3ad1ac23fb0";
const nodes=[
{id:"design86",x:400,y:20,w:350,h:50,t:"design86.my.id"},
{id:"aan",x:80,y:120,w:260,h:45,t:"Aan Tunnel"},
{id:"ckb",x:420,y:120,w:320,h:45,t:"Cakrabuana Tunnel"},
{id:"klinik",x:820,y:120,w:260,h:45,t:"Klinik Tunnel"},
{id:"gatewayhome",x:80,y:220,w:300,h:45,t:"gatewayhome.design86.my.id"},
{id:"openwrt",x:80,y:280,w:300,h:45,t:"openwrt.design86.my.id"},
{id:"cctv",x:80,y:340,w:300,h:45,t:"cctv.design86.my.id"},
{id:"ckbgw",x:420,y:220,w:300,h:45,t:"carabuanagateway.design86.my.id"},
{id:"tplink",x:420,y:280,w:300,h:45,t:"tplinkckb.design86.my.id"},
{id:"mercusis",x:420,y:340,w:300,h:45,t:"mercusisckb.design86.my.id"},
{id:"tenda",x:420,y:400,w:300,h:45,t:"tendackb.design86.my.id"},
{id:"gatewaykcm",x:820,y:240,w:300,h:45,t:"gatewaykcm.design86.my.id"},
];
const svg=document.getElementById("svg");
nodes.forEach(n=>{
svg.innerHTML+=`<rect id="${n.id}" x="${n.x}" y="${n.y}" rx="15" ry="15" width="${n.w}" height="${n.h}" class="node"/>`;
svg.innerHTML+=`<text x="${n.x+n.w/2}" y="${n.y+30}" text-anchor="middle">${n.t}</text>`;
});
function update(){
fetch("https://api.uptimerobot.com/v2/getMonitors",{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({api_key:API_KEY,format:"json"})})
.then(r=>r.json()).then(d=>{
d.monitors.forEach(m=>{
let id=m.friendly_name.toLowerCase().replace(/\s/g,'');
let el=document.getElementById(id);
if(el)el.classList.add(m.status===2?"up":"down");
});
});
}
update();setInterval(update,60000);