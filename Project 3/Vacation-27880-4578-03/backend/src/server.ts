import server from "./app";
import { Server } from "socket.io";

import socketIoResource from "./2-utils/socketIoResource";

const port = process.env.PORT || 3001;

const httpServer = server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

socketIoResource.init(httpServer);
