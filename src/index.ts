import  express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import userRouter from "./router/userRouter.js";
import transactionRouter from "./router/transactionRouter.js";

class MainApp{
    public app: express.Application;
    private port: string | number

    constructor(){
        this.app = express();
        this.app.use(express.json());
        this.port = process.env.PORT || 3000;
    }

    public start(){
        this.listen();
        // Swagger UI
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        // Expose raw OpenAPI JSON for debugging
        this.app.get('/api-docs.json', (_req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });
        this.app.use("/api/users",userRouter)
        this.app.use("/api/transactions", transactionRouter)
        
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }
}

const mainApp = new MainApp();
mainApp.start();