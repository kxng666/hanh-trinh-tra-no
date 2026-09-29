class Enemy{
 constructor(x,y,type="slime"){
  this.x=x;this.y=y;this.type=type;this.dead=false;this.hit=0;this.attackCd=0;
  if(type==="boss"){this.name="Ác Long";this.maxHp=900;this.hp=900;this.atk=32;this.exp=450;this.gold=800;this.r=30}
  else{this.name=Math.random()<.5?"Yêu Quái":"Sóc Đột Biến";this.maxHp=70+Math.random()*30;this.hp=this.maxHp;this.atk=7+Math.random()*4;this.exp=35;this.gold=15+Math.floor(Math.random()*30);this.r=20}
 }
 update(dt){
  if(this.dead)return;
  const dx=Player.x-this.x,dy=Player.y-this.y,d=Math.hypot(dx,dy);
  if(d<260&&d>45){let nx=this.x+dx/d*35*dt,ny=this.y+dy/d*35*dt;if(!blocked(nx,ny,this.r)){this.x=nx;this.y=ny}}
  this.attackCd-=dt;
  if(d<55&&this.attackCd<=0){this.attackCd=1.1;Player.takeDamage(Math.floor(this.atk))}
  if(this.hit>0)this.hit-=dt;
 }
 draw(ctx,camera){
  if(this.dead)return;const x=this.x-camera.x,y=this.y-camera.y;
  ctx.save();ctx.translate(x,y);
  ctx.fillStyle=this.type==="boss"?"#5e1731":"#7dba42";
  ctx.beginPath();ctx.arc(0,0,this.r,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#111";ctx.fillRect(-10,-5,7,7);ctx.fillRect(3,-5,7,7);
  ctx.fillStyle="#222";ctx.fillRect(-this.r,-this.r-10,this.r*2,5);
  ctx.fillStyle="#ef3340";ctx.fillRect(-this.r,-this.r-10,this.r*2*(this.hp/this.maxHp),5);
  ctx.fillStyle="#fff";ctx.font="11px Arial";ctx.textAlign="center";ctx.fillText(this.name,0,this.r+15);
  ctx.restore();
 }
}
function spawnEnemies(){
 Game.enemies=[];
 for(let i=0;i<18;i++){
  let x=100+Math.random()*(MapData.width-200),y=100+Math.random()*(MapData.height-200);
  if(Math.hypot(x-Player.x,y-Player.y)<250){i--;continue}
  Game.enemies.push(new Enemy(x,y));
 }
 Game.enemies.push(new Enemy(MapData.boss.x,MapData.boss.y,"boss"));
}