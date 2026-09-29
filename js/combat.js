function playerAttack(){
 if(Player.attackCd>0)return;Player.attackCd=.38;
 let target=null,best=999;
 for(const e of Game.enemies){if(e.dead)continue;const d=Math.hypot(e.x-Player.x,e.y-Player.y);if(d<75&&d<best){target=e;best=d}}
 if(!target){showMessage("Không có mục tiêu gần!");return}
 damageEnemy(target,Math.floor(Player.atk*(.9+Math.random()*.3)));
}
function useSkill(){
 if(Player.skillCd>0)return;if(!Skills.use("kiBlast"))return;Player.skillCd=1.2;
 let hit=0;for(const e of Game.enemies){if(!e.dead&&Math.hypot(e.x-Player.x,e.y-Player.y)<170){damageEnemy(e,Math.floor(Player.atk*Skills.kiBlast.damage));hit++}}
 showMessage(hit?"⚡ CHƯỞNG!":"⚡ Bắn hụt!");
}
function damageEnemy(e,dmg){
 e.hp-=dmg;e.hit=.12;floatingDamage(e.x,e.y,dmg);
 if(e.hp<=0)killEnemy(e);
}
function killEnemy(e){
 e.dead=true;Player.gainExp(e.exp);Player.gold+=e.gold;Game.questKills++;
 if(Math.random()<.22)Inventory.add("potion",1);
 if(Math.random()<.06)Inventory.add("stone",1);
 showMessage("💀 +"+e.exp+" EXP · +"+e.gold+" vàng");
 if(e.type==="boss"){Inventory.add("superPotion",2);Inventory.add("stone",3);showMessage("👑 BOSS BỊ HẠ! Rơi vật phẩm hiếm!")}
 setTimeout(()=>{const x=100+Math.random()*(MapData.width-200),y=100+Math.random()*(MapData.height-200);Game.enemies.push(new Enemy(x,y))},3000);
 if(Game.questKills===10){Player.gold+=500;Player.gainExp(250);showMessage("📜 Hoàn thành nhiệm vụ! +500 vàng")}
}
function floatingDamage(x,y,n){
 const d=document.createElement("div");d.className="damage";d.textContent="-"+n;d.style.left=(x-Game.camera.x+540)+"px";d.style.top=(y-Game.camera.y+270)+"px";document.getElementById("game-wrap").appendChild(d);setTimeout(()=>d.remove(),700);
}