import { useState, useEffect } from 'react';
import GetProducts from "../services/ProductService";
import { GetOrderById } from "../services/OrderService";
import { GetCustomer } from "../services/CustomerService";

const useOrder = (orderId) => {
    const [isLoading, setLoading] = useState(true);
    const [reRender, setReRender] = useState(false);

    const [order, setOrder] = useState({});
    const [customer, setCustomer] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true);

        GetOrderById(orderId).then((o) => {
            setOrder(o);

            GetCustomer(o["customer-id"]).then((customer) => {
                setCustomer(customer)
            })

            GetProducts().then((products) => {
                setProducts(products);

                setLoading(false);
            });
        });
    }, [orderId, reRender])

    const toggleReRender = () => {
        setReRender(!reRender);
    };

    return [isLoading, order, customer, products, toggleReRender];
}

export default useOrder;