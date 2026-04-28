const canvas = document.getElementById("grafica");
const ctx = canvas.getContext("2d");

let datos = [];
let tiempo = 0;
let velocidad = 1;

let anchoBanda = 10;
let rttBase = 50;

let ejecutando = false;

document.getElementById("btn").addEventListener("click", function(){
  if(!ejecutando){
    datos = [];
    tiempo = 0;
    velocidad = 1;
    ejecutar();
  }
});

function ejecutar(){
  ejecutando = true;

  let intervalo = setInterval(function(){

    tiempo++;

    // crecimiento hasta alcanzar el límite
    if(velocidad < anchoBanda){
      velocidad += 0.6;
    }else{
      // se mantiene cerca del límite con pequeñas variaciones
      velocidad = anchoBanda + (Math.random() - 0.5) * 0.5;
    }

    // RTT sube cuando está cerca del límite
    let rtt = rttBase;
    if(velocidad >= anchoBanda){
      rtt += Math.random()*15;
    }

    datos.push({
      t: tiempo,
      v: velocidad,
      r: rtt
    });

    dibujar();

    if(tiempo > 80){
      clearInterval(intervalo);
      ejecutando = false;
    }

  }, 120);
}

function dibujar(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  // velocidad (verde)
  ctx.beginPath();
  ctx.strokeStyle = "green";

  for(let i=0;i<datos.length;i++){
    let x = i * 7;
    let y = canvas.height - datos[i].v * 20;

    if(i==0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  }

  ctx.stroke();

  // límite (rojo)
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.moveTo(0, canvas.height - anchoBanda*20);
  ctx.lineTo(canvas.width, canvas.height - anchoBanda*20);
  ctx.stroke();

  // RTT (azul)
  ctx.beginPath();
  ctx.strokeStyle = "blue";

  for(let i=0;i<datos.length;i++){
    let x = i * 7;
    let y = canvas.height - datos[i].r;

    if(i==0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  }

  ctx.stroke();
}