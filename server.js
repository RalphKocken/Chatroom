/* Losjes gebaseerd op https://socket.io/get-started/chat */

import * as path from "path";

import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const http = createServer(app);
const ioServer = new Server(http);
const port = process.env.PORT || 4242;

// Serveer client-side bestanden
app.use(express.static(path.resolve("public")));

// Start de socket.io server op
ioServer.on("connection", (socket) => {
  // Log de connectie naar console
  console.log(`user ${socket.id} connected`);

  // Luister naar een message van een gebruiker
  socket.on("message", (message) => {
    // Log het ontvangen bericht
    console.log(`user ${socket.id} sent message: ${message}`);

    // Verstuur het bericht naar alle clients
    ioServer.emit("message", { uid: socket.id, message: message });
  });

  // Luister naar een disconnect van een gebruiker
  socket.on("disconnect", () => {
    // Log de disconnect
    console.log(`user disconnected`);
  });
});

// Start een http server op het ingestelde poortnummer en log de url
http.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
