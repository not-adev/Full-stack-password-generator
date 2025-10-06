import mongoose from 'mongoose';

/**
 * Connect to MongoDB using Mongoosef
 *
 * Reads the connection string from the environment variable
 * `MONGO_CONNECTION_STRING`. Throws if the variable is not set.
 *
 * If you need to target a specific database name, set `MONGO_DB_NAME` in
 * the environment and it will be passed as the `dbName` option to
 * Mongoose connect.
 *
 * @returns {Promise<typeof mongoose>}
 */
export async function connectToDb() {
  const connectionUri = process.env.MONGO_CONNECTION_STRING;
  if (!connectionUri) {
    throw new Error('MongoDB connection URI is required. Set MONGO_CONNECTION_STRING in the environment');
  }

  // Avoid creating multiple connections in hot-reload/dev
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const defaultOptions = {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    dbName: undefined as string | undefined,
  };

  try {
    // If a database name is specified in env, include it on the default options
    const dbName = process.env.MONGO_DB_NAME;
    if (dbName) defaultOptions.dbName = dbName;
    await mongoose.connect(connectionUri, defaultOptions);
    console.log('MongoDB connected');
    return mongoose;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export async function disconnectFromDb() {
  if (mongoose.connection.readyState === 0) return;
  await mongoose.disconnect();
  console.log('MongoDB disconnected');
}
