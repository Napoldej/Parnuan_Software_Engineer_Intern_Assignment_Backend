import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance API',
      version: '1.0.0',
      description: 'API documentation for Users and Transactions',
    },
    servers: [
      { url: 'http://localhost:3000' },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Alice' },
            email: { type: 'string', example: 'alice@example.com' },
          },
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '64b8f8e5c0f1d2e3a4b5c6d7' },
            title: { type: 'string', example: 'Salary' },
            amount: { type: 'number', example: 1234.56 },
            type: { type: 'string', enum: ['Income', 'Expense'], example: 'Income' },
            user_id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            created_at: { type: 'string', format: 'date-time' },
            is_deleted: { type: 'boolean', example: false },
            deleted_at: { type: 'string', format: 'date-time', nullable: true },
            updated_at: { type: 'string', format: 'date-time', nullable: true },
          },
        },
        CreateUserInput: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
        CreateTransactionInput: {
          type: 'object',
          required: ['title', 'amount', 'type'],
          properties: {
            title: { type: 'string' },
            amount: { type: 'number' },
            type: { type: 'string', enum: ['Income', 'Expense'] },
          },
        },
        EditTransactionInput: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            amount: { type: 'number' },
            type: { type: 'string', enum: ['Income', 'Expense'] },
          },
        },
      },
      parameters: {
        userIdParam: {
          name: 'user_id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'User ObjectId',
        },
        transactionIdParam: {
          name: 'transaction_id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Transaction ObjectId',
        },
      },
    },
  },
  apis: [
    './router/**/*.ts',
    './router/**/*.js',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
