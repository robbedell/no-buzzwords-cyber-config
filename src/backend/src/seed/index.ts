import mongoose from 'mongoose';
import { seedSecurityConfigs } from './security';
import { logger } from '../utils/logger';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/security-config';

export const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');

    await seedSecurityConfigs();
    logger.info('Database seeding completed');

    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is run directly
if (require.main === module) {
  seedDatabase();
} 