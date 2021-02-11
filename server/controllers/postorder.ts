export const handlePostOrder = (allOrders: any[], req: any, res: any, fs: any) => {
	const orderId = parseInt(req.params.orderId);
	const { fulfillmentStatus } = req.body;
	let i: number = 0;
	for (i = 0; i < allOrders.length; i++) {
		if (allOrders[i].id === orderId) {
			if (allOrders[i].fulfillmentStatus !== fulfillmentStatus) {
				allOrders[i].fulfillmentStatus = fulfillmentStatus;
			}
			break;
		}
	};

	fs.writeFile('./orderDB.json', JSON.stringify(allOrders, null, 2), (err: any) => {
		if (err) {
			console.log(`Error writing file: ${err}`);
		} else {
			console.log('orders DataBase updated');
		}
	});

	res.status(200).json('success');
  }
  