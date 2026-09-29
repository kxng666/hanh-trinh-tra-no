const SaveSystem={
 key:"dragon_grind_save_v1",
 save(){
   const data={player:Player?.serialize(),inventory:Inventory?.items,questKills:Game.questKills};
   localStorage.setItem(this.key,JSON.stringify(data));
   showMessage("💾 Đã lưu game");
 },
 load(){
   try{return JSON.parse(localStorage.getItem(this.key)||"null")}catch(e){return null}
 },
 clear(){localStorage.removeItem(this.key)}
};