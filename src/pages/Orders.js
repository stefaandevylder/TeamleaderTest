import { BrowserRouter as Switch, Route, useRouteMatch } from "react-router-dom";
import OrderDetails from "../components/orders/OrderDetails"
import OrderList from "../components/orders/OrderList";

const Orders = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:orderId`} exact>
                <OrderDetails />
            </Route>
            <Route path={`${match.path}/`} exact>
                <OrderList />
            </Route>
        </Switch>
    );
};

export default Orders;