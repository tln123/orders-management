# Orders Management System Project
The project is an orders-management system built under the assumption that the app designed for the fulfillment workers and their manager got access to the back-end.  

The project was built with React, Typescript, Node.js, Scss, and MongoDB.
The Front-end deployed to 'GitHub-Pages', the Backend was deployed to 'Heroku', and the DB was deployed to MongoDB Atlas.

Live: https://tln123.github.io/orders-management-front/


## The App

![Authentication Image](https://i.imgur.com/WgcyGif.jpg)

The App contains authentication that simulates the scenario of receiving a new employee to work. The manager assigns him with an Employee ID and password, and now the employee can use it to log in to the system while keeping track of his fulfillment count.

![Feed Image](https://i.imgur.com/nXrGY9i.jpg)

On the homepage after login, I've added a greeting with the employee's name and fulfillment count that makes the app more personalized and gives a little drive to the employees to fulfill more orders. 
Because the app is designed to be scalable with many orders, The search happens on the back-end with pagination on the client side of 50 orders per page.

![Filters Image](https://i.imgur.com/4srbUfc.jpg)

The employee can search the orders according to Customer name, Order ID, or Products Names within the order, moreover the employee can also filter the orders according to their Fulfillment status or Payment Status.

![Modal Image](https://i.imgur.com/bgKRnCl.jpg)

The employee can click on any order to open the order modal. Which contains all the details about the order. In the modal, the employee can change the order fulfillment status, which will also change the employee fulfillment count at the MongoDB database and the fulfilled count in the client. (both the orders unfulfilled count and the employee fulfillment count)




