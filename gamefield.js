   //основные размеры
   // в идеале в них записывать реальные  размеры GameDiv
   var mainSizeWidth=100;
   var mainSizeHeight=100;
   // у меня поле для работы  100*100
   var sizeSmallSquareCornerWidth=mainSizeWidth/9;  // размер для уголка игрового поля по  ширине
   var sizeForGameSquare= (mainSizeWidth-sizeSmallSquareCornerWidth)/8; // ( 100-120)/8=11
   //радиус круга для шашки
   var figureRadius=sizeForGameSquare*0.3

  // получить див, куда вставлять svg-игровое поле
  var gameDiv=document.getElementById('gameDiv');
    // создать svg поле. резиновые размеры
   start= document.createElementNS('http://www.w3.org/2000/svg', 'svg'); 
    start.setAttribute('viewBox','0 0'+' '+mainSizeWidth+' '+mainSizeHeight)
   start.style.width='100%';
   start.style.height='100%';

  start.style.maxHeight='60vw';
  start.style.maxWidth='60vw';
  start.style.minHeight='20vh';
  start.style.minWidth='20vh';

   start.style.display='block';


 // создать большой фоновый квадрат
   
 var bigRect= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
 bigRect.setAttribute("x", 0);
 bigRect.setAttribute("y", 0);
 bigRect.setAttribute("width",mainSizeWidth);
 bigRect.setAttribute("height",mainSizeHeight );

 bigRect.setAttribute("fill", "aqua");
 start.appendChild(bigRect);
 gameDiv.appendChild(start);

   // массив для клеток
   function getNumberArr(){
    var numberArr=[],pos;  
    for (var j=1; j<=8; j++){
      for(var i=1; i<=8; i++) {
       pos=i+''+j+'';
      numberArr.push(pos) }
    }
    return numberArr; }
    
 var numberArr=getNumberArr(); // для  перебора. чтобы искать  ["11", "21", "31...
  //console.log(numberArr)
 
 
      // для отрисовки квадратов. базовая точка
   function createGameBigSquare(){
    var letterArr=[]
     var white=[];
     var black=[];
    var countForArr=0;
    var objPos={}
     var x=sizeSmallSquareCornerWidth/2;
     var y=sizeSmallSquareCornerWidth/2;
     var chec=1; // начинаем с черного цвета, если 0
                  // с белого, если 1
                    // сверху вниз все начинаетс  "A8", "B8", "C8"...
    var groupCircle= document.createElementNS('http://www.w3.org/2000/svg','g');
    groupCircle.setAttribute("id", 'squareElem');

      for(var j=8; j>=1; j--) {
        for(var i=1; i<=8; i++){ //для столбца
          var gameRect= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          
          gameRect.setAttribute("x", x);
          gameRect.setAttribute("y", y);
          gameRect.setAttribute("width",sizeForGameSquare);
          gameRect.setAttribute("height",sizeForGameSquare );
            // вписать id каждой клетке
            pos= i+''+j+'';
          gameRect.setAttribute("id", pos);
          //добавляем в массив
          letterArr.push(pos)
          // координаты каждой клетки
          objPos[letterArr[countForArr]]={posX: x,
                                            posY:y};
          if(chec==0){  // субпиксильноепозиционирование . видны зазоры
            gameRect.setAttribute("fill", "black");
            black.push( letterArr[countForArr])
            chec=1;
          }
          else {
            gameRect.setAttribute("fill", "white");
            chec=0;
            white.push( letterArr[countForArr])
          }
          countForArr++;
          groupCircle.appendChild(gameRect);
          x+=sizeForGameSquare;
        
        }
        // для строчного  отображения
        // чтоб правильно чередовались цвета
        if(chec==0){
          chec=1;
        }
        else chec=0;

        x=sizeSmallSquareCornerWidth/2; // обнулить, вернуть коорд по Х
       y+=sizeForGameSquare;  // нарастание по оси У
      }
      start.appendChild(groupCircle);
      
    //  console.log(objPos )
    // console.log('black '+blackCell )
    // console.log('white '+whiteCell )
      return {
        blackCell: black,
        whiteCell: white,
        posForSquare :objPos
      }
   }

   // разбивка клеток по цветам
   // глобалный объект с важной информацией
  var about= createGameBigSquare();
      console.log(about )

   //вставить прямоугольники с подписями

   function createReactWithText(){
     //начальное положение
     // для вертикального текста
     var groupCircle= document.createElementNS('http://www.w3.org/2000/svg','g')
     groupCircle.setAttribute("id", 'textInfo');

    var y=sizeSmallSquareCornerWidth+sizeForGameSquare/8; // 8- количество  больших квадратов
    var x=sizeSmallSquareCornerWidth/4; // /2 их 2 штуки и еще/2 чтобысередина была
    for(var i=8; i>=1; i--){
    var txt=document.createElementNS("http://www.w3.org/2000/svg",'text');

    txt.setAttribute("x",x);
    txt.setAttribute("y",y);
    txt.style.fill="black";
    txt.style.fontSize=sizeForGameSquare*0.6;
    txt.style.textAnchor="middle";
    txt.textContent=i;
    y+=sizeForGameSquare;

    groupCircle.appendChild(txt);

   }
   //для нижнего горизонтального текста
    y=mainSizeWidth-sizeSmallSquareCornerWidth/8; //  8-подбор оптимальный
    x=sizeSmallSquareCornerWidth;
// получить символы из таблицы юникод. сразу вызвать функцию
    var letterArrForText=(function (){
      var deltaArr=[];
      for(var i=65; i<=72; i++) {
       var s=String.fromCharCode(i);
    deltaArr.push(s);
    }
    return deltaArr;
  })();
 

  //
    for(var j=0; j<=7;j++){
      var txt=document.createElementNS("http://www.w3.org/2000/svg",'text');
  
      txt.setAttribute("x",x);
      txt.setAttribute("y",y);
      txt.style.fill="black";
      txt.style.fontSize=sizeForGameSquare/2;
      txt.style.textAnchor="middle";
      txt.textContent=letterArrForText[j];
      x+=sizeForGameSquare;
      groupCircle.appendChild(txt);
   start.appendChild(groupCircle);
  }
}
  createReactWithText();


  function setFigure(){
  //  получить только черные позиции

  var blackCellGame=about.blackCell;
  var arrFigure={};
 // console.log(blackCellGame )
// расставить первому игроку  сверху
// первые 12 штук
var groupCircle= document.createElementNS('http://www.w3.org/2000/svg','g');
groupCircle.setAttribute('id','figure')
// как обратиться к  нужной позициии
// узнать координаты
    for(var i=0; i<=11; i++){
    //  console.log(blackCellGame[i])
     var cx=about.posForSquare[blackCellGame[i]].posX+sizeForGameSquare/2; // координаты по квадрату. верхний левый угол
    // console.log(forPosSvg )
     // от верхей левой точки отнимаем половину ширины клетки квадрата. чтоб знать центр по Х и У
     var cy=about.posForSquare[blackCellGame[i]].posY+sizeForGameSquare/2;
     arrFigure[blackCellGame[i]]={color:'aqua'}
     bigCircle= document.createElementNS('http://www.w3.org/2000/svg', 'circle');
     
      bigCircle.setAttribute("cx", cx);
      bigCircle.setAttribute("cy",cy);
      bigCircle.setAttribute("r", figureRadius);
      bigCircle.setAttribute("fill", "aqua");
      groupCircle.appendChild(bigCircle);
    }

    //расставить снизу. второму игроку.

    for (var j=blackCellGame.length-1; j>=blackCellGame.length-12;j-- ){

   var  cx=about.posForSquare[blackCellGame[j]].posX+sizeForGameSquare/2; // координаты по квадрату. верхний левый угол
    //console.log(cx )
      // от верхей левой точки отнимаем половину ширины клетки квадрата. чтоб знать центр по Х и У
      var cy=about.posForSquare[blackCellGame[j]].posY+sizeForGameSquare/2;
      arrFigure[blackCellGame[j]]={color:'magenta'}

      bigCircle= document.createElementNS('http://www.w3.org/2000/svg', 'circle');
       bigCircle.setAttribute("cx", cx);
       bigCircle.setAttribute("cy",cy);
       bigCircle.setAttribute("r", figureRadius);
       bigCircle.setAttribute("fill", "magenta");
       groupCircle.appendChild(bigCircle);
       
    }
    start.appendChild(groupCircle);
  //console.log(arrFigure)
  return arrFigure; // объект где все позиции  шашек -> 11:{color: "magenta"}
}
  // добавить в общий объект. потом распределить по игрокам
    about.arrFigure= setFigure();
  //  console.log(about)

