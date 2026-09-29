const canvas=document.getElementById("game"),ctx=canvas.getContext("2d");
const keys={};let running=false,last=0,messageTimer=0;
const Game={camera:{x:0,y:0},enemies:[],questKills:0};
document.addEventListener("keydown",e=>{
 keys[e.key]=true;keys[e.key.toLowerCase()]=true;
 if([" ","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))e.preventDefault();
 if(!running)return;
 if(e.key===" ")playerAttack();
 if(e.key.toLowerCase()==="q")useSkill();
 if(e.key.toLowerCase()==="i")toggleInventory();
 if(e.key.toLowerCase()==="p")SaveSystem.save();
 if(e.key.toLowerCase()==="e")talkNPC();
});
document.addEventListener("keyup",e=>{keys[e.key]=false;keys[e.key.toLowerCase()]=false});
document.getElementById("startBtn").onclick=()=>{
 const saved=SaveSystem.load();Player.name=document.getElementById("nameInput").value.trim()||"Công";
 if(saved){Player.load(saved.player);Inventory.items=saved.inventory||Inventory.items;Game.questKills=saved.questKills||0}
 else{Player.name=document.getElementById("nameInput").value.trim()||"Công"}
 document.getElementById("start").classList.add("hidden");running=true;spawnEnemies();renderInventory();updateHUD();requestAnimationFrame(loop);
};
function talkNPC(){
 if(Math.hypot(Player.x-MapData.npc.x,Player.y-MapData.npc.y)<80){
   showMessage("👴 Ông Lão: Hãy đánh 10 con quái rồi quay lại đây!");
   if(Game.questKills>=10){Player.gold+=300;Game.questKills=0;showMessage("🎁 Ông Lão thưởng thêm 300 vàng!")}
 }else showMessage("Hãy đến gần NPC.");
}
function updateHUD(){
 const hp=Math.max(0,Player.hp/Player.maxHp*100),ki=Player.ki/Player.maxKi*100,ex=Player.exp/Player.expToNext()*100;
 document.getElementById("playerName").textContent=Player.name;
 document.getElementById("level").textContent=Player.level;
 document.getElementById("hpBar").style.width=hp+"%";document.getElementById("hpText").textContent=`${Math.ceil(Player.hp)} / ${Player.maxHp}`;
 document.getElementById("kiBar").style.width=ki+"%";document.getElementById("kiText").textContent=`${Math.floor(Player.ki)} / ${Player.maxKi}`;
 document.getElementById("expBar").style.width=ex+"%";document.getElementById("expText").textContent=`EXP ${Player.exp} / ${Player.expToNext()}`;
 document.getElementById("atk").textContent=Player.atk;document.getElementById("def").textContent=Player.def;document.getElementById("gold").textContent=Player.gold;
 document.getElementById("questKills").textContent=Math.min(Game.questKills,10);
}
function showMessage(t){const e=document.getElementById("message");e.textContent=t;clearTimeout(messageTimer);messageTimer=setTimeout(()=>e.textContent="",1600)}
function loop(t){if(!running)return;const dt=Math.min(.033,(t-last)/1000||.016);last=t;update(dt);draw();requestAnimationFrame(loop)}
function update(dt){Player.update(dt);for(const e of Game.enemies)e.update(dt);Game.enemies=Game.enemies.filter(e=>!e.dead||e.type==="boss"&&e.hp>0);Game.camera.x=Math.max(0,Math.min(MapData.width-1100,Player.x-550));Game.camera.y=Math.max(0,Math.min(MapData.height-650,Player.y-325));updateHUD()}
function draw(){
 drawMap(ctx,Game.camera);
 for(const e of Game.enemies)e.draw(ctx,Game.camera);
 Player.draw(ctx,Game.camera);
 // minimap
 ctx.fillStyle="#000b";ctx.fillRect(930,530,155,105);ctx.strokeStyle="#fff5";ctx.strokeRect(930,530,155,105);
 const sx=155/MapData.width,sy=105/MapData.height;
 ctx.fillStyle="#45b9ff";ctx.beginPath();ctx.arc(930+Player.x*sx,530+Player.y*sy,4,0,Math.PI*2);ctx.fill();
 ctx.fillStyle="#f33";for(const e of Game.enemies){if(!e.dead){ctx.beginPath();ctx.arc(930+e.x*sx,530+e.y*sy,2,0,Math.PI*2);ctx.fill()}}
}
setInterval(()=>{if(running)SaveSystem.save()},30000);