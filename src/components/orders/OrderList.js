import { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import GetOrders from "../../services/OrderService";
import OrderCard from "./OrderCard";
import NewOrderForm from "./NewOrderForm";
import { AddOrder } from '../../services/OrderService';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        GetOrders().then((o) => {
            setOrders(o);
        });
    }, [])

    const addOrderHandler = (order) => {
        AddOrder(order);
        setOrders(previous => ([...previous])); // Since orders is a dependency of useEffect, just need to call useEffect again
    };

    return (
        <Fragment>
            <Row className="mt-2 mb-2">
                <h1>De order lijst</h1>
            </Row>
            <Row>
                {orders.map(order => <OrderCard key={order.id + Math.random()} order={order} />)}
            </Row>
            <Row>
                <Col md={6}>
                    <NewOrderForm onAddOrder={addOrderHandler} />
                </Col>
            </Row>
        </Fragment>
    );
};

export default OrderList;