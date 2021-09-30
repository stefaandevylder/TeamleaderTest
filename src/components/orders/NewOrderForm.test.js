import { render, screen, fireEvent, act } from "@testing-library/react";
import NewOrderForm from "./NewOrderForm";

describe('NewOrderForm Test Suits', () => {
    test('Add new product and save the order', async () => {
        const addOrderHandler = jest.fn();
        await act( async() => render(<NewOrderForm onAddOrder={addOrderHandler}/>));

        const amountEl = screen.getByPlaceholderText("Aantal");
        const buttonEl = screen.getByText("Voeg product toe");

        fireEvent.change(amountEl, { target: { value: '1' } });
        fireEvent.click(buttonEl);

        const idEl = screen.getByPlaceholderText("Id");
        const customerIdEl = screen.getByPlaceholderText("Customer ID");
        const saveButtonEl = screen.getByText("Slaag order op");

        fireEvent.change(idEl, { target: { value: '4'}});
        fireEvent.change(customerIdEl, { target: { value: '1'}});
        fireEvent.click(saveButtonEl);

        expect(addOrderHandler.mock.calls.length).toBe(1);
    });
}); 