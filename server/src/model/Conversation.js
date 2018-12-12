
import mongoose from 'mongoose';

const Schema: mongoose.SchemaType = mongoose.Schema(
  {
    messages: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Message',
      required: false,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    otherUser: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'conversation',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export default mongoose.model('Conversation', Schema);
