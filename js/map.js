const MapData={
 width:2200,height:1300,
 obstacles:[
  {x:260,y:240,w:160,h:80},{x:700,y:180,w:100,h:180},{x:1120,y:250,w:220,h:70},
  {x:350,y:720,w:220,h:80},{x:900,y:760,w:120,h:160},{x:1550,y:650,w:240,h:90}
 ],
 npc:{x:180,y:300,name:"Ông Lão"},
 boss:{x:1900,y:900}
};
function blocked(x,y,r=18){
 if(x<r||y<r||x>MapData.width-r||y>MapData.height-r)return true;
 return MapData.obstacles.some(o=>x+r>o.x&&x-r<o.x+o.w&&y+r>o.y&&y-r<o.y+o.h);
}
function drawMap(ctx,camera){
 ctx.fillStyle="#23482c";ctx.fillRect(0,0,1100,650);
 ctx.save();ctx.translate(-camera.x,-camera.y);
 ctx.fillStyle="#315f37";ctx.fillRect(0,0,MapData.width,MapData.height);
 // grid
 ctx.strokeStyle="#3b7042";ctx.lineWidth=1;
 for(let x=0;x<MapData.width;x+=80){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,MapData.height);ctx.stroke()}
 for(let y=0;y<MapData.height;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(MapData.width,y);ctx.stroke()}
 // water
 ctx.fillStyle="#24688a";ctx.fillRect(0,500,MapData.width,120);
 ctx.fillStyle="#1d5b7b";ctx.fillRect(1200,0,130,500);
 // obstacles
 for(const o of MapData.obstacles){ctx.fillStyle="#56634e";ctx.fillRect(o.x,o.y,o.w,o.h);ctx.strokeStyle="#2c382c";ctx.strokeRect(o.x,o.y,o.w,o.h)}
 // npc
 ctx.fillStyle="#f1c27d";ctx.beginPath();ctx.arc(MapData.npc.x,MapData.npc.y,16,0,Math.PI*2);ctx.fill();
 ctx.fillStyle="#fff";ctx.fillText("Ông Lão",MapData.npc.x-28,MapData.npc.y-25);
 // boss altar
 ctx.fillStyle="#7d2431";ctx.fillRect(MapData.boss.x-55,MapData.boss.y-20,110,40);
 ctx.fillStyle="#ff4b57";ctx.font="bold 16px Arial";ctx.fillText("BOSS",MapData.boss.x-23,MapData.boss.y-30);
 ctx.restore();
}