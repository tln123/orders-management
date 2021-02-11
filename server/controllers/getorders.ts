const getFilter = (filterString: string): string => {
	return filterString.replace(' ', '-').toLowerCase();
}

export const handleGetOrders = (allOrders: any[], products: any, PAGE_SIZE: number, req: any, res: any) => {
    const page = <number>(req.query.pageNumber || 1);
	const searchValue = <string>(req.query.searchValue);
	const fulfillmentFilter = getFilter(<string>(req.query.fulfillmentFilter));
	const paymentFilter = getFilter(<string>(req.query.paymentFilter));
	const searchMethod = <string>(req.query.searchMethod);

	let filteredOrders;
	if (searchMethod === 'Name or Order ID') {
		filteredOrders = allOrders
			.filter((order) => (order.customer.name.toLowerCase() + order.id).includes(searchValue.toLowerCase()));
	} else {
		filteredOrders = [];
		let i: number, j: number;
		for (i = 0; i < allOrders.length; i++) {
			for (j = 0; j < allOrders[i].items.length; j++) {
				const currID = allOrders[i].items[j].id;
				if (products[currID].name.toLowerCase().includes(searchValue.toLowerCase())) {
					filteredOrders.push(allOrders[i]);
					break;
				}
			}
		}
	}

	if (fulfillmentFilter !== 'no-filter') {
		filteredOrders = filteredOrders.filter((order) => order.fulfillmentStatus === fulfillmentFilter);
	}

	if (paymentFilter !== 'no-filter') {
		filteredOrders = filteredOrders.filter((order) => order.billingInfo.status === paymentFilter);
	}

	// number of unfulfilled
	let i: number, unfulfilledCount: number = 0;
	for (i = 0; i < filteredOrders.length; i++) {
		if (filteredOrders[i].fulfillmentStatus === "not-fulfilled")
			unfulfilledCount++;
	}

	const ordersToReturn: any[] = filteredOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	const returnObj: { length: number, unfulfilledCount: number, ordersToReturn: any[] } =
		{ length: filteredOrders.length, unfulfilledCount: unfulfilledCount, ordersToReturn: ordersToReturn };
	res.send(returnObj);
  }
  

