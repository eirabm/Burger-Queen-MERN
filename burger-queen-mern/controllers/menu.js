const { connectDB, disconnectDB } = require('../db');
const { ObjectId } = require('mongodb');

const createMenuItem = async (menuItem) => {
	const db = await connectDB();

	const menuItemsCollection = db.collection('menuItems');

	const menuItemInserted = await menuItemsCollection.insertOne(menuItem);

	await disconnectDB();

	return { _id: menuItemInserted.insertedId };
};

const queryMenuItems = async (params) => {
	const db = await connectDB();
	const menuItemsCollection = db.collection('menuItems');

	let menuItemArray = [],
		menuItemCursor;
	if ('_id' in params) {
		menuItemCursor = await menuItemsCollection.find({ _id: ObjectId(params['_id']) });
	} else {
		menuItemCursor = await menuItemsCollection.find(params);
	}
	menuItemArray = await menuItemCursor.toArray();

	await disconnectDB();
	return menuItemArray;
};

const updateMenuItem = async (params) => {
	if ('_id' in params) {
		const db = await connectDB();
		const menuItemsCollection = db.collection('menuItems');

		let newParams = {};

		for (const key in params) {
			if (Object.hasOwnProperty.call(params, key) && key !== '_id') {
				if (params[key] !== undefined && params[key] !== null)
					newParams[key] = params[key];
			}
		}

		const updatedMenuItem = await menuItemsCollection.updateOne(
			{ _id: ObjectId(params['_id']) },
			{ $set: newParams }
		);

		await disconnectDB();
		return updatedMenuItem;
	}
};

const deleteMenuItem = async (params) => {
	if ('_id' in params) {
		const db = await connectDB();
		const menuItemsCollection = db.collection('menuItems');

		const deletedMenuItem = await menuItemsCollection.deleteOne({
			_id: ObjectId(params['_id'])
		});

		await disconnectDB();
		return deletedMenuItem;
	}
};

module.exports = { createMenuItem, queryMenuItems, updateMenuItem, deleteMenuItem };
