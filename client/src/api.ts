import axios from 'axios';


export type Employee = {
	username: string;
	name: string;
	fulfilledCount: number;
}

export type Customer = {
	name: string;
}

export type BillingInfo = {
	status: string;
}

export type Price = {
	formattedTotalPrice: string;
}

export type Order = {
	id: number;
	createdDate: string;
	fulfillmentStatus: string;
	billingInfo: BillingInfo;
	customer: Customer;
	itemQuantity: number;
	items: { id: string, quantity: number }[];
	price: Price;
}

export type Item = {
	id: string;
	name: string;
	price: number;
	image: string;
}

export type ApiClient = {
	getOrders: (searchValue: string, searchMethod: string, pageNumber: number, fulfillmentFilter: string, paymentFilter: string)
		=> Promise<{ length: number, unfulfilledCount: number, ordersToReturn: Order[] }>;
	getItem: (itemId: string) => Promise<Item>;
	login: (username: string, password: string) => Promise<any>;
}

export type FulfillmentChangeClient = {
	changeFulfillmentStatus: (orderId: number, newFulfillmentStatus: string, employeeUN: string) => Promise<string>;
}


export const createApiClient = (): ApiClient => {
	return {
		getOrders: (searchValue, searchMethod, pageNumber, fulfillmentFilter, paymentFilter) => {
			return axios.get(`http://localhost:3232/api/orders`, {
				params: {
					searchValue: searchValue,
					searchMethod: searchMethod,
					pageNumber: pageNumber,
					fulfillmentFilter: fulfillmentFilter,
					paymentFilter: paymentFilter,
				}
			}).then((res) => res.data).catch((error) => {
				console.log(error);
			});
		},
		getItem: (itemId: string) => {
			return axios.get(`http://localhost:3232/api/items/${itemId}`).then((res) => res.data).catch((error) => {
				console.log(error);
			});
		},
		login: (username: string, password: string) => {
			return axios.post('http://localhost:3232/api/employees/login', { username: username, password: password }).then((res) => res.data).catch((error) => {
				console.log(error)
			});
		}
	}
};


//used by OrderModal
export const createFulfillmentClient = (): FulfillmentChangeClient => {
	return {
		changeFulfillmentStatus: (orderId: number, newFulfillmentStatus: string, employeeUN: string) => {
			return axios.post(`http://localhost:3232/api/${orderId}`, { fulfillmentStatus: newFulfillmentStatus, employeeUN: employeeUN }).then((res) => res.data).catch((error) => {
				console.log(error);
			});
		}
	}
};





