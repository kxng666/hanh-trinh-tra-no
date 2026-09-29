const Skills={
 basic:{name:"Đấm",cost:0,damage:1.0},
 kiBlast:{name:"⚡ Chưởng",cost:15,damage:2.5},
 use(name){
   if(name==="kiBlast"){
     if(Player.ki<15){showMessage("Không đủ KI!");return false}
     Player.ki-=15;return true;
   } return true;
 }
};