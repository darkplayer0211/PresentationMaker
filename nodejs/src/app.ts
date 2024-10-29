// create simple rest API
//The following code is just for testing how Nodejs works; it is only an example for usafe, and you can delete it.

import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser'; 


import todoRoutes from './routes/todos';

const app = express();
app.use(json());

app.use('/todos', todoRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
});
app.listen(3000);
