import { Types } from "mongoose";
import { IChatRepository } from "../interface/repository/chatRepository.interface";
import chatRoomModel from "../model/chatRoomModel";
import messageModel from "../model/messageModel";
import { io } from '../index';


export class chatRepository implements IChatRepository{


    async saveMessageRepo(reqBody: any): Promise<any | null> {
        try {
          const { senderId, coachId, content } = reqBody;
          console.log(reqBody,"------------")
          if (!senderId || !coachId || !content) {
            console.error("Missing required fields in request body:", reqBody);
            throw new Error("Missing required fields (senderId, coachId, content)");
          }
          const room = await chatRoomModel.findOne({ user: senderId, coach: coachId });
          if (!room) {
            console.error("Room not found for the given user and coach IDs:", {
              senderId,
              coachId,
            });
            throw new Error("Chat room not found");
          }
          const message = await messageModel.create({
            senderId:senderId,
            receiverId: coachId,
            content,
            roomId: room._id,
          });
          console.log("Message successfully saved to database:", message);
          const roomStringId = room._id.toString();
          io.to(roomStringId).emit("message", {
            _id: message._id,
            roomId: message.roomId,
            senderId: message.senderId,
            receiverId: message.receiverId,
            content: message.content,
            isRead: message.isRead,
            timestamp: message.timestamp,
          });
          console.log("Message successfully emitted to user room:", roomStringId);
          return message;
        } catch (error) {
          console.error("Error in saveMessageRepo:", error.message);
          throw new Error("Error occurred while saving the message");
        }
      }
      


      async saveMessageCoachRepo(reqBody: any): Promise<any | null> {
        try {
          const { senderId, coachId, content } = reqBody;
          console.log(reqBody,"------------")
          if (!senderId || !coachId || !content) {
            console.error("Missing required fields in request body:", reqBody);
            throw new Error("Missing required fields (senderId, coachId, content)");
          }
          const room = await chatRoomModel.findOne({ user: coachId , coach:  senderId });
          if (!room) { 
            console.error("Room not found for the given user and coach IDs:", {
              senderId,
              coachId,
            });
            throw new Error("Chat room not found");
          }
          const message = await messageModel.create({
            senderId:senderId,
            receiverId: coachId,
            content,
            roomId: room._id,
          });
          console.log("Message successfully saved to database:", message);
          const roomStringId = room._id.toString();
          io.to(roomStringId).emit("message", {
            _id: message._id,
            roomId: message.roomId,
            senderId: message.senderId,
            receiverId: message.receiverId,
            content: message.content,
            isRead: message.isRead,
            timestamp: message.timestamp,
          });
          console.log("Message successfully emitted coach to room:", roomStringId);
          return message;
        } catch (error) {
          console.error("Error in saveMessageRepo:", error.message);
          throw new Error("Error occurred while saving the message");
        }
      }




async getMessage(userId:string,coachId:string): Promise<any | null>{
        try {
        const userIds = new Types.ObjectId(userId);
        const coachIds = new Types.ObjectId(coachId);
        const roomId = await chatRoomModel.find({user:userIds,coach:coachIds})
        const msgData = await messageModel.find({roomId:roomId}).populate("receiverId","name")
        return msgData
        } catch (error) {
            throw new Error("error at msg fetching");
        }
    } 

    async getRoomId(userId:string,coachId:string): Promise<any | null>{
        try {
        const userIds = new Types.ObjectId(userId);
        const coachIds = new Types.ObjectId(coachId);
        const roomId = await chatRoomModel.findOne({user:userIds,coach:coachIds})
        return roomId._id
        } catch (error) {
            throw new Error("error at msg fetching");
        }
    } 

}