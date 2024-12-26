import { Types } from "mongoose";
import { IChatRepository } from "../interface/repository/chatRepository.interface";
import chatRoomModel from "../model/chatRoomModel";
import messageModel from "../model/messageModel";


export class chatRepository implements IChatRepository{



async saveMessageRepo(reqBody:any): Promise<any | null> {
    try {
        const roomId = await chatRoomModel.findOne({user:reqBody?.senderId,coach:reqBody?.coachId})
        return await messageModel.create({
            senderId:reqBody?.senderId,
            receiverId:reqBody?.coachId,
            content:reqBody?.text,
            roomId:roomId._id
        })  
    } catch (error) {
        throw new Error("error at msg saving");
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

}