import { IChatRepository } from "../interface/repository/chatRepository.interface";
import { IChatService } from "../interface/services/chatService.interface";
import { saveMessageInput } from "../interface/services/chatService.type";


export class chatService implements IChatService{
 private chatRepository : IChatRepository
  constructor(chatRepository:IChatRepository){
    this.chatRepository = chatRepository
}
    async saveMessage(reqBody:any): Promise<any | null> {
        try {
            const msgData = await this.chatRepository.saveMessageRepo(reqBody)
        return msgData 
        } catch (error) {
            throw new Error("error at save message");
        }
    }
    async saveMessageCoach(reqBody:any): Promise<any | null> {
        try {
            const msgData = await this.chatRepository.saveMessageCoachRepo(reqBody)
        return msgData 
        } catch (error) {
            throw new Error("error at save message");
        }
    }
   async getMessage(userId:string,coachId:string): Promise<any | null>{
    try {
        const megData = await this.chatRepository.getMessage(userId,coachId)
        return megData
    } catch (error) {
        throw new Error("error at getting message.");
    }
   }
   async getRoomId(userId:any,coachId:any): Promise<any | null>{
    try {
        const megData = await this.chatRepository.getRoomId(userId,coachId)
        console.log(megData,"from serivce")
        return megData
    } catch (error) {
        console.log(error)
        throw new Error("error at getting room id.");
    }
   }
}