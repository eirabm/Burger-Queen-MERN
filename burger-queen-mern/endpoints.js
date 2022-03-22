const {
	authenticate,
	getNewToken,
	validateToken,
  createUser,
  deleteUser,
  queryUsers,
  updateUser
} = require('./controllers/user');

const {
  createOrder,
  deleteOrder,
  queryOrders,
  updateOrder
} = require('./controllers/user');

const {
  createMenuItem,
  deleteMenuItem,
  queryMenuItems,
  updateMenuItem
} = require('./controllers/user');

module.exports = {
	endPoints: (app) => {

    app.post('/authenticate', async (req, res) => {
			/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Method to get a jwt token',
                schema: {
                    $email: 'email@gmail.com',
                    $password: 'password in SHA-512',
                }
        } */

			const response = await authenticate(req.body);
			res.status(response.statusCode);
			if (response.statusCode === 200) {
				res.send({ ...response.auth });
			}
		});

    app.post('/token', async (req, res) => {
			const response = await getNewToken(req.body);
			if (!response) {
				res.status(401);
				res.send({
					message: 'Unauthorized'
				});
			} else {
				res.status(200);
				res.send({ token: response });
			}
		});

    app.get('/users', validateToken, async (req, res) => {
						/* #swagger.security = [{
               "bearerAuth": []         
        }]
         #swagger.tags = ['Users']
         #swagger.parameters['obj'] = {
                in: 'body',
                required: false
                schema: {
                  "_id": 1
                }
        }
      */

			const requestedUsers = await queryUsers(req.query);
			res.status(200);
			res.send(requestedUsers);
		});

		app.post('/users', validateToken, async (req, res) => {
						/* #swagger.security = [{
               "bearerAuth": []         
        }]
         #swagger.tags = ['Users']
         #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                  "employee-number": "14110098",
                  "name": "Maria Delgado Cruz",
                  "email": "maria@burgerqueen.com",
                  "password": "qwerty",
                  "position": "waitress",
                }
        }
      */

			const newUser = await createUser(req.body);

			res.status(200);
			res.send(newUser);
		});

		app.patch('/users', validateToken, async (req, res) => {
						/* #swagger.security = [{
               "bearerAuth": []         
        }]
         #swagger.tags = ['Users']
         #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                  "employee-number": "14110098",
                  "name": "Maria Delgado Cruz",
                  "email": "maria@burgerqueen.com",
                  "password": "qwerty",
                  "position": "waitress",
                  "_id": 1
                }
        }
      */
     
			const updatedUser = await updateUser(req.body);
			res.status(200);
			res.send(updatedUser);
		});

		app.delete('/users', validateToken, async (req, res) => {
						/* #swagger.security = [{
               "bearerAuth": []         
        }]
         #swagger.tags = ['Users']
         #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                  "_id": 1
                }
        }
      */
			const deleteResponse = await deleteUser(req.body);
			res.status(200);
			res.send(deleteResponse);
		});

    app.get('/orders', validateToken, async (req, res) => {
      /* #swagger.security = [{
         "bearerAuth": []         
  }]
   #swagger.tags = ['Orders']
   #swagger.parameters['obj'] = {
          in: 'body',
          required: false
          schema: {
            "_id": 1
          }
  }
*/

const requestedOrders = await queryOrders(req.query);
res.status(200);
res.send(requestedOrders);
});

app.post('/orders', validateToken, async (req, res) => {
      /* #swagger.security = [{
         "bearerAuth": []         
  }]
   #swagger.tags = ['Orders']
   #swagger.parameters['obj'] = {
          in: 'body',
          schema: {
            "client": "Tamara",
            "products": [],
            "status": "delivering",
            "dateEntry": "2021-05-06T15:35:11.107Z",
          }
  }
*/

const newOrder = await createOrder(req.body);

res.status(200);
res.send(newOrder);
});

app.patch('/orders', validateToken, async (req, res) => {
      /* #swagger.security = [{
         "bearerAuth": []         
  }]
   #swagger.tags = ['Orders']
   #swagger.parameters['obj'] = {
          in: 'body',
          schema: {
            "client": "Tamara",
            "products": [],
            "status": "delivering",
            "dateEntry": "2021-05-06T15:35:11.107Z",
            "_id": 13
          }
  }
*/

const updatedOrder = await updateOrder(req.body);
res.status(200);
res.send(updatedOrder);
});

app.delete('/orders', validateToken, async (req, res) => {
      /* #swagger.security = [{
         "bearerAuth": []         
  }]
   #swagger.tags = ['Orders']
   #swagger.parameters['obj'] = {
          in: 'body',
          schema: {
            "_id": 1
          }
  }
*/
const deleteResponse = await deleteOrder(req.body);
res.status(200);
res.send(deleteResponse);
});

app.get('/menuItem', validateToken, async (req, res) => {
  /* #swagger.security = [{
     "bearerAuth": []         
}]
#swagger.tags = ['Menu Items']
#swagger.parameters['obj'] = {
      in: 'body',
      required: false
      schema: {
        "_id": 1
      }
}
*/

const requestedMenuItems = await queryMenuItems(req.query);
res.status(200);
res.send(requestedMenuItems);
});

app.post('/menuItem', validateToken, async (req, res) => {
  /* #swagger.security = [{
     "bearerAuth": []        MenuItem
#swagger.tags = ['Menu Items']
#swagger.parameters['obj'] = {
      in: 'body',
      schema: {
        "type": "desayuno",
        "product": "Café con leche",
        "price": 7
      }
}
*/

const newMenuItem = await createMenuItem(req.body);

res.status(200);
res.send(newMenuItem);
});

app.patch('/menuItem', validateToken, async (req, res) => {
  /* #swagger.security = [{
     "bearerAuth": []         
}]
#swagger.tags = ['Menu Items']
#swagger.parameters['obj'] = {
      in: 'body',
      schema: {
        "type": "desayuno",
        "product": "Café con leche",
        "price": 7
        "_id": 13
      }
}
*/

const updatedMenuItem = await updateMenuItem(req.body);
res.status(200);
res.send(updatedMenuItem);
});

app.delete('/menuItem', validateToken, async (req, res) => {
  /* #swagger.security = [{
     "bearerAuth": []         
}]
#swagger.tags = ['Menu Items']
#swagger.parameters['obj'] = {
      in: 'body',
      schema: {
        "_id": 1
      }
}
*/
const deleteResponse = await deleteMenuItem(req.body);
res.status(200);
res.send(deleteResponse)

})

  }
}