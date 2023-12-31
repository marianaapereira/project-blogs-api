const express = require('express');

const categoryRouter = require('./routes/category.router');
const loginRouter = require('./routes/login.router');
const postRouter = require('./routes/post.router');
const userRouter = require('./routes/user.router');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// rotas

app.use('/login', loginRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

app.use('/user', userRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
