if (!window.connection) { 
    const connection = new signalR.HubConnectionBuilder() 
        .withUrl("/users") 
        .configureLogging(signalR.LogLevel.Information) 
        .build(); 

    async function start() { 
        try {
            await connection.start(); 
            console.log("SignalR Connected."); 
        } catch (err) { 
            console.log(err); 
            setTimeout(start, 5000); 
        }
    }

    connection.on("ReceiveStrokes", strokes => { // "ReceiveStrokes" event listener 
        strokes.forEach(stroke => drawStroke(stroke.start, stroke.end, stroke.color)); // Gelen strokeları çizmek için drawStroke fonksiyonu çağrılıyor
    });

    connection.on("ClearCanvas", clearCanvas); 

    connection.on("GetUsersCounter", function (usersCounter) { // "GetUsersCounter" event listener
        document.getElementById("usersOnline").innerHTML = usersCounter; // usersCounter değeri ile "usersOnline" elementinin içeriği güncelleniyor
    });

    start().then(() => console.log('connected!')).catch(err => console.log(err));

    window.connection = connection; 
}
