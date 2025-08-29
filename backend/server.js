const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const tasksRouter = require('./routes/tasks');

const app = express();

// core middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// routes
app.use('/api/tasks', tasksRouter);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

// start
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
