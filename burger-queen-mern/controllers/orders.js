const { connectDB, disconnectDB } = require('../db');
const { ObjectId } = require('mongodb');

const createOrder = async (order) => {
	const db = await connectDB();

	const ordersCollection = db.collection('orders');

	const orderInserted = await ordersCollection.insertOne(order);

	await disconnectDB();

	return { _id: orderInserted.insertedId };
};

const queryOrders = async (params) => {
	const db = await connectDB();
	const ordersCollection = db.collection('orders');

	let orderArray = [],
		orderCursor;
	if ('_id' in params) {
		orderCursor = await ordersCollection.find({ _id: ObjectId(params['_id']) });
	} else {
		orderCursor = await ordersCollection.find(params);
	}
	orderArray = await orderCursor.toArray();

	await disconnectDB();
	return orderArray;
};

const updateOrder = async (params) => {
	if ('_id' in params) {
		const db = await connectDB();
		const ordersCollection = db.collection('orders');

		let newParams = {};

		for (const key in params) {
			if (Object.hasOwnProperty.call(params, key) && key !== '_id') {
				if (params[key] !== undefined && params[key] !== null)
					newParams[key] = params[key];
			}
		}

		const updatedOrder = await ordersCollection.updateOne(
			{ _id: ObjectId(params['_id']) },
			{ $set: newParams }
		);

		await disconnectDB();
		return updatedOrder;
	}
};

const deleteOrder = async (params) => {
	if ('_id' in params) {
		const db = await connectDB();
		const ordersCollection = db.collection('orders');

		const deletedOrder = await ordersCollection.deleteOne({
			_id: ObjectId(params['_id'])
		});

		await disconnectDB();
		return deletedOrder;
	}
};

module.exports = { createOrder, queryOrders, updateOrder, deleteOrder };
