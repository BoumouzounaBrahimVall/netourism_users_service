/**
 A JWT blacklist/deny list is a list of tokens that 
    should no longer grant access to your system. 
    You can use a traditional database or cache to keep
    the list of the tokens, using an in-memory data cache like Redis is a better approach.
 */

import mongoose from 'mongoose';

const BlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model('blacklist', BlacklistSchema);