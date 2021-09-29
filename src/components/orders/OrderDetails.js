import useOrder from "../../hooks/useOrder"
import { useParams } from "react-router";
import { Row, Col } from "react-bootstrap"
import NewOrderItemForm from './NewOrderItemForm'
import { UpdateOrderById } from "../../services/OrderService";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [isLoading, order, customer, products, toggleReRender] = useOrder(orderId);

    const deleteProductHandler = (product) => {
        order.items.splice(order.items.indexOf(product), 1);
        order.total = `${parseFloat(order.total) - parseFloat(product.total)}`

        UpdateOrderById(orderId, order).then(() => {
            toggleReRender();
        });
    };

    const addOrderItemHandler = (orderItem) => {
        order.items.push(orderItem);
        order.total = `${parseFloat(order.total) + parseFloat(orderItem.total)}`

        UpdateOrderById(order.id, order).then(() => {
            toggleReRender();
        });
    };

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <Row>
            <Col>
                <h2>Bestelling nummer {order.id}</h2>
                <p>Klant: {customer.name}</p>
                <p>Producten in bestelling:</p>
                <ul>
                    {order.items.map((item) =>
                        <li key={item["product-id"] + Math.random()}>
                            {products.find(p => p.id === item["product-id"]).description}
                            <br />Aantal: {item["quantity"]} - Prijs per unit: {item["unit-price"]} - Totaal: {item["total"]}
                            <br /><small onClick={() => { deleteProductHandler(item) }}>(Verwijder)</small>
                        </li>
                    )}
                </ul>
                <p>Totaal: {order.total}</p>
            </Col>
            <Col>
                <h3>Voeg product toe</h3>
                <NewOrderItemForm products={products} onAddOrderItem={addOrderItemHandler} />
            </Col>
        </Row>
    );
};

export default OrderDetails;