const canvas=document.getElementById("jsCanvas");
const ctx=canvas.getContext('2d');
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const deleteAll=document.getElementById("jsErase");
const save=document.getElementById("jsSave");
const eraser=document.getElementsByClassName("EraserBtn");
const setEraser=document.getElementById("sizeWhat");

canvas.width=500;
canvas.height=500;
ctx.strokeStyle="black";
ctx.lineWidth=2.5;
ctx.fillStyle="white";
ctx.fillRect(0,0,700,700);

let painting=false;
let filling=false;
let earse=false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function changeColor(event){
    
    
    const color=event.target.style.backgroundColor;
    if(color==="white" || color==="" ){
        
        ctx.strokeStyle="white";
        setEraser.textContent="Erase Size";
    
    }else{
        
        ctx.strokeStyle=color;
        ctx.fillStyle=color;
        setEraser.textContent="Pen Size";
    
    }
}
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting=true;
}

function handleRangeChange(event){
    
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="PAINT";
    }
}

function handCanvasClick(){
    if (filling) {
        ctx.fillRect(0, 0, 700, 700);
    }
}
function handleSaveBtn(){
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    var input=prompt("Type name","Your Paint");

    link.download=`${input}`;
    link.click();
}

function handleDeleteAll(){
    var result=confirm("Do you want to delete this Picture?  You can't Never restore this");
    if(result){
        if(filling){
            beforeColor=ctx.fillStyle;
            ctx.fillStyle="white";

            ctx.fillRect(0,0,700,700);
            ctx.fillStyle=beforeColor;
            console.log(ctx.filStyle);
            console.log("hi");
        }
        else{
            ctx.fillStyle="white";

            ctx.fillRect(0,0,700,700);
        }
    }
    else{
       
    }
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handCanvasClick);

}

Array.from(colors).forEach(color=>color.addEventListener("click",changeColor));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(save){
    save.addEventListener("click",handleSaveBtn)
}

if(deleteAll){
    deleteAll.addEventListener("click",handleDeleteAll)
}