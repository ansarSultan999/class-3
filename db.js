import mongoose from "mongoose"

const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        
        console.log(`MongDB Connected to ${conn.connection.host}`);
       
    } catch (error) {
        
    }
}

export default connectDB