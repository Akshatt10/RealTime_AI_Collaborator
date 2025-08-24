import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';
import { generateResult } from './services/ai.service.js';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.use(async (socket, next) => {
    try{
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }
        socket.project = await projectModel.findById(projectId);

        if (!token) {
            return next(new Error('Authentication error'));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new Error('Authentication error'));
        }

        socket.user = decoded;
        next();

    }
    catch(err){
        console.log('Socket authentication error:', err);
        next(new Error('Authentication error'));
    }
    next();
}
);

io.on('connection', socket => {
    socket.roomId = socket.project._id.toString();

    console.log("a user connected", socket.user.email, "to project", socket.roomId);

    socket.join(socket.roomId);

    socket.on('project-message', data => {
        const message  = data.message;

        const aiIsPresentInthemessage = message.includes("@ai");

        if (aiIsPresentInthemessage) {

            console.log("AI-related message received:", message);

            socket.emit('project-message', 
                { sender: data.sender, 
                  message: "AI response placeholder" });
            return;
        }

        socket.broadcast.to(socket.roomId).emit('project-messages', data);
    });

    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.user.email);
        socket.leave(socket.roomId);
    });
});

server.listen(port, () =>{
    console.log(`server is listening on port ${port}`);
})