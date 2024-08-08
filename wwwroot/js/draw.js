const canvas = document.getElementById('draw-canvas'); // HTML'de id'si "draw-canvas" olan canvas elementini al
const ctx = canvas.getContext('2d'); // Canvas için 2D bağlamı al
ctx.lineWidth = 4;

const colorButton = document.getElementById('color');
const clearButton = document.getElementById('clear');

let isDrawing = false; // Çizim modunu belirlemek için
let lastX = 0; 
let lastY = 0; 

const connection = new signalR.HubConnectionBuilder() 
    .withUrl("/draw") 
    .configureLogging(signalR.LogLevel.Information) 
    .build(); 

connection.on("ReceiveStrokes", strokes => { // "ReceiveStrokes" olayını dinle
    strokes.forEach(stroke => drawStroke(stroke.start, stroke.end, stroke.color)); 
});

connection.on("ClearCanvas", clearCanvas);

async function start() { 
    try {
        await connection.start(); 
        console.log("SignalR Connected."); 
    } catch (err) { 
        console.log(err); 
        setTimeout(start, 5000); // 5 saniye sonra tekrar deneme yap
    }
}

start().then(() => console.log('connected!')).catch(err => console.log(err)); 

canvas.addEventListener('mousedown', handleMouseDown); 
canvas.addEventListener('mousemove', handleMouseMove); 
canvas.addEventListener('mouseup', handleMouseUp); 

clearButton.addEventListener('click', handleClearButtonClick); 

function handleMouseDown(event) { 
    isDrawing = true; // Çizim modunu etkinleştir
    [lastX, lastY] = [event.offsetX, event.offsetY];
}

function handleMouseMove(event) {
    if (!isDrawing) return; // Eğer çizim modu kapalıysa işlemi sonlandır
    const [x, y] = [event.offsetX, event.offsetY]; 
    const start = { x: lastX, y: lastY }; 
    const end = { x, y }; 
    const color = colorButton.value; 
    drawStroke(start, end, color); 
    lastX = x; 
    lastY = y; 

    // Çizim yapıldığında diğer istemcilere gönder
    connection.send("NewStrokes", [{ start, end, color }]);
}

function handleMouseUp() { // Fare bırakma olayı için işlev tanımla
    isDrawing = false; // Çizim modunu kapat
}

function handleClearButtonClick() { 
    if (confirm("Tuvalleri temizlemek istediğinize emin misiniz?")) { 
        clearCanvas(); 
        connection.send("ClearCanvas"); 
    }
}

function drawStroke(start, end, color) { 
    ctx.strokeStyle = color;
    ctx.beginPath(); 
    ctx.moveTo(start.x, start.y); 
    ctx.lineTo(end.x, end.y); 
    ctx.stroke(); 
}

function clearCanvas() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}
