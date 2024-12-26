

export interface IChatRepository{
    saveMessageRepo(reqBody:Object):Promise<any|null>
    getMessage(userId:string,coachId:string):Promise<any|null>
}