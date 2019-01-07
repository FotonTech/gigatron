
import mongoose from 'mongoose';

const Schema: mongoose.SchemaType = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    conversation: {
      type: mongoose.Schema.ObjectId,
      ref: 'Conversation',
      required: true,
    },
  },
  {
    collection: 'message',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export default mongoose.model('Message', Schema);
