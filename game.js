let c = document.getElementById("myCanvas");
let ctx = c.getContext('2d');
let bgColor = "gray";
let grd = ctx.createLinearGradient(0,0,c.width,0);
grd.addColorStop(0,"red");
grd.addColorStop(0.1,"black");
grd.addColorStop(0.2,"blue");
grd.addColorStop(0.3,"red");
grd.addColorStop(0.4,"yellow");
grd.addColorStop(0.5,"pink");
grd.addColorStop(0.6,"blue");
grd.addColorStop(0.7,"green");
grd.addColorStop(0.8,"red");
grd.addColorStop(0.9,"white");
grd.addColorStop(1,"orange");

ctx.fillStyle = bgColor;
ctx.fillRect(0,0,1000,1000);
ctx.fillStyle = grd;
ctx.font = "30px Georgia";
ctx.fillText("CLICK TO START SPEED UP!!!",30,30);
let ss = 50;

let nhacVaCham = new Audio("nhacDie.mp3");
let nhacAn = new Audio("nhacAn.mp3");
let nhacNen = new Audio("nhacNenn.mp3");

class ToaDo {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}
function getRandomHex() {
    return Math.floor(Math.random() * 255);
}
function getRandomColor() {
    let red = getRandomHex();
    let green = getRandomHex();
    let blue = getRandomHex();
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}
let randomColor = getRandomColor();
let dir = new ToaDo(1,0);
let scoreArea = document.getElementById('score');
let score = 0;

scoreArea.innerHTML = 'Score: ' + score;

class Snake {
    constructor() {
        this.body = [
            new ToaDo(ss * 5, ss * 8),
            new ToaDo(ss * 4, ss * 8),
            new ToaDo(ss * 3, ss * 8)
        ]
        this.speed = new ToaDo(1, 0);
    }

    ve() {
        ctx.fillStyle = grd;
        ctx.fillRect(this.body[0].x, this.body[0].y, ss, ss);
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, ss, ss);
        }
    }

    xoa() {
        ctx.fillStyle = grd;
        ctx.fillRect(this.body[0].x, this.body[0].y, ss, ss);
        ctx.fillStyle = bgColor;
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, ss, ss);
        }
    }

    di() {
        this.xoa();
        for (let i = this.body.length - 1; i >= 1; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        this.body[0].x += this.speed.x * ss;
        this.body[0].y += this.speed.y * ss;
        this.chamKhung();
        this.chamThan();
        this.ve();
    }

    an(food) {
        let head = this.body[0]
        return food.x === head.x && food.y === head.y
    }

    tang(){
        this.xoa();
        let s = this.body.length;
        let mountX = this.body[s - 1].x - this.body[s - 2].x;
        let mountY = this.body[s - 1].y - this.body[s - 2].y;
        let duoi = new ToaDo(
            this.body[s - 1].x + mountX,
            this.body[s - 1].y + mountY
        )
        this.body.push(duoi);
        this.ve();
        score += 10;
        scoreArea.innerHTML = 'Score: ' + score;
    }
    teo() {
        nhacVaCham.play();
        window.location.reload();
        alert("GAME OVER!!!");
        alert("ĐIỂM CỦA BẠN LÀ " + score + " ĐIỂM.");
    }
    chamThan() {
        for (let i = 1; i < this.body.length; i++){
            if(this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
                this.teo();
            }
        }
    }
    chamKhung() {
        if(this.body[0].x < 0 || this.body[0].x + 50 > 1000 || this.body[0].y < 0 || this.body[0].y + 50 > 1000){
            this.teo();
        }
    }
}
class Food {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    ve(){
        ctx.fillStyle = randomColor;
        ctx.fillRect(this.x, this.y, ss, ss);
    }
    xoa(){
        ctx.fillStyle = bgColor;
        ctx.fillRect(this.x, this.y, ss, ss);
    }
    getRandom(){
        let random = Math.floor(Math.random() * 1000);
        random -= random % ss;
        return random;
    }
    addFood(){
        this.xoa();
        this.x = this.getRandom();
        this.y = this.getRandom();
        this.ve();
    }
}
let player = new Snake();
player.ve();
let food = new Food();
food.addFood();

let setUp = function () {
    nhacNen.play();
    player.di();
    food.ve();
    if (player.an(food)){
        nhacAn.play();
        player.tang();
        food.addFood();
    }
}

document.onkeydown = function (evt) {
    switch (evt.keyCode) {
        case 37:
            if (dir.x === 1) break;
            player.speed = new ToaDo(-1,0);
            dir = new ToaDo(-1,0);
            break;
        case 38:
            if (dir.y === 1) break;
            player.speed = new ToaDo(0,-1);
            dir = new ToaDo(0,-1);
            break;
        case 39:
            if (dir.x === -1) break;
            player.speed = new ToaDo(1,0);
            dir = new ToaDo(1,0);
            break;
        case 40:
            if (dir.y === -1) break;
            player.speed = new ToaDo(0,1);
            dir = new ToaDo(0,1);
            break;
        case 65:
            if (dir.x === 1 && dir.y === -1) break;
            player.speed = new ToaDo(-1,1);
            dir = new ToaDo(-1,1);
            break;
        case 87:
            if (dir.x === 1 && dir.y === 1) break;
            player.speed = new ToaDo(-1,-1);
            dir = new ToaDo(-1,-1);
            break;
        case 68:
            if (dir.x === -1 && dir.y === 1) break;
            player.speed = new ToaDo(1,-1);
            dir = new ToaDo(1,-1);
            break;
        case 83:
            if (dir.x === -1 && dir.y === -1) break;
            player.speed = new ToaDo(1,1);
            dir = new ToaDo(1,1);
            break;
        default:
            break;
    }
}

