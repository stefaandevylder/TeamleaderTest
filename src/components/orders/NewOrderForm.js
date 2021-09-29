import { Fragment, useRef, useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import GetProducts from '../../services/ProductService'
import NewOrderItemForm from './NewOrderItemForm';

const NewOrderForm = (props) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [products, setProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    const idRef = useRef();
    const customerIdRef = useRef();

    useEffect(() => {
        GetProducts().then((p) => {
            setProducts(p);
        });
    }, []);

    const addOrderItemHandler = (orderItem) => {
        setOrderItems(previous => ([...previous, orderItem]))
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const id = idRef.current.value;
        const customerId = customerIdRef.current.value;

        if (!id) return setError("Geen id ingegeven.");
        if (!customerId) return setError("Geen customer id ingegeven.");
        if (orderItems.length === 0) return setError("Geen order items ingegeven.")

        props.onAddOrder({
            "id": id,
            "customer-id": customerId,
            "items": orderItems,
            "total": orderItems.map(o => o.total).reduce((total, item) => total + item)
        });

        setError(null);
        setSuccess("Order succesvol ingegeven!");
    };

    return (
        <Fragment>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <h3>Voeg order toe</h3>
            <p>Producten in order:</p>
            <ul>
                {orderItems.map(product => (
                    <li key={product["product-id"] + Math.random()}>Id: {product["product-id"]}, aantal: {product["quantity"]}</li>
                ))}
            </ul>
            <NewOrderItemForm products={products} onAddOrderItem={addOrderItemHandler} />
            <form onSubmit={onSubmitHandler}>
                <Form.Control type="text" placeholder="Id" ref={idRef} />
                <Form.Control type="text" placeholder="Customer ID" ref={customerIdRef} />
                <Button className="mt-2" type="submit">Slaag order op</Button>
            </form>
        </Fragment>
    );
};

export default NewOrderForm;