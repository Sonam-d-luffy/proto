import mongoose, { Mongoose } from "mongoose";

const ngoSchema = new mongoose.Schema({
    organizationName: { type: String, required: true },
  darpanId: { type: String, required: true, unique: true },
  address: { type: String, required: true }, // from OpenCage
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  mission: { type: String, required: true },
  areaOfOperation: [{ type: String }], // e.g., cities or regions
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


const NGO = mongoose.model('NGO' , ngoSchema)

export default NGO