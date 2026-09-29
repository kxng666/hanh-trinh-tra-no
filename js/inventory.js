const Inventory={
 items:{potion:3,superPotion:0,stone:0},
 defs:{
  potion:{name:"Bình HP",desc:"Hồi 60 HP",heal:60},
  superPotion:{name:"Bình HP lớn",desc:"Hồi 180 HP",heal:180},
  stone:{name:"Đá sức mạnh",desc:"Tăng ATK vĩnh viễn +2",atk:2}
 },
 add(id,n=1){this.items[id]=(this.items[id]||0)+n;renderInventory();},
 use(id){
   if(!this.items[id])return;
   const d=this.defs[id];
   if(d.heal){Player.hp=Math.min(Player.maxHp,Player.hp+d.heal);this.items[id]--;showMessage("❤️ Hồi "+d.heal+" HP");}
   if(d.atk){Player.atk+=d.atk;this.items[id]--;showMessage("⚔️ ATK +"+d.atk);}
   renderInventory();updateHUD();
 },
 render(){renderInventory()}
};
function renderInventory(){
 const el=document.getElementById("items"); if(!el)return;
 el.innerHTML="";
 for(const [id,n] of Object.entries(Inventory.items)){
   if(n<=0)continue; const d=Inventory.defs[id];
   const row=document.createElement("div");row.className="item";
   row.innerHTML=`<div><b>${d.name}</b> ×${n}<br><small>${d.desc}</small></div><button>Dùng</button>`;
   row.querySelector("button").onclick=()=>Inventory.use(id);el.appendChild(row);
 }
 if(!el.children.length)el.innerHTML="<p>Túi đồ trống.</p>";
}
function toggleInventory(){document.getElementById("inventory").classList.toggle("hidden");renderInventory()}