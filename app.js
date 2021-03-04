const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3002;

const allowedOrigins = [process.env.ALLOWEDORIGINS];

app.use(cors({
	origin(origin, callback) {
		// allow requests with no origin
		// (like mobile apps or curl requests)
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = 'The CORS policy for this site does not '
                + 'allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
}));

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'workbench' }));

// DB Config

const db = `${process.env.MONGOURI}/${process.env.DBNAME}?retryWrites=true&w=majority`;

// Connect to Mongo
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}) // Adding new mongo url parser
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.listen(port, () => {
	debug(`Listening on port ${chalk.green(port)}`);
});
