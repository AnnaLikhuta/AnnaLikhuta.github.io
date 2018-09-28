
// найти, куда время записыать
var timeElem=document.getElementById('time');

// куда вешать обработчик
var buttonStartTime=document.getElementById('closeModal')
buttonStartTime.addEventListener('click',startTick, false );

var cancelTimeGame,startTime;

function startTick (){

  if(cancelTimeGame){
    clearInterval(cancelTimeGame);
    cancelTimeGame=0;
    console.log('winner');

  }
  startTime=new Date();
   cancelTimeGame=setInterval(updateTime,200);
   console.log('winner');

}

function updateTime() {
// когдаопределиться победитель,таймер остановится
 
  // время в момент вызова таймера
  var nowTime=new Date();
 var currTimeStr=formatDateTime(startTime, nowTime );
  timeElem.innerHTML= ' ' +currTimeStr ;
  console.log(' timer  tick')
  if(winner.name) {
    console.log('winner in timer')
    // записать время  для отображения в модальном окне
    winner.stringTime=currTimeStr;
    // время для записи в табл. рекордов
    winner.inNumberTime=nowTime-startTime;
    console.log(winner);
    clearInterval(cancelTimeGame)
    //как сигнал, что игра окончена
    //вызвать функцию. появляется модальное окно
        toShowWinner();
    // функция для записи данных в таблицу рекордов. сравнить, можно ли туда записать.
    // и дать в модальном сообщении, что новый рекорд добавлен
    // запуск одной функции здесь, которая все делает
    //сохранить рекорд
   saveInfoAboutPlayer();

    toWriteRecord();
    //  а сработала ли?

   // allCoctail ();
   // убрать обводку у активного окна

      // кто  забил, или active
      // убрать обводку  модального  окна

      if(player1.active==true){
        ElemPlayer1.classList.remove('active')
        }
        else{
        ElemPlayer2.classList.remove('active')
        }
    

      
  }

}

// форматирует переданную дату-время в формате  чч:мм:сс
function formatDateTime(startTime, nowTime) {
  var deltaTime=nowTime-startTime;
// отобразить в нужном для меня  формате
    var minutes=Math.floor(deltaTime/1000/60);
    var seconds=Math.ceil((deltaTime-minutes*1000*60)/1000);
    return str0l(minutes,2) + ':' + str0l(seconds,2);
}

// дополняет строку val слева нулями до длины Len
function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}

//---------------------
