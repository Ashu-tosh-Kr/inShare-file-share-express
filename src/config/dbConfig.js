import mongoose from "mongoose";
const { connect } = mongoose;

const dbConfig = async () => {
  await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  });
  console.log("Connected to DB");
};
export default dbConfig;
