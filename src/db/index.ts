// @scripts
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to MongoDB Atlas')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default connectDB