//  перетаскивать по  экрану шашки
// элемент g куда поместила все шашки
var conteinerFigure= document.getElementById('figure');
conteinerFigure.addEventListener('mousedown',beginerMove, false )



function beginerMove(EO){
  EO=EO|| window.event;
  // хранить информацию про старый ход, текущий
  var lastStepObj={};
  // хранить про следующую позицию
 var aboutStepObj={};

  // узнать координаты клика. не скорректирванные
  var clickPageX=EO.pageX;
  var clickPageY=EO.pageY;

  // узнать координаты клика с учетом утступов, скорректиров
    var clickCoordObj= translateCoord(clickPageX,clickPageY);
    clickPageX=clickCoordObj.pageX;
    clickPageY=clickCoordObj.pageY;

       // узнать какой квадрат
  var currentIDSquare= getIDSquare(clickPageX,clickPageY );

  // сохранить первонаальную позицию
   var oldPosition={
    clickPageX: about.posForSquare[currentIDSquare].posX,
    clickPageY: about.posForSquare[currentIDSquare].posY
  }

  // координаы клика мыши
  var currentGigure=EO.target;
  // добавить ее в конец в DOM. проблема с Z-index решена так
  conteinerFigure.appendChild(currentGigure);

 // узнать цвет шашки
 var colorFigure= currentGigure.getAttribute('fill');
 // console.log( colorFigure )

  // записать информацию простарый ход
  lastStepObj.oldPosition=oldPosition;
  lastStepObj.currentIDSquare=currentIDSquare;
  lastStepObj.colorFigure=colorFigure;
  console.log(lastStepObj )

  // подсветить, куда можно ходить
  // заполняю информацией про варианты следующего хлда
 // вернули позиции.  куда можно - true, коорднаты этих элементов
 aboutStepObj.colorFigure=colorFigure;
   aboutStepObj=legalyPos(lastStepObj,aboutStepObj);

// 

  document.onmousemove = function(EO) {
    moveAt(EO);
  };

  function moveAt(EO){
    EO=EO|| window.event;
    var pageX=EO.pageX;
    var pageY=EO.pageY;
    var clickCoordObj= translateCoord(pageX,pageY);
   var clickPageX=clickCoordObj.pageX;
   var  clickPageY=clickCoordObj.pageY;


    currentGigure.setAttribute("cx", clickPageX);
    currentGigure.setAttribute("cy", clickPageY);
    // нужна ли  эта обводка???
    currentGigure.setAttribute("stroke", "red");
  
  }
  currentGigure.onmouseup = function(EO) { //когда закончилось перетаскивание
    // неудачно передавался в параметры  aboutStepObj вместе с ЕО
    EO=EO|| window.event;
    var pageX=EO.pageX;
    var pageY=EO.pageY;
    console.log(aboutStepObj)

    // проверить, отпущен ли клик в нужных координатах
    aboutStepObj.result= whereMouseUp(pageX,pageY,aboutStepObj )

  if(aboutStepObj.result.condition) {
      // обрать обводку клетки и обновить массив. скорректиров глоб объекты
    changeGameObjPosFigure(aboutStepObj,lastStepObj);
  // нарисовать красиво,  по центру эту фигуру
  paintNiceFirure(currentGigure, aboutStepObj,oldPosition);
    
  }
  // если неверное перемещение - вернуть на первоначальную позицию
  if(!aboutStepObj.result.condition){
    paintNiceFirure(currentGigure,aboutStepObj,oldPosition);

  }
   // console.log(result)
    document.onmousemove = null;
    currentGigure.onmouseup = null;
  };
  
document.ondragstart = function() {
  return false;
};

  
}
//------------------------------------ конец beginerMove

  function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
  }

      // узнать какой квадрат
 function getIDSquare(clickPageX,clickPageY ){
  var numberArr=getNumberArr(); // для  перебора. чтобы искать  ["11", "21", "31...
 // console.log(numberArr)
  //var sizeForGameSquare=sizeForGameSquare;
 // console.log(sizeForGameSquare)
  // координата высчитывается так- знаю коорд верхнего левого угла
  // прибавляю размеры квадрата игрового. если клик в этом диапазоне- гуд
      for(var i=0; i<=numberArr.length-1; i++){
    var posXForSearch=about.posForSquare[numberArr[i]].posX;
      if(posXForSearch<=clickPageX && clickPageX<=posXForSearch+sizeForGameSquare){
        var posYForSearch=about.posForSquare[numberArr[i]].posY;
          if(posYForSearch<=clickPageY && clickPageY<=posYForSearch+sizeForGameSquare )
        return numberArr[i];

      }

  }
 }
    // проверка хоа. есть ли на этих клетках другие шашки. еще на двойной ход сделать
    // ее дописать
  function checFigure(aboutStepObj){
        //какие позиции предлагает
    var posForSquareArr=Object.keys(aboutStepObj.posFigure);
    // если  дошла шашка до края и следующей клетки нет , вперед нет
    if( posForSquareArr.length==0){
      return false;
    }
   // console.log(posForSquareArr);
    // есть ли на этих позициях шашки
    for( var i=0; i<=posForSquareArr.length-1; i++){
      if (posForSquareArr[i] in about.arrFigure  ){
        if(about.arrFigure[posForSquareArr[i]].color==aboutStepObj.colorFigure){
          aboutStepObj.posFigure[posForSquareArr[i]].condition=false;
        }
      }
    }
    return aboutStepObj;


  }


 //  подсветить квадраты допустимого хода
   function legalyPos(lastStepObj, aboutStepObj){
     var forNextStep=[];
    // var aboutStepObj={}
     var posFigure={};
     var elem;
    // узнать клетки, куда могу ходить
    if(aboutStepObj.colorFigure=='magenta'){
      forNextStep.push(+lastStepObj.currentIDSquare-10+1, +lastStepObj.currentIDSquare+10+1);
    }

    if(aboutStepObj.colorFigure=='aqua'){
      forNextStep.push(+lastStepObj.currentIDSquare-10-1, +lastStepObj.currentIDSquare+10-1);
    }
    //вернуть адекватные значения
    // если выходит за рамки, вписать текущее
    // можно ли  эту записьсделать красивее?
     forNextStep.filter((v)=>{if(10<v && v<89 && v!=20 && v!=30 &&
    v!=40 && v!=50 && v!=60 && v!=70 && v!=80 && v!=19 && v!=29 &&
    v!=39 && v!=49 && v!=59 && v!=69 && v!=79 ){posFigure[v]={condition:true} } });
     aboutStepObj.posFigure=posFigure;
    console.log(posFigure)
   
    
    // проверка. есть ли на этих клетках другие шашки
    var answerFromCheckFigure=checFigure(aboutStepObj);
    if(answerFromCheckFigure==false){
      // если дохожу до края, вписать исходную клетку для следующего хода. даже безвписывания координат той клетки
      posFigure[lastStepObj.currentIDSquare]={condition:true};
      aboutStepObj.posFigure=posFigure;
    }
    else{
      aboutStepObj=answerFromCheckFigure;

    }
   // console.log(aboutStepObj);
    
    // подсветить клетки, у которых true
    var squareIDForAttention=Object.keys(aboutStepObj.posFigure);
   // console.log(squareIDForAttention)

    for(var i=0; i<=squareIDForAttention.length-1; i++){
      if(aboutStepObj.posFigure[squareIDForAttention[i]].condition==true ){
      elem=document.getElementById(squareIDForAttention[i]);
      if(elem==null){
      return }

      elem.setAttribute('stroke','red');}
    }
    
  // дописать координаты этих клеток
    for( var j=0; j<=squareIDForAttention.length-1; j++){
      aboutStepObj.posFigure[squareIDForAttention[j]].posX=
      about.posForSquare[squareIDForAttention[j]].posX;
      aboutStepObj.posFigure[squareIDForAttention[j]].posY=
      about.posForSquare[squareIDForAttention[j]].posY;
    }
    return aboutStepObj;

   }


   function translateCoord(pageX,pageY){
      // получить размеры дива для svg элемента
  var widthConteinerDiv=gameDiv.offsetWidth;
  var offsetLeftGameDiv=gameDiv.offsetLeft;
  var offsetTopGameDiv=gameDiv.offsetTop;
  // пересчет масштаба с учетом поправки/корректировки
var delta=widthConteinerDiv/mainSizeWidth;
  // узнать координаты клика с учетом утступов
 var   clickPageX=(pageX-offsetLeftGameDiv)/delta;
  var  clickPageY=(pageY-offsetTopGameDiv)/delta;
  return {
    pageX: clickPageX,
    pageY: clickPageY
  }
   }

   // проверить, отпущен ли клик в нужных координатах
   function whereMouseUp(pageX,pageY,aboutStepObj ){
     // получить скорректиров координ
    var clickCoordObj= translateCoord(pageX,pageY);
    var clickPageX=clickCoordObj.pageX;
    var  clickPageY=clickCoordObj.pageY;
    // проверка где отпущен  клик
    var squareIDForAttention=Object.keys(aboutStepObj.posFigure);
    console.log(squareIDForAttention )
    for(var i=0; i<=squareIDForAttention.length-1; i++){

    if(aboutStepObj.posFigure[squareIDForAttention[i]].condition==true ){
      if(clickPageX>= aboutStepObj.posFigure[squareIDForAttention[i]].posX &&
         clickPageX<=aboutStepObj.posFigure[squareIDForAttention[i]].posX+sizeForGameSquare &&
         clickPageY>= aboutStepObj.posFigure[squareIDForAttention[i]].posY &&
         clickPageY<=aboutStepObj.posFigure[squareIDForAttention[i]].posY+sizeForGameSquare
        ){

          return {condition:true,
                  newPositionID:squareIDForAttention[i]   } 
     // else return false;
    }
   else continue;
  }
   }
   // эту ошибку обработать.более точно
   console.log('alarm');
   deleteStrokeOnFigure(aboutStepObj)
  return {condition:false,
          newPositionID:false} }


  //красиво нарисовать в центре
   function   paintNiceFirure(figureDOM, aboutStepObj,oldPosition){
    // для более удобного  доступа
    var newPositionID =aboutStepObj.result.newPositionID

     //если хреново передвинули. оставили не там
     if(aboutStepObj.result.newPositionID==false ){
      var PageX=oldPosition.clickPageX+sizeForGameSquare/2;
      var PageY=oldPosition.clickPageY+sizeForGameSquare/2;
   
      figureDOM.setAttribute("cx", PageX);
      figureDOM.setAttribute("cy", PageY);
      return;

     }
   // координ верхнего левого угла клетки игровой
   var posX=aboutStepObj.posFigure[newPositionID].posX;
   var posY=aboutStepObj.posFigure[newPositionID].posY;
   // в середине будет с учетомполовины клетки
    PageX=posX+sizeForGameSquare/2;
    PageY=posY+sizeForGameSquare/2;

   figureDOM.setAttribute("cx", PageX);
   figureDOM.setAttribute("cy", PageY);

   }


     // убрать обводку клетки и обновить массив. скорректиров глоб объекты
     

    function changeGameObjPosFigure(aboutStepObj,lastStepObj){
          // подсветить клетки, у которых true
    var squareIDForAttention=Object.keys(aboutStepObj.posFigure);
    // console.log(squareIDForAttention)
 var newPositionID =aboutStepObj.result.newPositionID
     for(var i=0; i<=squareIDForAttention.length-1; i++){
       if(aboutStepObj.posFigure[squareIDForAttention[i]].condition==true ){
       elem=document.getElementById(squareIDForAttention[i]);
       elem.setAttribute('stroke','black');}
     }
 // перезаписать положение с учетом перемещения клетки
 // какой цвет был
    var whichColorWas= about.arrFigure[lastStepObj.currentIDSquare];
     console.log(newPositionID);
     delete about.arrFigure[lastStepObj.currentIDSquare];
     // записать новый
     about.arrFigure[newPositionID]=whichColorWas;
    }
 
// убрать обводку
 function deleteStrokeOnFigure(aboutStepObj){
        var squareIDForAttention=Object.keys(aboutStepObj.posFigure);
      // console.log(squareIDForAttention)
         
      for(var i=0; i<=squareIDForAttention.length-1; i++){
      if(aboutStepObj.posFigure[squareIDForAttention[i]].condition==true ){
    elem=document.getElementById(squareIDForAttention[i]);
    if(elem==null){
    return false;}
     elem.setAttribute('stroke','black');}
             }
        

 }
