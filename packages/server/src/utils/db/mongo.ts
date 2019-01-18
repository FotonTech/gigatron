import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let GLOBAL_CONN;
const { MONGOURL } = process.env;

// Buffering means mongoose will queue up operations if it gets
// disconnected from MongoDB and send them when it reconnects.
// With serverless, better to fail fast if not connected.
const OPTS = {
  useNewUrlParser: true, // New parser required
  bufferCommands: false, // Disable mongoose buffering
  bufferMaxEntries: 0 // Disable MongoDB driver buffering
}

export const connectToMongo = async () => {
  if (!GLOBAL_CONN) {
    if (!MONGOURL) throw new Error('[mongo.ts] No URL provided.')
    GLOBAL_CONN = await mongoose.createConnection(MONGOURL, OPTS);
  }

  mongoose.connection.on('error', e => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(MONGOURL || '', OPTS);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${MONGOURL}`);
  });

  return GLOBAL_CONN
}
