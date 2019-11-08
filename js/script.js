var CSS_COLOR_NAMES = ["Aqua", "Aquamarine", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "ForestGreen", "Fuchsia", "Gainsboro", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "Yellow", "YellowGreen"];
var color;
var selectedItem = [];
var timeouts = [];
var currentMove = 0;
var simFlag = false;
var playerFlag = false;
var gameCounter=0;
var tickAwsome = '<i class="fa fa-check fa-3x" aria-hidden="true"></i>'
var starAwsome = '<i class="fa fa-star fa-3x" aria-hidden="true"></i>'
var timesAwsome = '<i class="fa fa-times fa-3x" aria-hidden="true"></i>'
var soundOn='<i class="fa fa-volume-up fa-3x" aria-hidden="true" ></i>';
var soundOff='<i class="fa fa-volume-off fa-3x" aria-hidden="true"></i>'
var speed = 3000;
var speedDefault = 3000;
var offset = 1000;
var level = 1;
var score = 0;
var bestScore=0;
var musicTemp=[];
var hr = (new Date()).getHours();
var musicList=["files/bensound-anewbeginning.mp3","files/bensound-happiness.mp3","files/bensound-tenderness.mp3","files/bensound-cute.mp3","files/bensound-buddy.mp3"];
var musicRandom=Math.floor(Math.random()*musicList.length);
var audio = new Audio(musicList[musicRandom]);
var playStatus=false;
var newRecordNotif="";


audio.onended = function(){
    musicTemp.push(musicList.splice(musicRandom,1));
    musicRandom=Math.floor(Math.random()*musicList.length);
    audio.src=musicList[musicRandom];
    audio.load();
    if(musicList.length==1){
       musicList.push.apply(musicList,musicTemp);
        musicTemp=[];
    } 
    audio.play();
};

if (hr>=19||hr<6){
    tickAwsome='<i class="fa fa-check fa-3x" aria-hidden="true" style="color:white"></i>';
    timesAwsome='<i class="fa fa-times fa-3x" aria-hidden="true" style="color:white"></i>';
    starAwsome = '<i class="fa fa-star fa-3x" aria-hidden="true" style="color:white"></i>';
}

function audioControl(){
    if (playStatus==true){
        audio.pause();
        playStatus=false;
        document.getElementById("sound_on_off").innerHTML=soundOff;
    }
    else{
        audio.play();
        playStatus=true;
        document.getElementById("sound_on_off").innerHTML=soundOn;
    }
}

function localSave(s,c){
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("mnimi_score", s);
        localStorage.setItem("mnimi_game", c);
    }
    
}

function localLoad(){
     if (typeof(Storage) !== "undefined") {
        gameCounter=parseInt(localStorage.getItem("mnimi_game"));
        if (gameCounter){
            bestScore=parseInt(localStorage.getItem("mnimi_score"));
            if (bestScore==NaN){
                bestScore=0;
            }
            if (bestScore > 0){
                document.getElementById("score_button").innerHTML="SCORE("+bestScore.toString()+")";
                document.getElementById("score_button").style.display="inline";
            }  
        }
         else{
             
             gameCounter=0;
         }
         
    }
    
    
}
function redirect(flag){
    switch(flag){
        case 1:
            window.open("");
            break;
        case 2:
            swal({   
            title:"Bitocin Wallet",
            text:"1XGr9qbZjBpUQJJSB6WtgBQbDTgrhPLPA",
            customClass: 'swal-bitcoin'
            });
            break;
        case 3:
            window.open("");
            break;
        case 4:
            window.open("https://www.payping.ir/sepandhaghighi");
            break;
        case 5:
            window.open("help.html","_self")
            break;
        case 6:
            window.open("donate.html","_self")
            break;
        case 7:
            window.open("index.html","_self")
            break;
        default:
            window.open("");
            
    }
    
}

function swalHelp(){
    swal({
    title: "Hi",
    text: '<p style="text-align:justify">Mnimi is a game of memory skill inspired by Simon electronic game. The game creates a series of lights and requires a user to repeat the sequence. If the user succeeds, the series becomes progressively longer and more complex. Once the user fails, the game is over.</p>',
    html: true,
    customClass: "swal-wide"
});
}

function begin(){
    localLoad();
    swalHelp();
    init();
}

function init() {
    color = CSS_COLOR_NAMES[Math.floor((Math.random() * CSS_COLOR_NAMES.length))].toLowerCase();
    var i, randomNumber, randomCounter, gameName, colorCounter;
    var randomList = [];
    colorCounter = 1;
    gameName = document.getElementById("game_name");
    gameName.style.color = color;
    gameName.innerHTML = "Mnimi Game";
    while (colorCounter < 5) {
        randomColor = CSS_COLOR_NAMES[Math.floor((Math.random() * CSS_COLOR_NAMES.length))].toLowerCase();
        if (randomList.indexOf(randomColor) < 0) {
            randomList.push(randomColor);
            document.getElementById(colorCounter.toString()).style.backgroundColor=randomColor;
            colorCounter = colorCounter + 1;
            
        }
    }
}

