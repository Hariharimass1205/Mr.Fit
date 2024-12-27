
import { saveMessageInput } from "./chatService.type";

export interface IChatService{
    saveMessage(reqBody:any):Promise<any|null>
    getMessage(userId:any,coachId:any): Promise<any | null>
}
