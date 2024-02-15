const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "User with that username already exists!"],
    required: [true, "Please enter a username!"],
    // Takes out whitespace
    trim: true,
  },

  email: {
    type: String,
    unique: [true, "User with that email address already exists!"],
    required: [true, "Please enter a valid email address!"],
    validate: {
      validator(val) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
      },
      message: "Your email address is not a valid email address",
    },
  },

  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought',
  }],

  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

userSchema.set('toJSON', {
  transform: (_, user) => {
    delete user.__v
    return user
  }
})

const User = model('User', userSchema);

module.exports = User;
