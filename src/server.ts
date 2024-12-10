import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';
// import { seedSuperAdmin } from './app/DB';

let server: Server;
async function main() {
  try {
    // Start the server first
    server = app.listen(config.port, () => {
      console.log(
        `Example app running on port http://localhost:${config.port}/`,
      );
    });

    // Try connecting to MongoDB
    await mongoose.connect(config.database_url as string);
    console.log('Mongoose connected to the database'); // This log will appear when Mongoose is connected.
  } catch (err) {
    console.log('Error during startup:', err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(' Unhandled rejection Detected');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Uncaught exception Detected');
  process.exit(1);
});
