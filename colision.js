const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let objects = [];
let score = 0;

const scoreDisplay = document.getElementById("score");

// imagen del objeto
const img = new Image();
img.src = "https://cdn-icons-png.flaticon.com/512/616/616490.png";

class FallingObject{

constructor(){

this.size = Math.random()*40 + 40;

this.x = Math.random()*(canvas.width-this.size);

this.y = -this.size;

// velocidad inicial
this.speed = Math.random()*2 + 2;

}

draw(){

ctx.drawImage(img,this.x,this.y,this.size,this.size);

}

update(){

this.y += this.speed;

if(this.y > canvas.height){

this.reset();

}

this.draw();

}

reset(){

this.size = Math.random()*40 + 40;

this.x = Math.random()*(canvas.width-this.size);

this.y = -this.size;

this.speed = Math.random()*2 + 2;

}

}

// crear objetos
function createObjects(n){

for(let i=0;i<n;i++){

objects.push(new FallingObject());

}

}

// animación
function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

objects.forEach(obj=>{
obj.update();
});

requestAnimationFrame(animate);

}

// detectar clic del mouse
canvas.addEventListener("click",function(e){

const rect = canvas.getBoundingClientRect();

let mouseX = e.clientX - rect.left;
let mouseY = e.clientY - rect.top;

objects.forEach(obj=>{

if(
mouseX > obj.x &&
mouseX < obj.x + obj.size &&
mouseY > obj.y &&
mouseY < obj.y + obj.size
){

score++;

scoreDisplay.innerText = score;

// reglas de velocidad
if(score > 15){
obj.speed = Math.random()*6 + 4;
}
else if(score > 10){
obj.speed = Math.random()*4 + 3;
}

obj.reset();

}

});

});

createObjects(20);

animate();