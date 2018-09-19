// найти containerModalWindow
var containerForStartModal= document.getElementById('containerModalWindow');

// создавать и вставлять во внутрь нужные элементы
// затем анимировать. красиво выезжать

var buttonModal=document.getElementById('modal_button');
var modal=document.getElementById('modal-container');
var closeModal=document.getElementById('closeModal');
// поля ввода имен

var fistPlayerElem=document.getElementById('fistPlayer');
var secondPlayerElem=document.getElementById('secondPlayer');

// поле для ошибки
var alarmElem=document.getElementById('alarm');


//правильно ли форма заполнена. контроль
var condition=false;

// имена игроков для дальнейшей игры
var firstNamePlayer, secondNamePlayer;

window.onload=function(){
  document.body.className='modal-active';
  modal.className='one'
  }

  
closeModal.onclick=function(){
  // окно закроется, когда поля заполнены
  if(condition==true){
  modal.className='one out'
  // записать нужные данные,имена
  firstNamePlayer=fistPlayerElem.value;
  secondNamePlayer=secondPlayerElem.value;
  console.log(firstNamePlayer, secondNamePlayer )}
  else{
    alarmElem.innerText='введите имя';
    alarmElem.className='show_alarm';
   // alert('введите имя')
  }
}

fistPlayerElem.onblur=checkFom;
secondPlayerElem.onblur=checkFom;

//убрать ошибку,когда начинаешь вводить имя
fistPlayerElem.onclick=function(){
  alarmElem.className='hide_alarm'

};
secondPlayerElem.onclick=function(){
  alarmElem.className='hide_alarm'

};


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