function set(index,mode=1){
    if(mode==1){
        document.getElementById(index.toString()).innerHTML = starAwsome;
    }
    else if(mode==2){
        document.getElementById(index.toString()).innerHTML = tickAwsome;
    }
    else{
        document.getElementById(index.toString()).innerHTML = timesAwsome;
    }
    
}


function reset(index){
    document.getElementById(index.toString()).innerHTML = "";
}

function selectItems(){
    selectedItem = [];
    var item;
    var i=0;
    for(i;i<level;i++){
        item = Math.floor((Math.random() * 4))+1;
        selectedItem.push(item);
    }
}

function sequence(i){
    var item;
    item = selectedItem[i];
    set(item);
    if((i+1)>=selectedItem.length){
        timeouts.push(window.setTimeout(function(){reset(item);playerGo();simFlag = false;playerFlag = true;},speed));
    }
    else{
        timeouts.push(window.setTimeout(function(){reset(item);},speed));
        timeouts.push(window.setTimeout(function(){sequence(i+1);},speed+offset));
    }
}


function simulation(){
    selectItems();
    sequence(0);
}
function scoreUpdate(){
    var win;
    win = document.getElementById("win");
    win.innerHTML = score.toString();
}

function gameOver(){
    clearTimeouts();
    clear();
    currentMove = 0;
    gameCounter = gameCounter + 1;
    if (score>bestScore){
        bestScore = score;
    }
    playerFlag = false;
    simFlag = false;
    level = 1;
    speed = speedDefault ;
    swal({
          title:"",
          text: '<p style="font-size:26px;">Score : '+score.toString()+'</p>',
          html: true,
          customClass: "swal-score",
          imageUrl: "images/gameover.png"
          });
    if (bestScore > 0) {
        document.getElementById("score_button").innerHTML="SCORE("+bestScore.toString()+")";
        document.getElementById("score_button").style.display="inline";
    }
    localSave(bestScore,gameCounter);
    score = 0;
    scoreUpdate();
    startButtonUpdate(null);
}

function startButtonUpdate(i){
    var button;
    button = document.getElementById("start");
    if (i != null){
    button.innerHTML = "Level "+i.toString(); 
    }
    else{
       button.innerHTML = "Start";  
    }
}

function nextLevel(){
    
    clear();
    playerFlag = false;
    currentMove = 0;
    level = level + 1;
    if (speed>450){
        speed = speed - 100;
    }
    score = score +1;
    scoreUpdate();
    startButtonUpdate(level);
}


function replyClick(e) {
    if (simFlag==false && playerFlag==true){
       set(e,2);        
       if (selectedItem[currentMove]==parseInt(e)){
            currentMove = currentMove + 1;
            if (currentMove==level){
                timeouts.push(window.setTimeout(function(){reset(e);nextLevel();},500));
            }
           else{
               timeouts.push(window.setTimeout(function(){reset(e);},500));
           }
        
        }
       else{
        set(e,3);
        timeouts.push(window.setTimeout(function(){reset(e);gameOver();},500));
       }
    }
}

function scoreTable(){
    if (gameCounter>0){
            swal({
                    title:"Score!",
                    text: '<table align="center" style="font-size:26px;"><tr><td style="padding:20px;">Best Score</td><td style="padding:20px;">'+bestScore.toString()+'</td></tr style="padding:20px;"><tr><td>Game</td><td style="padding:20px;">'+gameCounter.toString()+'</td></tr></table>',
                    html: true,
                    customClass: "swal-score"
                    });
            }
}

function clear(){
    var i;
    for (i=1;i<5;i++){
        document.getElementById(i.toString()).innerHTML = "";
    }
}

function playerGo(){
    var i;
    for (i=1;i<5;i++){
        document.getElementById(i.toString()).innerHTML = "GO";
    }
    timeouts.push(window.setTimeout(function(){clear();},1000));
}

function startGame(){
    if (simFlag==false && playerFlag==false){
        simFlag = true;
        simulation();
    }
    if (playerFlag==true){
        playerGo();
    }
}

function clearTimeouts(){
    var i;
    for(i=0;i<timeouts.length;i++){
        window.clearTimeout(timeouts[i]);
    }
    timeouts = [];
}

function restartGame(){
    clearTimeouts();
    clear();
    simFlag=false;
    playerFlag=false;
    score=0;
    currentMove=0;
    speed=speedDefault;
    level=1;
    startButtonUpdate(null);
    scoreUpdate();
    init();
}

shortcut.add("q",function(){swalHelp();});
shortcut.add("r",function(){restartGame();});