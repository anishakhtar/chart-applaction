import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'video', 'file', 'voice', 'emoji'],
      default: 'text',
    },
    attachments: [
      {
        url: String,
        type: String,
        fileName: String,
        fileSize: Number,
      },
    ],
    repliedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    reactions: [
      {
        emoji: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    seenBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        seenAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    editedAt: {
      type: Date,
      default: null,
    },
    editHistory: [
      {
        previousMessage: String,
        editedAt: Date,
      },
    ],
    deletedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    aiAnalysis: {
      sentiment: {
        type: String,
        enum: ['positive', 'negative', 'neutral'],
        default: null,
      },
      language: String,
      summary: String,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for check if message is seen by user
messageSchema.virtual('isSeen').get(function () {
  return this.seenBy && this.seenBy.length > 0;
});

// Index for faster queries
messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ isDeleted: 1 });
messageSchema.index({ isPinned: 1 });
messageSchema.index({ createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;
