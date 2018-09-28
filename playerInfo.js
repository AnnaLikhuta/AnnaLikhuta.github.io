//  найти объекты по ID
var ElemPlayer1=document.getElementById('conteiner_player1');
var ElemPlayer2=document.getElementById('conteiner_player2');

var countElemPlayer1=document.getElementById('first_player_count');
var countElemPlayer2=document.getElementById('second_player_count');

var firstElem=document.getElementById('first_player');
var secondElem=document.getElementById('second_player');

    var timeElem=document.getElementById('time');
    var buttonStartTime=document.getElementById('closeModal');

    var winner;

    buttonStartTime.addEventListener('click',startInfoPlayer, false );

    function startInfoPlayer (){
      changePlayerState();
      getColorForPlayer();
      
    }

    
// создать класс игрока

function Player (){
  var self=this;
  self.color=false;
  self.active=false;
  self.count=0;
  self.timeStep=0;
  self.name=true;
}

// создать объект игрока
var player1=new Player();
var player2=new Player();
var numbRandomArr=getRandomNumber();
// console.log(numbRandomArr);


// console.log(player1, player2);




// для рандомного значения 0 или 1
// первая цифра: 0 - цвет magenta, 1- aqua
// вторая цифра: 0 - active=false , 1- active=true;
function getRandomNumber(){
var numbRandomArr=[];
for(var i=0; i<=1; i++){
  var abc=Math.floor(Math.random()*(1-0+1))+0;
  numbRandomArr.push(abc);
}
return  numbRandomArr;
}
//узнать,кто active/passive. глоальные  объекты
var objAboutStatePlayer=whoActiveOrPassivePlyer();
var activePlayer=objAboutStatePlayer.activePlayer;
var passivePlayer=objAboutStatePlayer.passivePlayer
console.log('activePlayer')

console.log(activePlayer)
console.log('passivePlayer')

console.log(passivePlayer)


// распределить значения по игрокам
function changePlayerState(){
  // color
  if(numbRandomArr[0]==0){
    player1.color='magenta';
    player2.color='aqua';
   }
   else if(numbRandomArr[0]==1){
    player1.color='aqua';
    player2.color='magenta';
   }
   // who first step
   if(numbRandomArr[1]==0){
    player1.active=false;
    player2.active=true;
   }
   else if(numbRandomArr[1]==1){
    player1.active=true;
    player2.active=false;
   }

}

//записать цвета в modal
function getColorForPlayer(){
  var colorPlyer1=document.getElementById('first_player_color');
  colorPlyer1.innerText=player1.color;
  colorPlyer1.style.color=''+player1.color+'';
  var colorPlyer2=document.getElementById('second_player_color');
  colorPlyer2.innerText=player2.color;
  colorPlyer2.style.color=''+player2.color+'';

}
function whoActiveOrPassivePlyer(){
  if(player1.active==true){
    // дать знать, кто ходит первым
    // определить active/passive
    countElemPlayer1.innerText='Ваш ход первым';
   // console.log(player1,player2)
    return {activePlayer:player1,
            passivePlayer:player2}
  }
  if(player1.active==false ){
    countElemPlayer2.innerText='Ваш ход первым';

    return {passivePlayer:player1,
           activePlayer:player2}

  }
}
