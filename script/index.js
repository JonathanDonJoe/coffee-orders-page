// 1. draw all the email addresses associated with the coffee orders to the page in a list
// 2. when you click a coffee order, draw the details of the order to another part of the page
// 3. store the coffee data in localStorage
// 4. load the coffee data when the page loads, only retrieving it if there is no data in localStorage
// 5. add links with filtering by the first letter of the email (or coffee order, your choice)
// that’s all for now, thanks y’all

const orderContainer = document.querySelector('#order-container')

drinksURL = 'http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/drinks';
ordersURL = 'http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/orders';
customersURL = 'http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/customers'


function ordersById(jsonOrders) {
    const orderIdObject = {};
    jsonOrders.results.forEach(order => orderIdObject[order.id] = order)
    return orderIdObject;
}
function customerById(jsonCustomers) {
    const customerIdObject = {};
    jsonCustomers.results.forEach(cust => customerIdObject[cust.id]=cust);
    return customerIdObject;
}
function drinksById(jsonDrinks) {
    const drinkIdObject = {};
    jsonDrinks.results.forEach(drink => drinkIdObject[cust.id]=drink);
    return drinkIdObject;
}

function buildOrdersArray(orders) {
    const orderArray=[];
    for (order in orders){
        orderArray.push(order);
    }
    return orderArray
}

function fillOrdersContainer(orders, ordersById, customersById) {
    // console.log(customersById['1'].email)
    orders.forEach(order => {
        // console.log(ordersById[order].customer_id)
        const li = document.createElement('li');
        li.classList.add('order');
        li.innerHTML = `Order: ${order} <br>${customersById[ordersById[order].customer_id].email}`;
        orderContainer.append(li);
    })
}


async function fetchMyData() {
    const fetchedDrinks = await fetch(drinksURL);
    const jsonifiedDrinks = await fetchedDrinks.json();
    const fetchedOrders = await fetch(ordersURL);
    const jsonifiedOrders = await fetchedOrders.json();
    const fetchedCustomers = await fetch(customersURL);
    const jsonifiedCustomers = await fetchedCustomers.json();
    // console.log(jsonifiedDrinks);
    const ordersByIdObject = ordersById(jsonifiedOrders);
    // console.log(ordersByIdObject)
    const drinksByIdObject = ordersById(jsonifiedDrinks);
    // console.log(drinksByIdObject)
    const customersByIdObject = customerById(jsonifiedCustomers);
    const OrdersArray = buildOrdersArray(ordersByIdObject)
    // console.log(OrdersArray)
    fillOrdersContainer(OrdersArray, ordersByIdObject, customersByIdObject);


    
}

fetchMyData()

