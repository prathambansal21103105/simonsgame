//variables
var color=["red","blue","green","yellow"];
var gamepattern=[];
var userclickedpattern=[];

var level=0;
var started=false;

//functions
function startOver(){
    level=0;
    gamepattern=[];
    started=false;
}

function checkans(level){
    if(gamepattern[level]===userclickedpattern[level]){
        console.log("success");
        if(userclickedpattern.length===gamepattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatepress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100);
}

function nextSequence(){
    userclickedpattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var num=Math.floor((Math.random()*4));
    var nextcolor=color[num];
    gamepattern.push(nextcolor);
    $("#"+nextcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(nextcolor);
}

//events
$(".btn").click(function(){
    userchosencolor=$(this).attr("id");
    userclickedpattern.push(userchosencolor);
    playsound(userchosencolor);
    animatepress(userchosencolor);
    checkans(userclickedpattern.length-1);
});

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

