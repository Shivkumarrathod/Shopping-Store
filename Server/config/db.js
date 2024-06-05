import mongoose from "mongoose";
const connectDb =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB is connected!`);
    } catch (error) {
        console.error(`ERROR:${error.message}`)
        process.exit(1)
    }
}
export default connectDb