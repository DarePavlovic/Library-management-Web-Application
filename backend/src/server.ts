import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes'
import userDatabaseRouter from './routes/userDatabase.routes';
import bookRouter from './routes/book.routes';
import borrowBookRouter from './routes/borrowBook.routes';
import commRouter from './routes/comment.routes';
import bookWRouter from './routes/bookW.routes';
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Galerija');
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('db connected');
})

const router = express.Router();
router.use('/user', userRouter);
router.use('/userDatabase', userDatabaseRouter);
router.use('/books', bookRouter);
router.use('/borrowBook', borrowBookRouter);
router.use('/comments',commRouter);
router.use('/booksW',bookWRouter);


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));