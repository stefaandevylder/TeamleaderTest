import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

const NewOrderItemForm = (props) => {
    const productRef = useRef();
    const amountRef = useRef();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const product = props.products.find(p => p.id === productRef.current.value);
        const amount = parseInt(amountRef.current.value);

        if (amount && amount > 0) {
            const productTotal = product.price * amount;
            
            props.onAddOrderItem({
                "product-id": product.id,
                "quantity": amount,
                "unit-price": product.price,
                "total": `${productTotal}`
            });
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Form.Select aria-label="Default select example" ref={productRef}>
                {props.products ? props.products.map(product =>
                    <option key={product.id} value={product.id}>{product.description}</option>
                ) : ""}
            </Form.Select>
            <Form.Control type="number" placeholder="Aantal" ref={amountRef} />
            <Button className="mt-2" type="submit">Voeg product toe</Button>
        </form>
    );
};

export default NewOrderItemForm;