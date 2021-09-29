const DUMMY_ORDERS = [{
  "id": "1",
  "customer-id": "1",
  "items": [
    {
      "product-id": "B102",
      "quantity": "10",
      "unit-price": "4.99",
      "total": "49.90"
    }
  ],
  "total": "49.90"
},
{
  "id": "2",
  "customer-id": "2",
  "items": [
    {
      "product-id": "B102",
      "quantity": "5",
      "unit-price": "4.99",
      "total": "24.95"
    }
  ],
  "total": "24.95"
},
{
  "id": "3",
  "customer-id": "3",
  "items": [
    {
      "product-id": "A101",
      "quantity": "2",
      "unit-price": "9.75",
      "total": "19.50"
    },
    {
      "product-id": "A102",
      "quantity": "1",
      "unit-price": "49.50",
      "total": "49.50"
    }
  ],
  "total": "69.00"
}];

const GetOrders = async () => {
  return DUMMY_ORDERS;
};

export const AddOrder = async (order) => {
  DUMMY_ORDERS.push(order);
  return order;
};

export const GetOrderById = async (orderId) => {
  return DUMMY_ORDERS.find(order => order.id === orderId);
};

export const UpdateOrderById = async (orderId, newOrder) => {
  const orderToUpdate = GetOrderById(orderId);
  DUMMY_ORDERS[DUMMY_ORDERS.indexOf(orderToUpdate)] = newOrder;
  return newOrder;
};

export const DeleteOrderById = async (orderId) => {
  const orderToDelete = GetOrderById(orderId);
  DUMMY_ORDERS.splice(DUMMY_ORDERS.indexOf(orderToDelete), 1);
  return orderToDelete;
};

export default GetOrders;