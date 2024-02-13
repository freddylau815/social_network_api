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
    },
    username: {
        type: String,
        required: true
    },
    reactions: {

    }
}
)

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
