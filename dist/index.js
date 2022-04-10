"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
require("dotenv/config");
const sockets_1 = require("./sockets");
const PORT_NUMBER = parseInt((process.env.PORT_NUMBER || "3000"));
const options = {
    cors: {
        origin: "*",
    },
};
const httpServer = (0, http_1.createServer)();
(0, sockets_1.setupWebSockets)(httpServer, options);
httpServer.listen(PORT_NUMBER, () => {
    console.log(`listening on port ${PORT_NUMBER}`);
});
//# sourceMappingURL=index.js.map