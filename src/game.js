import {bindable, inject} from 'aurelia-framework';
export class Game{
  @bindable matrix;
  @bindable player;
  constructor() {
    this.matrix = new Array(5).fill("-").map(() => new Array(4).fill("-"));
    this.player = {x: 2, y: 0}
    this.size = {x: 25, y: 40}
    this.objects = [];
    this.objSize = 10;

  }

deactivate() {
 window.removeEventListener('keydown', (event) => this.handleKeyInput(event));
}

handleKeyInput(event) {
  console.log(event.keyCode);
  if(event.keyCode == 37 && this.canMoveLeft()) { //Vänster
    this.player.x--;
} else if(event.keyCode == 39 && this.canMoveRight()){ //höger
    this.player.x++;
  } else if(event.keyCode == 40 && this.canMoveDown()){ //down
    this.player.y++;
  } else if(event.keyCode == 32){ //down
    while(this.canMoveDown()){
      this.player.y++;
    }
  }



  this.draw();

}
  canMoveLeft(){
    if(this.player.x <= 0){
      return false;
    }
    return true;
  }
  canMoveRight(){
    if(this.player.x == this.size.x-1){
      return false;
    }
    return true;
  }
  canMoveDown(){
    if(this.player.y == this.size.y-1){
      this.objects.push(JSON.parse(JSON.stringify(this.player)));
      this.player.y = 0;
      return false;
    }
    for(let i = 0; i!= this.objects.length;i++){
      if(this.objects[i].y-1 == this.player.y && this.objects[i].x == this.player.x){
        this.objects.push(JSON.parse(JSON.stringify(this.player)));
        this.player.y = 0;
        return false;
            }
    }
    return true;
  }
  attached(){
    window.addEventListener('keydown', (event) => this.handleKeyInput(event), false);

    this.canvas = this.canvasEl;
    this.content = this.canvas.getContext("2d");

    setInterval(x=>{
      if(this.canMoveDown()){
      this.player.y++;
    }
      this.draw();
    },1000);
  }

  draw(){
    this.clear();
    this.content.fillStyle = "#FF0000";
    this.content.fillRect(this.player.x*this.objSize, this.player.y*this.objSize, this.objSize, this.objSize);
    this.objects.map((obj,index) => {
      this.content.fillRect(obj.x*this.objSize, obj.y*this.objSize, this.objSize, this.objSize);

    });
    this.content.stroke();
  }

  clear(){
    this.content.save();
    this.content.clearRect(0, 0, 250,500);
    this.content.beginPath();
    this.content.moveTo(0,0);

  }
}
