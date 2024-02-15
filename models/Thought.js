const { model, Schema } = require('mongoose')

const thoughtSchema = new Schema (
{
    thoughtText: {
        type: String,
        required: [true, 'Please enter text for your thought!'],
        minLenght: [1, 'Thought must be between 1 and 280 characters!'],
        maxLenght: [280, 'Thought must be between 1 and 280 characters!']
    },
    createdAt: {
        type: Date,
        default: Date.now
        // Use a getter method to format the timestamp on query
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    reactions: {
        // Array of nested documents created with the reactionSchema
    }
}
)

thoughtSchema.set('toJSON', {
    transform: (_, thought) => {
      delete thought.__v
      return thought
    }
  })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
