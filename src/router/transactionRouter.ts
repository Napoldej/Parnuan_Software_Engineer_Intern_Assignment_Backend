import { Router } from 'express'
import TransactionController from '../controller/transactionController.js';

const router = Router();

const transactionController = new TransactionController();

/**
 * @openapi
 * /api/transactions/add-transaction/{user_id}:
 *   post:
 *     summary: Add a transaction for a user
 *     tags:
 *       - Transactions
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionInput'
 *     responses:
 *       201:
 *         description: Transaction added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Failed to add transaction
 */
router.post("/add-transaction/:user_id", (req, res) => transactionController.addTransaction(req, res));
/**
 * @openapi
 * /api/transactions/get-all-transactions/{user_id}:
 *   get:
 *     summary: Get all transactions for a user
 *     tags:
 *       - Transactions
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Failed to retrieve transactions
 */
router.get("/get-all-transactions/:user_id", (req, res) => transactionController.get_all_Transactions(req, res));
/**
 * @openapi
 * /api/transactions/get-income-transactions/{user_id}:
 *   get:
 *     summary: Get income transactions for a user
 *     tags:
 *       - Transactions
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       200:
 *         description: Income transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Failed to retrieve income transactions
 */
router.get("/get-income-transactions/:user_id", (req, res) => transactionController.get_income_Transactions(req, res));
/**
 * @openapi
 * /api/transactions/get-expense-transactions/{user_id}:
 *   get:
 *     summary: Get expense transactions for a user
 *     tags:
 *       - Transactions
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       200:
 *         description: Expense transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Failed to retrieve expense transactions
 */
router.get("/get-expense-transactions/:user_id", (req, res) => transactionController.get_expense_Transactions(req, res));
/**
 * @openapi
 * /api/transactions/delete-transaction/{transaction_id}:
 *   patch:
 *     summary: Soft delete a transaction
 *     tags:
 *       - Transactions
 *     parameters:
 *       - $ref: '#/components/parameters/transactionIdParam'
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Failed to delete transaction
 */
router.patch("/delete-transaction/:transaction_id", (req, res) => transactionController.delete_transaction(req, res));
/**
 * @openapi
 * /api/transactions/edit-transaction/{transaction_id}:
 *   patch:
 *     summary: Edit a transaction
 *     tags:
 *       - Transactions
 *     parameters:
 *       - $ref: '#/components/parameters/transactionIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditTransactionInput'
 *     responses:
 *       200:
 *         description: Transaction edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Failed to edit transaction
 */
router.patch("/edit-transaction/:transaction_id", (req, res) => transactionController.edit_transaction(req, res));
/**
 * @openapi
 * /api/transactions/recover-transaction/{transaction_id}:
 *   patch:
 *     summary: Recover a soft-deleted transaction
 *     tags:
 *       - Transactions
 *     parameters:
 *       - $ref: '#/components/parameters/transactionIdParam'
 *     responses:
 *       200:
 *         description: Transaction recovered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Failed to recover transaction
 */
router.patch("/recover-transaction/:transaction_id", (req, res) => transactionController.recover_transaction(req, res));


export default router