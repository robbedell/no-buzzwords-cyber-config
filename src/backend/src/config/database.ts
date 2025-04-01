import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/security-config';

const MONGODB_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 50,
  minPoolSize: 10,
  retryWrites: true,
};

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);
    console.log('Connected to MongoDB at:', MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Retry connection after 5 seconds
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
  // Attempt to reconnect on error
  if (!mongoose.connection.readyState) {
    console.log('Attempting to reconnect to MongoDB...');
    setTimeout(connectDB, 5000);
  }
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  setTimeout(connectDB, 5000);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected successfully');
}); 