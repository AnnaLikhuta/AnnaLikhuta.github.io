 



var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var stringName='LIKHUTA_PROJECT_SHASHKI';


function  saveAJAXStorage(abc){
var updatePassword;

function storeInfo() {

    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
    else {
        // нам всё равно, что было прочитано - 
        // всё равно перезаписываем
        var info=abc;
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );
    }
}

function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
}
function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}
storeInfo();
}

//создать класс

function AJAXStorage ( ){

  var self=this; 
  self.updatePassword;

  //создать объект для хранения данных, местный - ключ:значение
  self.objInfo={};

  //записатьс сервера.  тупо вставила в конструктор. 
  self.restoreInfo=function () {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : self.readReady, error : errorHandler
        }
    );
  }
  
  self.readReady=function (callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
    else if ( callresult.result!="" ) {
      self.objInfo=JSON.parse(callresult.result); 
      
    }
  }
  
  function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
  }
  self.restoreInfo()

 // добавить данные
 self.addValue = function (key,value){
  self.objInfo[key]=value; 
  console.log(self.objInfo)
  saveAJAXStorage(self.objInfo)

      }

  //найти данные в текущем хэше
  self.getValue = function(key){
     if( key in self.objInfo){
            return self.objInfo[key]; }
         return false;
         }

   // удалить данные
   self.deleteValue = function(key){
      if(! self.objInfo[key]){
           return false;
       }
       else{
       delete self.objInfo[key];
     saveAJAXStorage(self.objInfo)
       return true;}
   }

   // получить полный список элементов хэша, т.е.ключей
   self.getKeys = function(){
 return Object.keys(self.objInfo)
   }
}

// создать объекты
var recordsStorage= new AJAXStorage ();

function saveInfoAboutPlayer() {
  console.log('saveInfoAboutPlayer');

  var objWinner={
    'stringTime':winner.stringTime,
    'inNumberTime': winner.inNumberTime
  }
   recordsStorage.addValue(winner.name, objWinner);
}



function deleteCoctail (nameCoctail){
  var result = recordsStorage.deleteValue(nameCoctail);
// result?console.log('Данный напиток успешно удален'):console.log('Данный напиток отсутствует');

}

function allCoctail (){
  console.log('Имеются следующие напитки');
  var result = recordsStorage.getKeys();
  console.log( result.join(', ') );

}
// recordsStorage.objInfo - здесь все данные


function toWriteRecord(){
  console.log(recordsStorage.objInfo)
  // нужно отсортировать. первые три/пять
  // входит ли туда текущая игра
 var playerWithRecord=Object.keys(recordsStorage.objInfo)||null;
 
  // отсортировать
  playerWithRecord.sort(sortRecordsPlayer)
  console.log(playerWithRecord);

  if(playerWithRecord!=null ){
    for(var i=0; i<=2; i++){
   var deltaPlayer=recordsStorage.objInfo[playerWithRecord[i]]
   var deltarecordsPlayerElem=document.getElementById('recordsPlayer'+(i+1)+'');
   deltarecordsPlayerElem.innerText= playerWithRecord[i]+'  ' +'  Время   ' +deltaPlayer.stringTime;
   }
  }

 // удалить все  записанные рекорды
 // deleteAll ();
var deleteOldGame=document.getElementById('game_field');
deleteOldGame.innerHTML=' ';
startBaby();
// спрятать
gameDiv.style.zIndex='-1';
console.log('here')
// делаю ловушку для кликов по svg
//elemForInserch.addEventListener('click',catchBadClick, false )
// все обнулить, информацию
countElemPlayer1.innerHTML='<br>';
countElemPlayer2.innerHTML='<br>';
colorPlyer1.innerHTML='<br>';
colorPlyer2.innerHTML='<br>';
firstElem.innerHTML='<br>';
secondElem.innerHTML='<br>';
timeElem.innerHTML='';
}



 function deleteAll(){
  recordsStorage={};
  saveAJAXStorage(recordsStorage)
  console.log('почистить хранилище')
 }

 // сравнить, сортировка

 function sortRecordsPlayer(a,b){
 return recordsStorage.objInfo[a].inNumberTime-recordsStorage.objInfo[b].inNumberTime;

 }

function catchBadClick(){
   
console.log('ловушка')
   
}