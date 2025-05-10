import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["water", "soil", "air", "noise", "deforestation", "wildlife", "waste", "other"],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  locationName: {
    type: String,
    default: "Unknown location",
  },
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
