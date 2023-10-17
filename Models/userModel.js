import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_ACCESS_TOKEN } from '../config/index.js';

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: 'Your firstname is required',
      max: 30,
    },
    last_name: {
      type: String,
      required: 'Your lastname is required',
      max: 30,
    },
    email: {
      type: String,
      required: 'Your email is required',
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: 'Your password is required',
      select: false,
      max: 25,
    },
    role: {
      type: String,
      required: true,
      default: 'normal',
    },
  },
  { timestamps: true },
);

// hashing the password field before saving
UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});
// for generate the JWT token
UserSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: '20m',
  });
};
//const User=models.User || mongoose.model("User",UserSchema);

//export default User;
export default mongoose.model('users', UserSchema) ;