const WebSocket = require("ws");

let rgb = {
    r: 0,
    g: 0,
    b: 0
};

const PORT = process.env.PORT || 8080;

const server = new WebSocket.Server({
    port: PORT
});

server.on("listening", () => {
    console.log("WEBSOCKET SERVER LISTENING ON PORT", PORT);
});

server.on("connection", (socket) => {
    console.log("================================");
    console.log("CLIENT CONNECTED!");
    console.log("================================");

    socket.send(JSON.stringify(rgb));

    socket.on("message", (message) => {
        console.log("RECEIVED:", message.toString());

        if (message.toString() === "changecolor") {
            rgb.r = Math.random();
            rgb.g = Math.random();
            rgb.b = Math.random();

            broadcast(rgb);

            console.log("REPLIED TO CLIENT");
        }
    });

    socket.on("close", () => {
        console.log("CLIENT DISCONNECTED");
    });

    socket.on("error", (error) => {
        console.log("SOCKET ERROR:", error);
    });
});

function broadcast(data) {
    const message = JSON.stringify(data);

    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

console.log("STARTING WEBSOCKET SERVER");
