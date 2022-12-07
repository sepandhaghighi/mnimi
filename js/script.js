const version = "0.1.3";
var colorList = [];
var blockNumber = 4;
var darkColors = ["BLACK","DARKSLATEGRAY","SLATEGRAY","DIMGRAY","GRAY","MAROON","BROWN","SIENNA","SADDLEBROWN","CHOCOLATE","PERU","DARKGOLDENROD","GOLDENROD","MIDNIGHTBLUE","NAVY","DARKBLUE","MEDIUMBLUE","BLUE","ROYALBLUE","MEDIUMSLATEBLUE","DODGERBLUE","STEELBLUE","TEAL","DARKCYAN","DARKOLIVEGREEN","OLIVEDRAB","DARKGREEN","GREEN","FORESTGREEN","MEDIUMSEAGREEN","SEAGREEN","LIMEGREEN","LIME","MEDIUMSLATEBLUE","INDIGO","DARKMAGENTA","DARKORCHID","DARKVIOLET","REBECCAPURPLE","BLUEVIOLET","MAGENTA","DARKKHAKI","ORANGE","DARKORANGE","ORANGERED","MEDIUMVIOLETRED","DEEPPINK","DARKRED","FIREBRICK","RED","CRIMSON"];
var lightColors = ["LIGHTSALMON","LIGHTCORAL","PINK","LIGHTPINK","LIGHTSALMON","ORANGE","LIGHTYELLOW","LEMONCHIFFON","PAPAYAWHIP","PEACHPUFF","PALEGOLDENROD","LAVENDER","THISTLE","PALEGREEN","MEDIUMAQUAMARINE","LIGHTCYAN","PALETURQUOISE","LIGHTSTEELBLUE","CORNSILK","WHEAT","SNOW","HONEYDEW","MINTCREAM","AZURE","GHOSTWHITE","BEIGE","FLORALWHITE","LINEN","LAVENDERBLUSH","GAINSBORO","SILVER","LIGHTGRAY"];
colorList = darkColors;
var color;
var textColor = "white";
var selectedItem = [];
var timeouts = [];
var currentMove = 0;
var simFlag = false;
var playerFlag = false;
var mutationFlag1 = false;
var mutationFlag2 = false;
var mutationLevel1 = 7;
var mutationLevel2 = 14;
var gameCounter=0;
var tickAwsome = '<i class="fa fa-check fa-3x" aria-hidden="true" style="color:white"></i>'
var starAwsome = '<i class="fa fa-star fa-3x" aria-hidden="true" style="color:white"></i>'
var timesAwsome = '<i class="fa fa-times fa-3x" aria-hidden="true" style="color:white"></i>'
var trophyAwsome = '<i class="fa fa-trophy fa-3x" aria-hidden="true" style="color:white"></i>'
var soundOn='<i class="fa fa-volume-up fa-3x" aria-hidden="true" ></i>';
var soundOff='<i class="fa fa-volume-off fa-3x" aria-hidden="true"></i>'
var speed = 2500;
var speedStep = 400;
var speedDefault = 2500;
var offset = 1000;
var nextLevelDelay = 1000;
var resetDelay = 500;
var gameOverDelay = 500;
var goDelay = 700;
var levelShowDelay = 1000;
var level = 1;
var selectCounter = 1;
var score = 0;
var bestScore=0;
var musicTemp=[];
var hr = (new Date()).getHours();
var startTime = null;
var endTime = null;
var gameTime = "00:00:00";;
var bestGameTime = "00:00:00";
var musicList=["files/bensound-acousticbreeze.mp3","files/bensound-adaytoremember.mp3","files/bensound-smile.mp3","files/bensound-sunny.mp3","files/bensound-ukulele.mp3"];
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
    tickAwsome='<i class="fa fa-check fa-3x" aria-hidden="true" style="color:black"></i>';
    timesAwsome='<i class="fa fa-times fa-3x" aria-hidden="true" style="color:black"></i>';
    starAwsome = '<i class="fa fa-star fa-3x" aria-hidden="true" style="color:black"></i>';
    trophyAwsome = '<i class="fa fa-trophy fa-3x" aria-hidden="true" style="color:black"></i>';
    colorList = lightColors;
    textColor = "black";
    
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

function localSave(s,c,t){
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("mnimi_score", s);
        localStorage.setItem("mnimi_game", c);
        localStorage.setItem("mnimi_time", t);
    }
    
}

