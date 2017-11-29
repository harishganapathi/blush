    var canvas = document.getElementById("drawArea");
    var context = canvas.getContext("2d");  
    var nowx = 0 ,nowy= 0,thenx = 0 ,theny= 0;
    var flag = false;
    var color = "black";
    var line = document.getElementById('line')
    var rectangle = document.getElementById('rectangle')
    var circle = document.getElementById('circle')
    var linewidth = document.getElementById('linewidth')
    var clear = document.getElementById('clear')
    var tool , undoBreakpoint ,displayData ;
    var rect = canvas.getBoundingClientRect();
    var color = document.getElementById('colorPicker').value;
    var undoArray = [];
    var download = document.getElementById('download');
//event listeners     
colorPicker.onclick = function(){
    color = colorPicker.value
}
colorPicker.onchange = function () {
    color = colorPicker.value
}
circleTool.onclick = function(){
    tool = "circle"
}
rectangleTool.onclick = function(){
    tool = "rectangle"
}
pencilTool.onclick = function(){
    tool = "pencil"
}
lineTool.onclick=function(){
    tool = "line"
}
clear.onclick = function(){
    context.clearRect(0,0,1400,600)
}
undo.onclick = function(){
    if (undoArray.length>0){
        displayData = undoArray.pop();
        context.putImageData(displayData,0,0) }
    else{
        alert('No actions to Undo')
    }}
download.onclick = function (link) {
    downloadCanvas(this);
}
//Event triggered functions 
canvas.onmouseup = function (e) {
    flag = false;
    thenx = e.clientX - rect.left;
    theny = e.clientY - rect.top;
    if (tool == "rectangle") {
        undoBreakpoint = context.getImageData(0, 0, 1400, 600)
        undoArray.push(undoBreakpoint);        
        drawRect(nowx,nowy,thenx,theny);
    }
    else if (tool == 'circle'){
        undoBreakpoint = context.getImageData(0, 0, 1400, 600)
        undoArray.push(undoBreakpoint);
        drawCircle(nowx,nowy,thenx,theny);
    }
    else if (tool == 'line'){
        undoBreakpoint = context.getImageData(0, 0, 1400, 600)
        undoArray.push(undoBreakpoint);
        drawLine(nowx,nowy,thenx,theny);
    }  
}
canvas.onmousedown = function(e){
    flag = true;
    nowx = e.clientX - rect.left;
    nowy = e.clientY - rect.top;
}

canvas.onmousemove = function(e){
    if (flag == true && tool == "pencil"){
    thenx = e.clientX - rect.left;
    theny = e.clientY -rect.top;
    undoBreakpoint = context.getImageData(0, 0, 1400, 600)
    undoArray.push(undoBreakpoint);
    draw(nowx,nowy,thenx,theny)
    nowx=thenx;
    nowy=theny;
}

}

//Pencil function
function draw(x1,y1,x2,y2){
    context.strokeStyle = color;
    context.lineWidth = linewidth.value;
    context.beginPath();
    context.lineJoin = "round";
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}
//rectangle function
function drawRect(x1,y1,x2,y2){
    context.strokeStyle = colorPicker.value;
    context.lineWidth = linewidth.value;
    context.fillStyle = fillPicker.value;
    context.beginPath();
    context.rect(nowx,nowy,thenx-nowx,theny-nowy);
    context.stroke();
    context.fill();
    context.closePath();
}
//circle functions 
function drawCircle(x1,y1,x2,y2){
    context.strokeStyle = colorPicker.value;
    context.lineWidth = linewidth.value;
    context.fillStyle = fillPicker.value;
    context.beginPath();
    context.arc(x1, y1,x2-x1, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();
}
//line drawing functions
function drawLine(x1,y1,x2,y2){
    context.strokeStyle = colorPicker.value;
    context.lineWidth = linewidth.value;
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}
//save image from canvas 
function downloadCanvas(link){
        link.href = canvas.toDataURL();
        link.download = 'sample.png';
}
//on browser load, default actions
window.onload = function(){
colorPicker.value = "#000000"
fillPicker.value = "#FFFFFF"
linewidth.value = "1"
}

