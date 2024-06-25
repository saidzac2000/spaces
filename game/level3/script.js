const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let enemies = [];

const enemy = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    speed: 10,
    img: new Image(),
    draw: function(){
        this.img.src = "img/enemy.png";
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.y += this.speed;
    }
};


const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    w: 100,
    h: 100,
    speed: 10,
    img: new Image(),
    draw: function(){
        this.img.src = "img/level1-Spaceship.png";
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
};

addEventListener("mousemove", (e) => {
    const x = e.clientX;
    player.x = x;
});

function spawnEnemy() {
    const newEnemy = {...enemy};
    newEnemy.x = Math.random() * (canvas.width - newEnemy.w);
    newEnemy.y = 0;
    enemies.push(newEnemy);
}

setInterval(spawnEnemy, 200);

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();

    enemies.forEach((enemy, index) => {
        enemy.draw();
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        } else if (
            player.x < enemy.x + enemy.w &&
            player.x + player.w > enemy.x &&
            player.y < enemy.y + enemy.h &&
            player.y + player.h > enemy.y
        ) {
            clearInterval(spawnInterval);
            enemies = [];
            alert("Game Over");
        }
    });

    requestAnimationFrame(loop);
}
loop(); 
const spawnInterval = setInterval(spawnEnemy, 10000);