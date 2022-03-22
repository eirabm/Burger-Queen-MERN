const { connectDB, disconnectDB } = require('../db');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const refreshTimes = 6;
const refreshTokensAvailable = {};

const { key } = require('../config/config');

const createUser = async (user) => {
	const db = await connectDB();

	const usersCollection = db.collection('users');

	const userInserted = await usersCollection.insertOne(user);

	await disconnectDB();

	return { _id: userInserted.insertedId };
};

const queryUsers = async (params) => {
	const db = await connectDB();
	const usersCollection = db.collection('users');

	let userArray = [],
		userCursor;
	if ('_id' in params) {
		userCursor = await usersCollection.find({ _id: ObjectId(params['_id']) });
	} else {
		userCursor = await usersCollection.find(params);
	}
	userArray = await userCursor.toArray();

	await disconnectDB();
	return userArray;
};

const updateUser = async (params) => {
	if ('_id' in params) {
		const db = await connectDB();
		const usersCollection = db.collection('users');

		let newParams = {};

		for (const key in params) {
			if (Object.hasOwnProperty.call(params, key) && key !== '_id') {
				if (params[key] !== undefined && params[key] !== null)
					newParams[key] = params[key];
			}
		}

		const updatedUser = await usersCollection.updateOne(
			{ _id: ObjectId(params['_id']) },
			{ $set: newParams }
		);

		await disconnectDB();
		return updatedUser;
	}
};

const deleteUser = async (params) => {
	if ('_id' in params) {
		const db = await connectDB();
		const usersCollection = db.collection('users');

		const deletedUser = await usersCollection.deleteOne({
			_id: ObjectId(params['_id'])
		});

		await disconnectDB();
		return deletedUser;
	}
};

const authenticate = async (params) => {
	if ('email' in params && 'password' in params) {
		const db = await connectDB();
		const usersCollection = db.collection('users');
		userCursor = await usersCollection.find({ email: params.email });

		const user = await userCursor.toArray();

		await disconnectDB();
		if (user.length == 0) {
			return {
				statusCode: 404
			};
		}

		if (params.password !== user[0].password) {
			return {
				statusCode: 401
			};
		}

		const token = jwt.sign(
			{
				userName: user[0].userName
			},
			key,
			{
				expiresIn: 60 * 10
			}
		);

		const refreshToken = uuidv4();
		refreshTokensAvailable[refreshToken] = {
			userName: user[0].userName,
			times: refreshTimes
		};

		return {
			statusCode: 200,
			auth: {
				token,
				refreshToken
			}
		};
	}
};

const getNewToken = ({ userName, refreshToken: userToken }) => {
	if (
		refreshTokensAvailable[userToken] &&
		userName === refreshTokensAvailable[userToken].userName &&
		refreshTokensAvailable[userToken].times > 0
	) {
		const token = jwt.sign(
			{
				userName
			},
			key,
			{
				expiresIn: 60 * 10
			}
		);
		refreshTokensAvailable[userToken].times--;
		return token;
	}
};

const validateToken = (req, res, next) => {
	const token = req.headers['authorization']?.replace('Bearer ', '');

	if (token) {
		jwt.verify(token, key, (err, decoded) => {
			if (err) {
				res.status(401);
				res.send({
					message: 'Unauthorized'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(401);
		res.send({
			message: 'Unauthorized'
		});
	}
};

module.exports = {
	createUser,
	queryUsers,
	updateUser,
	deleteUser,
	authenticate,
	getNewToken,
	validateToken
};