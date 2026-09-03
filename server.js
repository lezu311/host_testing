const WebSocket = require("ws");

let rgb = {
    r : 0,
    g : 0,
    b : 0
}

const server = new WebSocket.Server({
    host: "0.0.0.0",
    port: 8080
});

function broadcast(data) {
    const message = JSON.stringify(data)

    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message)
        }
    })
}

server.on("connection", (socket) => {
    console.log("someone connected!");

    socket.send(JSON.stringify(rgb));

    socket.on("message", (message) => {
        if (message.toString() === "changecolor") {
            rgb.r = Math.random();
            rgb.g = Math.random();
            rgb.b = Math.random();

            broadcast(rgb)
        }
    });
});
