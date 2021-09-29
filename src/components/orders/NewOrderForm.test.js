import { render, screen, fireEvent, act } from "@testing-library/react";
import NewOrderForm from "./NewOrderForm";

describe('NewOrderForm Test Suits', () => {
    test('Add new product and adds it to the list', async () => {
        const addOrderHandler = jest.fn();
        await act( async() => render(<NewOrderForm onAddOrder={addOrderHandler}/>));

        const amountEl = screen.getByPlaceholderText("Aantal");
        const buttonEl = screen.getByText("Voeg product toe");

        fireEvent.change(amountEl, { target: { value: '1' } });
        fireEvent.click(buttonEl);
        
        const listItems = await screen.findAllByRole('listitem');

        expect(listItems).toHaveLength(1);
    });

    
}); 