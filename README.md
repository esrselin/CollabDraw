# CollabDraw — Real-Time Collaborative Drawing App (SignalR)

CollabDraw is a real-time collaborative drawing application built with ASP.NET Core and SignalR.
Multiple users can connect to the same shared canvas and draw together instantly. The project allows real-time stroke broadcasting, live online-user tracking, and seamless multi-client drawing synchronization.
Using ngrok, the local server can be exposed publicly so anyone with the link can join and collaborate.

---

## 🚀 Features

* Real-time collaborative drawing on a shared canvas
* Broadcast of drawing points and strokes using SignalR
* Online users display powered by a dedicated SignalR hub
* Clean separation between drawing logic, UI, and server-side hubs
* Minimalistic UI with HTML Canvas and pure JavaScript
* Can be shared publicly using ngrok

---

## 📂 Project Structure

```
CollabDraw/
│
├── Hubs/
│   ├── DrawHub.cs
│   ├── Point.cs
│   ├── Stroke.cs
│   └── UsersOnlineHub.cs
│
├── Pages/
│   ├── Shared/
│   ├── Error.cshtml
│   ├── Error.cshtml.cs
│   ├── Index.cshtml
│   ├── Index.cshtml.cs
│   ├── Privacy.cshtml
│   ├── Privacy.cshtml.cs
│   ├── _ViewImports.cshtml
│   └── _ViewStart.cshtml
│
├── Properties/
│   └── launchSettings.json
│
├── wwwroot/
│   ├── css/
│   │   └── site.css
│   ├── js/
│   │   ├── UsersOnline.js
│   │   ├── draw.js
│   │   └── site.js
│   ├── lib/
│   └── favicon.ico
│
├── .gitattributes
├── CollabDraw.csproj
├── CollabDraw.csproj.user
├── CollabDraw.sln
├── Program.cs
├── appsettings.Development.json
└── appsettings.json
```

---

## 🧩 How It Works

### SignalR Hubs

The app uses two hubs:

* **DrawHub** — receives strokes/points and broadcasts them to all clients
* **UsersOnlineHub** — tracks online users and updates the client list in real-time

Clients send drawing events (coordinates, stroke info) to the hub with JavaScript; SignalR distributes them to all other connected users. Every paint operation is rendered immediately on each user’s HTML5 canvas.

### Client-Side

JavaScript (`draw.js`) handles:

* Canvas rendering
* Mouse movement tracking
* Emitting draw events
* Rendering remote strokes received from DrawHub

`UsersOnline.js` connects to the user hub to show who is connected.

---

## ▶️ Running the Project

### 1. Restore & Run

```bash
dotnet build
dotnet run
```

Default address (example):

```
http://localhost:5000
```

Open in multiple browser tabs or devices to test real-time collaboration.

### 2. Optional: Use ngrok for Public Access

```bash
ngrok http 5000
```

Share the generated public URL so others can draw with you in real time.

---

## 📜 Technologies Used

* ASP.NET Core
* SignalR
* HTML5 Canvas
* JavaScript (vanilla)
* Ngrok (optional for remote collaboration)

---

## 📌 Possible Future Enhancements

* Color picker, eraser, brush sizes
* Undo/redo
* Multiple rooms / private sessions
* Persistent canvas save/load
* Authentication system

---

##  Author

Project by **esrselin**
