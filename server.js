const WebSocket = require("ws");

let rgb = {
    r : 0,
    g : 0,
    b : 0
}

const PORT = process.env.PORT || 8080;

const server = new WebSocket.Server({
    port: PORT
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

            broadcast(rgb);

            console.log("replied to client");
        }
    });
});

console.log("STARTING WEBSOCKET SERVER");
