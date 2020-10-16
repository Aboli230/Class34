var ball;
var database,position;

function setup(){
    database=firebase.database();
    //to create database
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballPosition=database.ref("ball/position")
    //ref referss the location of the child(ball positon.x/y)
    ballPosition.on("value",readPosition,showError);
    //on reads the data from the data base and it is continues listner
}
//asynchronous is dependant
function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //it sets the value
    database.ref("ball/position").set({
        //JSON IS JAVA SCRIPT OBJECT NOTATION(used to store data like var)
        x:ball.x+x,
        y:ball.y+y
  })
    }
function readPosition(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;
}
function showError(){
    console.log("error");
}