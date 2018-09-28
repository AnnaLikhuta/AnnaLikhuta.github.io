

// записать  цвет и кто ходит первым ----------------------------

function whoCanStepFirst(){
  if(player1.active==true){
    // дать знать, кто ходит первым
    countElemPlayer1.innerText='Ваш ход первым';
  }
  if(player1.active==false ){
    countElemPlayer2.innerText='Ваш ход первым';
  }
}
//записать цвета в modal
function getColorForPlayer(){
  colorPlyer1.innerText=player1.color;
  colorPlyer1.style.color=''+player1.color+'';
  colorPlyer2.innerText=player2.color;
  colorPlyer2.style.color=''+player2.color+'';

}
//----------------------------------------------------------

// поле для ошибки
var alarmElem=document.getElementById('alarm');





//правильно ли форма заполнена. контроль
var condition=false;

// имена игроков для дальнейшей игры
var firstNamePlayer, secondNamePlayer;
//-------------------------------------------


// подписка на события
window.onload=function(){
  document.body.className='modal-active';
  modal.className='one'
  }

  modalCloseElem.addEventListener('click', closeModalWithoutName, false);
  closeModal.addEventListener('click', toCloseModal, false);

  firstPlayerElem.onblur=checkFom;
secondPlayerElem.onblur=checkFom;

//убрать ошибку,когда начинаешь вводить имя
firstPlayerElem.onclick=function(){
  alarmElem.className='hide_alarm'

};
secondPlayerElem.onclick=function(){
  alarmElem.className='hide_alarm'

};

modalWinnerClose.addEventListener('click', closeModalWinner, false);

buttonNewGame.addEventListener('click', beginNewGame, false);
buttonNewGame.addEventListener('click', closeModalWithoutName, false);

buttonRulesOfGame.addEventListener('click', toShowRules, false);
modalRulesClose.addEventListener('click', closeModalRuleS, false);


buttonRecords.addEventListener('click', toShowRecords, false);
modalRecordsClose.addEventListener('click', modalRecordsToClose, false);

function modalRecordsToClose(EO){
  EO.preventDefault();
  EO=EO|| window.event;
  if(EO.target==modalRecordsClose){
    modalRecords.className='one out';
  //modalRulesClose.removeEventListener('click', closeModalWithoutName, false);
 // console.log('test call from closeModalRuleS');
  }
  EO.stopPropagation();

}


function toShowRecords(EO){
  EO.preventDefault();
  EO=EO|| window.event;
  if(EO.target==buttonRecords){
    document.body.className='modal-active';
    modalRecords.className='one'
    EO.stopPropagation();
    toWriteRecord();

  }

}

function toShowRules(EO){
  EO.preventDefault();
  EO=EO|| window.event;
  if(EO.target==buttonRulesOfGame){
    document.body.className='modal-active';
    modalRules.className='one'
    EO.stopPropagation();

  }

}

function closeModalRuleS(EO){
  EO.preventDefault();
  EO=EO|| window.event;
  if(EO.target==modalRulesClose){
    modalRules.className='one out';
  //modalRulesClose.removeEventListener('click', closeModalWithoutName, false);
  }
 EO.stopPropagation();

}



function beginNewGame(EO){
  EO.preventDefault();
  EO=EO|| window.event;
  if(EO.target==buttonNewGame){
    firstPlayerElem.value='';
    secondPlayerElem.value='';
    document.body.className='modal-active';
    modal.className='one'
    EO.stopPropagation();
    // вызывается
   //перерисовка

   var deleteOldGame=document.getElementById('game_field');
   /*
   // кто  забил, или active
   console.log(player1);
   console.log(player2);
*/


deleteOldGame.innerHTML=' ';
startBaby();
// обновить информацию  по игрокам в окошках
// как при загрузке страницы

countElemPlayer1.innerHTML='<br>';
countElemPlayer2.innerHTML='<br>';
colorPlyer1.innerHTML='<br>';
colorPlyer2.innerHTML='<br>';
firstElem.innerHTML='<br>';
secondElem.innerHTML='<br>';
timeElem.innerHTML='';
  }

}


  function closeModalWithoutName(EO){
    EO.preventDefault();
    EO=EO|| window.event;
    if(EO.target==modalCloseElem){
      modal.className='one out';
    //  console.log('closeModalWithoutName')
   //   modalCloseElem.removeEventListener('click', closeModalWithoutName, false);
      getColorForPlayer();
      whoCanStepFirst();
    
    }
   EO.stopPropagation();
  }

function toCloseModal (){
  // окно закроется, когда поля заполнены
  if(condition==true){
  modal.className='one out'
  // записать нужные данные,имена
  firstNamePlayer=firstPlayerElem.value;
  secondNamePlayer=secondPlayerElem.value;
 // console.log(firstNamePlayer, secondNamePlayer )
  var firstElem=document.getElementById('first_player');
  firstElem.innerText=firstNamePlayer;
  
  var secondElem=document.getElementById('second_player');
  secondElem.innerText=secondNamePlayer;
  
  // записать имена
  //это в другом скрипте gamefield
  player1.name=firstElem.innerHTML;
  player2.name=secondElem.innerHTML;
  
  // в игре показать данные по игрокам
  getColorForPlayer();
  whoCanStepFirst();

}
  else{
    alarmElem.innerText='введите имя';
    alarmElem.className='show_alarm';
   // alert('введите имя')
  }
}



function checkFom(EO){
  EO=EO||window.event;
  //  проверка на пустоту
  var  abc=EO.target.value;
  if(abc==''|| abc==' ' ){
  }
else
condition=true;
}


var container = document.querySelector( 'h1' );
var palette = [ '#4ECDC4', '#A9CF54', '#FF6B6B', '#556270']
var paletteIndex = 0;

setInterval( function() {
  
  // Reset spans rotation without transitions
  container.className = 'no-transition';
  
  // Debounce change to allow for css changes
  setTimeout( function() {
    container.style.color = palette[paletteIndex];
    container.className = 'transition';
    paletteIndex += 1;
    paletteIndex %= palette.length;
  }, 30 );
  
  
}, 3000 );

// модальное окно для победителя

function toShowWinner(){
  document.body.className='modal-active';
  modalWinner.className='one'
 // infoAboutWinner.style.color=''+winner.color+'';
  infoAboutWinner.innerText='Имя: '+winner.name+' Время: '+winner.stringTime+'';

  console.log('test call from toShowWinner')
}


function closeModalWinner(EO){
  EO.preventDefault();
  EO=EO|| window.event;
  if(EO.target==modalWinnerClose){
    modalWinner.className='one out';
  //  console.log('closeModalWithoutName')
 // modalWinnerClose.removeEventListener('click', closeModalWithoutName, false);
  console.log('test call from closeModalWinner');
 // console.log('winner');

 // console.log(winner);
  }
 EO.stopPropagation();

}


