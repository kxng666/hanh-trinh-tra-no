const Player={
 x:300,y:350,r:20,name:"Công",level:1,exp:0,gold:100,
 hp:120,maxHp:120,ki:60,maxKi:60,atk:12,def:5,
 speed:190,attackCd:0,skillCd:0,invuln:0,
 serialize(){return {x:this.x,y:this.y,name:this.name,level:this.level,exp:this.exp,gold:this.gold,hp:this.hp,maxHp:this.maxHp,ki:this.ki,maxKi:this.maxKi,atk:this.atk,def:this.def}},
 load(d){Object.assign(this,d)},
 update(dt){
  let dx=0,dy=0;
  if(keys.w||keys.ArrowUp)dy--;if(keys.s||keys.ArrowDown)dy++;if(keys.a||keys.ArrowLeft)dx--;if(keys.d||keys.ArrowRight)dx++;
  if(dx||dy){const l=Math.hypot(dx,dy);dx/=l;dy/=l;let nx=this.x+dx*this.speed*dt,ny=this.y+dy*this.speed*dt;if(!blocked(nx,this.y,this.r))this.x=nx;if(!blocked(this.x,ny,this.r))this.y=ny}
  this.attackCd=Math.max(0,this.attackCd-dt);this.skillCd=Math.max(0,this.skillCd-dt);this.invuln=Math.max(0,this.invuln-dt);
  this.ki=Math.min(this.maxKi,this.ki+8*dt);
 },
 draw(ctx,camera){
  const x=this.x-camera.x,y=this.y-camera.y;ctx.save();ctx.translate(x,y);
  ctx.fillStyle="#f1c27d";ctx.beginPath();ctx.arc(0,-10,10,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#e78a16";ctx.beginPath();ctx.moveTo(-11,-17);ctx.lineTo(-3,-34);ctx.lineTo(3,-18);ctx.lineTo(11,-34);ctx.lineTo(14,-8);ctx.lineTo(-14,-8);ctx.closePath();ctx.fill();
  ctx.fillStyle="#174d9b";ctx.fillRect(-13,0,26,26);ctx.fillStyle="#e7c72c";ctx.fillRect(-13,20,26,7);
  ctx.fillStyle="#fff";ctx.font="12px Arial";ctx.textAlign="center";ctx.fillText(this.name,0,45);
  ctx.restore();
 },
 takeDamage(amount){
  if(this.invuln>0)return;
  const dmg=Math.max(1,Math.floor(amount-this.def*.35));this.hp-=dmg;this.invuln=.35;showMessage("💥 -"+dmg);
  if(this.hp<=0){this.hp=this.maxHp;this.ki=this.maxKi;this.x=300;this.y=350;this.gold=Math.max(0,this.gold-100);showMessage("☠️ Bạn đã ngã! Mất 100 vàng.")}
 },
 gainExp(n){
  this.exp+=n;
  while(this.exp>=this.expToNext()){this.exp-=this.expToNext();this.levelUp()}
 },
 expToNext(){return Math.floor(100*Math.pow(1.35,this.level-1))},
 levelUp(){this.level++;this.maxHp+=25;this.maxKi+=12;this.hp=this.maxHp;this.ki=this.maxKi;this.atk+=4;this.def+=2;showMessage("🎉 LEVEL UP! Lv."+this.level)}
};