function localLoad(){
     if (typeof(Storage) !== "undefined") {
        gameCounter=parseInt(localStorage.getItem("mnimi_game"));
        if (gameCounter){
            bestScore=parseInt(localStorage.getItem("mnimi_score"));
            bestGameTime=localStorage.getItem("mnimi_time");
            if (bestGameTime==null){
               bestGameTime="00:00:00"; 
            }
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
            window.open("https://github.com/sepandhaghighi/mnimi");
            break;
        case 2:
            swal({   
            title:"Bitocin Wallet",
            text:"1KtNLEEeUbTEK9PdN6Ya3ZAKXaqoKUuxCy",
            customClass: 'swal-bitcoin'
            });
            break;
        case 3:
            window.open("mailto:info@mnimi.ir");
            break;
        case 4:
            window.open("https://www.coffeete.ir/opensource");
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
    tableStyle(mode=false);
    localLoad();
    swalHelp();
    init();
}

function init() {
    color = colorList[Math.floor((Math.random() * colorList.length))].toLowerCase();
    var i, randomNumber, randomCounter, gameName, colorCounter;
    var randomList = [];
    colorCounter = 1;
    gameName = document.getElementById("game_name");
    gameName.style.color = color;
    gameName.innerHTML = "Mnimi Game (v"+version+")";
    while (colorCounter < blockNumber+1) {
        randomColor = colorList[Math.floor((Math.random() * colorList.length))].toLowerCase();
        if (randomList.indexOf(randomColor) < 0) {
            randomList.push(randomColor);
            document.getElementById(colorCounter.toString()).style.backgroundColor=randomColor;
            colorCounter = colorCounter + 1;
            
        }
    }
}

function set(index,mode=1,seq=1){
    if(mode==1){
        document.getElementById(index.toString()).innerHTML = seq.toString() + starAwsome;
    }
    else if(mode==2){
        document.getElementById(index.toString()).innerHTML = seq.toString() + tickAwsome;
    }
    else {
        document.getElementById(index.toString()).innerHTML = timesAwsome;
    }
    
}


function reset(index){
    document.getElementById(index.toString()).innerHTML = "";
}

function selectItems(){
    var newItemsCounter = selectCounter - selectedItem.length;
    var item;
    var i=0;
    for(i;i<newItemsCounter;i++){
        item = Math.floor((Math.random() * blockNumber))+1;
        selectedItem.push(item);
    }
}

function sequence(i){
    var item;
    item = selectedItem[i];
    set(item,mode=1,seq=i+1);
    if((i+1)>=selectedItem.length){
        timeouts.push(window.setTimeout(function(){reset(item);playerGo();simFlag = false;tableStyle(mode=true);},speed));
    }
    else{
        timeouts.push(window.setTimeout(function(){reset(item);},speed));
        timeouts.push(window.setTimeout(function(){sequence(i+1);},speed+offset));
    }
}


function simulation(){
    clear();
    selectItems();
    sequence(0);
}

function mutation(mode=true){
    if (mode==true){
        var table,row,col1,col2
        table = document.getElementById("mnimi");
        blockNumber = blockNumber+2;
        row = table.insertRow(1);
        if (mutationFlag2==false){
            row.id="mutation-row1";
        }
        else{
            row.id="mutation-row2";
        }
        col1 = row.insertCell(0);
        col1.id=(blockNumber-1).toString();
        col1.onclick = function(){replyClick(col1.id)};
        col2 = row.insertCell(1);
        col2.id=(blockNumber).toString();
        col2.onclick = function(){replyClick(col2.id)};
    }
    else{
        blockNumber = 4;
        var row1,row2;
        row1 = document.getElementById("mutation-row1");
        row2 = document.getElementById("mutation-row2");
        if (row1!=null){
            row1.remove();
        }
        if (row2!=null){
            row2.remove();
        }
        
    }
    init();
    
}

function mutationCheck(){
    if (level>mutationLevel1 && mutationFlag1==false){
        mutationFlag1 = true;
        mutation(mutationFlag1);
    }
    if (level>mutationLevel2 && mutationFlag2==false){
        mutationFlag2 = true;
        mutation(mutationFlag2);
    }
}

function scoreUpdate(){
    var win;
    win = document.getElementById("win");
    win.innerHTML = score.toString();
}
function timeConvert(start,stop){
    var diff = stop - start;
    var hhString,mmString,ssString;
    var hh = Math.floor(diff / 1000 / 60 / 60);
    diff -= hh * 1000 * 60 * 60;
    var mm = Math.floor(diff / 1000 / 60);
    diff -= mm * 1000 * 60;
    var ss = Math.floor(diff / 1000);
    hhString = hh.toString();
    mmString = mm.toString();
    ssString = ss.toString();
    if (hhString.length==1){
        hhString = "0"+hhString;
    }
    if (mmString.length==1){
        mmString = "0"+mmString;
    }
    if (ssString.length==1){
        ssString = "0"+ssString;
    }
    return hhString+":"+mmString+":"+ssString
    
}
function gameOver(){
    endTime = new Date();
    gameTime = timeConvert(startTime,endTime);
    gameCounter = gameCounter + 1;
    if (score>bestScore){
        bestScore = score;
        bestGameTime = gameTime;
        newRecordNotif="<h2>New Record!</h2>&nbsp;";
    }
    else{
        newRecordNotif="";
    }
    swal({
          title:"",
          text: newRecordNotif + '<table align="center" style="font-size:26px;"><tr><td style="padding:20px;">Score</td><td style="padding:20px;">'+score.toString()+'</tr><tr><td>Time</td><td style="padding:20px;">'+gameTime.toString()+'</td></tr></table>',
          html: true,
          customClass: "swal-score",
          imageUrl: "images/gameover.png"
          });
    if (bestScore > 0) {
        document.getElementById("score_button").innerHTML="SCORE("+bestScore.toString()+")";
        document.getElementById("score_button").style.display="inline";
    }
    localSave(bestScore,gameCounter,bestGameTime);
    restartGame();
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
    selectCounter = selectCounter + 1;
    if (speed>550){
        speed = speed - speedStep;
    }
    mutationCheck();
    score = score +1;
    scoreUpdate();
    startButtonUpdate(level);
    startGame();
}


function replyClick(e) {
    if (simFlag==false && playerFlag==true){
       clear();
       clearTimeouts();
       set(e,2,currentMove+1);        
       if (selectedItem[currentMove]==parseInt(e)){
            currentMove = currentMove + 1;
            if (currentMove==selectCounter){
                playerFlag = false;
                clearTimeouts();
                trophy();
                timeouts.push(window.setTimeout(function(){nextLevel();},nextLevelDelay));
            }
           else{
               timeouts.push(window.setTimeout(function(){reset(e);},resetDelay));
           }
        
        }
       else{
        set(e,3);
        playerFlag = false;
        timeouts.push(window.setTimeout(function(){reset(e);gameOver();},gameOverDelay));
       }
    }
}

function scoreTable(){
    if (gameCounter>0){
            swal({
                    title:"Score!",
                    text: '<table align="center" style="font-size:26px;"><tr><td style="padding:20px;">Best Score</td><td style="padding:20px;">'+bestScore.toString()+'</td></tr><tr><td>Time</td><td style="padding:20px;">'+bestGameTime.toString()+'</td></tr><tr><td>Game</td><td style="padding:20px;">'+gameCounter.toString()+'</td></tr></table>',
                    html: true,
                    customClass: "swal-score"
                    });
            }
}

function clear(){
    var i;
    for (i=1;i<blockNumber+1;i++){
        document.getElementById(i.toString()).innerHTML = "";
    }
}

function trophy(){
    var i;
    for (i=1;i<blockNumber+1;i++){
        document.getElementById(i.toString()).innerHTML = trophyAwsome;
    }
}

function tableStyle(mode=true){
    var i,item,className;
    className = "player-turn";
    if(mode==false){
        className = "not-allowed";
    }
    for (i=1;i<blockNumber+1;i++){
        item = document.getElementById(i.toString());
        item.className = className;
        
    }
}

function levelShow(){
    var i;
    var message = "Level "+level.toString();
    if (level==1){
        startTime = new Date();
        message = "Start";
    }
    for (i=1;i<blockNumber+1;i++){
        document.getElementById(i.toString()).innerHTML = message;
        document.getElementById(i.toString()).style.color = textColor;
        document.getElementById(i.toString()).style.fontWeight = "bold";
    }
}

function playerGo(){
    var i;
    for (i=1;i<blockNumber+1;i++){
        document.getElementById(i.toString()).innerHTML = "GO";
        document.getElementById(i.toString()).style.color = textColor;
        document.getElementById(i.toString()).style.fontWeight = "bold";
    }
    timeouts.push(window.setTimeout(function(){clear();playerFlag = true;},goDelay));
}

function startGame(){
    if (simFlag==false && playerFlag==false){
        tableStyle(mode=false);
        simFlag = true;
        levelShow();
        timeouts.push(window.setTimeout(function(){clear();},levelShowDelay))
        timeouts.push(window.setTimeout(function(){simulation()},levelShowDelay + offset));
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
    tableStyle(mode=false);
    selectedItem=[];
    startTime=null;
    endTime=null;
    clearTimeouts();
    clear();
    simFlag=false;
    playerFlag=false;
    score=0;
    currentMove=0;
    speed=speedDefault;
    level=1;
    selectCounter = 1;
    startButtonUpdate(null);
    scoreUpdate();
    if (mutationFlag1==true || mutationFlag2==true){
        mutationFlag1 = false;
        mutationFlag2 = false;
        mutation(false);
    }
    init();
}

shortcut.add("q",function(){swalHelp();});
shortcut.add("r",function(){restartGame();});