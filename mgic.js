const canvas = document.getElementById("canvas");
const lib = canvas.getContext("2d");
//console.log(lib);
canvas.width = window.innerWidth;
canvas.height = 400;

const particleArray =[];
let hue =0;

const mouse = {
    x:undefined,
    y:undefined,
}

/* ----------------------------------------------------------- */

class Particle{

    constructor(x,y){
        this.x = x;
        this.y = y;
        //this.x = Math.random()*canvas.width;
        //this.y = Math.random()*canvas.height;
        this.size = Math.random() * 15 +1;
        this.speedx=Math.random() * 3-1.5;
        this.speedy=Math.random() * 3-1.5;
        this.color='hsl('+hue+',100%, 50%';
    }
    
    update(){
        this.x += this.speedx;
        this.y+= this.speedy;
    }

    display(){
        lib.fillStyle = this.color;
        lib.beginPath();
        lib.arc(this.x, this.y, this.size, 0, Math.PI*2);
        lib.fill();
    }
}

/* ----------------------------------------------------------- */

function setup(){
    /*for(let i=0; i < 10; i++){
        particleArray.push(new Particle());
    }//*/
}

function draw(){

    lib.clearRect(0, 0, canvas.width, canvas.height);
    //circle();
    handleParticles()
    hue+=3;
    
    requestAnimationFrame(draw);
}
setup();
draw();

/* ----------------------------------------------------------- */

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});

function handleParticles(){
    for(let i=0; i<particleArray.length;i++){
        particleArray[i].update();
        particleArray[i].display();

        if(particleArray[i].size > 0.2){
            particleArray[i].size -=0.1;
        }
        for(let j=i; j<particleArray.length; j++){
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance<130){
                lib.beginPath();
                lib.strokeStyle=particleArray[j].color;
                lib.moveTo(particleArray[i].x,particleArray[i].y);
                lib.lineTo(particleArray[j].x, particleArray[j].y);
                lib.stroke();
            }
        }
        
        if(particleArray[i].size <= 0.2){
            particleArray.splice(i,1);
            console.log(particleArray.length);
            i--;
        }
    }
}

/*function circle(){
    lib.fillStyle = 'pink';
    lib.beginPath();
    lib.arc(mouse.x, mouse.y, 50, 0, Math.PI*2);
    lib.fill();
} //*/

/*
canvas.addEventListener('click', function(event){
    mouse.x= event.x;
    mouse.y = event.y;
    console.log(event);
    //circle();
}); // */

canvas.addEventListener('mousemove', function(event){
    mouse.x= event.x;
    mouse.y = event.y;
    //for(let i=0;i<4;i++){
    particleArray.push(new Particle(mouse.x, mouse.y));
    //}
});