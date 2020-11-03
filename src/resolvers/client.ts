import dynamoose from 'dynamoose'

dynamoose.aws.sdk.config.update({
  region: 'us-east-1',
})

const todoSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    body: String,
    completed: Boolean,
  },
  { timestamps: true },
)

const TodoClient = dynamoose.model('Todos', todoSchema, { create: false })

export { TodoClient }
