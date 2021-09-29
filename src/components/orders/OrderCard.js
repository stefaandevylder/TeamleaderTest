import { useState, useEffect } from 'react';
import { Card, Button, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { GetCustomer } from "../../services/CustomerService";
import GetProducts from '../../services/ProductService';
import { Link } from "react-router-dom";

const OrderCard = (props) => {
    const order = props.order;
    const [customer, setCustomer] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GetCustomer(order["customer-id"]).then((customer) => {
            setCustomer(customer)
        })

        GetProducts().then((products) => {
            const productIdsInOrder = order.items.map((product) => product["product-id"]);
            setProducts(products.filter(product => productIdsInOrder.includes(product.id)))
        });
    }, [order]);

    return (
        <Col md={3}>
            <Card>
                <Card.Header>
                    <Card.Title className="text-center">#{order.id} {customer.name}</Card.Title>
                </Card.Header>
                <ListGroup className="list-group-flush">
                    {products.map(product => {
                        return <ListGroupItem key={product.id}>
                            {product.description}
                        </ListGroupItem>
                    })}
                </ListGroup>
                <Card.Footer>
                    <p>Totaal: {order.total} euro</p>
                    <Link to={`/orders/${order.id}`} className="d-grid">
                        <Button variant="primary">Open</Button>
                    </Link>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default OrderCard;