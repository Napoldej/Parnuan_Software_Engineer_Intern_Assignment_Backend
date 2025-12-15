import Router from 'express'
import TransactionController from '../controller/transactionController.js';

const router = Router();

const transactionController = new TransactionController();

router.post("/add-transaction/:user_id", (req, res) => transactionController.addTransaction(req, res));
router.get("/get-all-transactions/:user_id", (req, res) => transactionController.get_all_Transactions(req, res));
router.get("/get-income-transactions/:user_id", (req, res) => transactionController.get_income_Transactions(req, res));
router.get("/get-expense-transactions/:user_id", (req, res) => transactionController.get_expense_Transactions(req, res));
router.patch("/delete-transaction/:transaction_id", (req, res) => transactionController.delete_transaction(req, res));
router.patch("/edit-transaction/:transaction_id", (req, res) => transactionController.edit_transaction(req, res));
router.patch("/recover-transaction/:transaction_id", (req, res) => transactionController.recover_transaction(req, res));