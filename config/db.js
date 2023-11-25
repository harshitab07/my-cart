import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDb: Host = ${conn.connection.host}`.bgMagenta.white);
    } catch (err) {
        console.log(`Error in mongoDb: ${err}`.bgRed.white);
    }
}

export default connectDb;