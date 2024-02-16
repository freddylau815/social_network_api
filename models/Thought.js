const { model, Schema, Types } = require('mongoose')

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: Schema.Types.String,
            required: true,
            maxLength: [280, 'Thought must be between 1 and 280 characters!']
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
            // Use a getter method to format the timestamp on query
        },
    },
)

const thoughtSchema = new Schema (
{
    thoughtText: {
        type: String,
        required: [true, 'Please enter text for your thought!'],
        minLength: [1, 'Thought must be between 1 and 280 characters!'],
        maxLength: [280, 'Thought must be between 1 and 280 characters!']
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
    reactions: [reactionSchema]
},
{
    toJSON: { getters: true }
}
)

thoughtSchema.virtual('reactionCount').get(
    function() {
        if (this.reactions) return this.reactions.length
    }
)

// thoughtSchema.set('toJSON', {
//     transform: (_, thought) => {
//       delete thought.__v
//       return thought
//     }
//   })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
