const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');

const mongoUrl = 'mongodb+srv://radu:felix2013@cluster0.nmpwvok.mongodb.net/blogApp?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;

