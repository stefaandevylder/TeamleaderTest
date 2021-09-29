import { render, screen, fireEvent, act } from "@testing-library/react";
import NewOrderItemForm from "./NewOrderForm";

const mockProduct = {
    "id": "A101",
    "description": "Screwdriver",
    "category": "1",
    "price": "9.75"
};

describe('NewOrderItemForm Test Suits', () => {
    test('Add new product and adds it to the list', async () => {
        const addOrderItemHandler = jest.fn();
        await act( async() => render(<NewOrderItemForm products={[mockProduct]} onAddOrderItem={addOrderItemHandler}/>));

        const amountEl = screen.getByPlaceholderText("Aantal");
        const buttonEl = screen.getByText("Voeg product toe");

        fireEvent.change(amountEl, { target: { value: '1' } });
        fireEvent.click(buttonEl);
        
        const listItems = await screen.findAllByRole('listitem');

        expect(listItems).toHaveLength(1);
    })
}); 