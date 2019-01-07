
import mongoose from 'mongoose';

const Schema: mongoose.SchemaType = mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    port: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    castrated: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    alergic: {
      type: [String],
      required: false,
      default: [],
    },
    doctor: {
      type: String,
      required: false,
    },
    race: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    collection: 'pet',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export default mongoose.model('Pet', Schema);
