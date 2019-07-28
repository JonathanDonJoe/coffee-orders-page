// 1. draw all the email addresses associated with the coffee orders to the page in a list
// 2. when you click a coffee order, draw the details of the order to another part of the page
// 3. store the coffee data in localStorage
// 4. load the coffee data when the page loads, only retrieving it if there is no data in localStorage
// 5. add links with filtering by the first letter of the email (or coffee order, your choice)
// that’s all for now, thanks y’all

const orderContainer = document.querySelector('#order-container');
const orderDetailsContainer = document.querySelector('#order-details');

drinksURL = 'http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/drinks';
ordersURL = 'http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/orders';
customersURL = 'http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/customers';


// Restructured orders to be {order.id:object} format
function ordersById(jsonOrders) {
    const orderIdObject = {};
    jsonOrders.results.forEach(order => orderIdObject[order.id] = order);
    return orderIdObject;
}

// Restructured customers to be {customer.id:object} format
function customerById(jsonCustomers) {
    const customerIdObject = {};
    jsonCustomers.results.forEach(cust => customerIdObject[cust.id]=cust);
    return customerIdObject;
}

// Restructured drinks to be {drink.id:object} format
function drinksById(jsonDrinks) {
    const drinkIdObject = {};
    jsonDrinks.results.forEach(drink => drinkIdObject[cust.id]=drink);
    return drinkIdObject;
}

// Build Array of all current order id's
function buildOrdersArray(orders) {
    const orderArray=[];
    for (order in orders){
        orderArray.push(order);
    }
    return orderArray;
}

// Populate Orders List Container with orders
function fillOrdersContainer(orders, ordersById, customersById) {
    orders.forEach(order => {
        const li = document.createElement('li');
        li.classList.add('order');
        li.innerHTML = `Order: ${order} <br>${customersById[ordersById[order].customer_id].email}`;
        orderContainer.append(li);
    })
}

// Populate the order details container
function populateOrderDetails(event, orders, drinks, customers) {
    // Delete any old order elements
    orderDetailsContainer.innerHTML = "";

    // Information needed
    const orderID = event.target.innerHTML.split(' ')[1];
    const order = orders[orderID];
    const customerID = order.customer_id;
    const customer = customers[customerID];
    const drinkID = order.drink_id;
    const drink = drinks[drinkID]
    // console.log(customerID);


    // Create a containing div for the order
    const section = document.createElement('section');
    // section.classList.add('test');  
    orderDetailsContainer.appendChild(section);

    // Create Order Header
    const h1 = document.createElement('h1');
    h1.classList.add('order-details-h1');
    h1.innerHTML = `Order ID: ${orderID}`;
    section.appendChild(h1);

    // Create body section
    const details = document.createElement('div');
    details.classList.add('order-details-body');
    details.innerHTML = 
        `
        <h2 class='order-details-h2'><strong>Order: </strong></h2><br>
        <p class='details-text'><strong>Order Time: </strong>${order.date}<br>
        <strong>Drink: </strong>${drink.recipe}<br>
        <strong>Size: </strong>${order.size}<br></p><br><br>
        <h2 class='order-details-h2'><strong>Customer: </strong></h2><br>
        <p class='details-text'><strong>Name: </strong>${customer.name}<br>
        <strong>Email: </strong>${customer.email}<br>
        <strong>Twitter: </strong>${customer.twitter}<br></p>
        `;
    section.append(details);
}


async function fetchMyData() {
    // fetch and change to usable objects
    const fetchedDrinks = await fetch(drinksURL);
    const jsonifiedDrinks = await fetchedDrinks.json();
    const fetchedOrders = await fetch(ordersURL);
    const jsonifiedOrders = await fetchedOrders.json();
    const fetchedCustomers = await fetch(customersURL);
    const jsonifiedCustomers = await fetchedCustomers.json();
    // console.log(jsonifiedDrinks);

    // Restructured objects to be {id:object} format
    const ordersByIdObject = ordersById(jsonifiedOrders);
    const drinksByIdObject = ordersById(jsonifiedDrinks);
    const customersByIdObject = customerById(jsonifiedCustomers);

    // Populate Orders Container sidebar
    const OrdersArray = buildOrdersArray(ordersByIdObject);
    fillOrdersContainer(OrdersArray, ordersByIdObject, customersByIdObject);

    // Add event listener for clicking on orders
    orderContainer.addEventListener('click', event => populateOrderDetails(event, ordersByIdObject, drinksByIdObject, customersByIdObject));
}

fetchMyData();

