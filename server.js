import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// rest obj
const app = express();

// config env
dotenv.config();

// config db
connectDb();

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')));


// routes
app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// 1. For login / signup
app.use('/api/v1/auth', authRoutes);
const port = process.env.PORT || 8080;

// 2. Managing Category
app.use('/api/v1/category', categoryRoutes);

// 3. Managing Products
app.use('/api/v1/product', productRoutes);

app.listen(port, () => {
    console.log(`Server running on ${process.env.DEV_MODE ? 'development' : 'production'} mode at port ${port}.`.bgCyan.white);
})
