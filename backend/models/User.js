import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  series: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
