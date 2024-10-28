import  mongoose  from 'mongoose';

export const connectToMongoDB =  async ():Promise<void>=>{
    try {
        await mongoose.connect('mongodb+srv://Hariharan:Hariharan0404@cluster0.iey6hba.mongodb.net/',{
            serverSelectionTimeoutMS: 30000, 
        });
        console.log("successfully connected to mongoDB Atlas")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
}
