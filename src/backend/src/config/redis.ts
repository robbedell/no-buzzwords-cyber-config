import { createClient, RedisClientType } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient: RedisClientType = createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: (retries: number) => {
      // Maximum retry delay of 5 seconds
      const delay = Math.min(retries * 1000, 5000);
      console.log(`Retrying Redis connection in ${delay}ms...`);
      return delay;
    },
    connectTimeout: 10000,
  },
});

redisClient.on('error', (error: Error) => {
  console.error('Redis error:', error);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis at:', REDIS_URL);
});

redisClient.on('ready', () => {
  console.log('Redis client is ready');
});

redisClient.on('reconnecting', () => {
  console.log('Reconnecting to Redis...');
});

redisClient.on('end', () => {
  console.log('Redis connection ended');
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Redis connection error:', error);
    // Retry connection after 5 seconds
    setTimeout(connectRedis, 5000);
  }
};

export default redisClient; 