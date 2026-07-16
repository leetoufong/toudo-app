import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from './AddTodo';

describe('AddTodo Component', () => {
    it('should submit the form with the entered username', async () => {
        // 1. Create a mock submission function using Jest or Vitest
        const mockOnSubmit = jest.fn();

        // 2. Render the component
        render(<AddTodo onSubmit={mockOnSubmit} />);

        // 3. Find the input field and submit button by their accessible roles
        const inputField = screen.getByRole('textbox', { name: /username/i });
        const submitButton = screen.getByRole('button', { name: /submit/i });

        // 4. Simulate user typing into the input field
        await userEvent.type(inputField, 'john_doe');

        // 5. Simulate clicking the submit button
        await userEvent.click(submitButton);

        // 6. Assert that the onSubmit function was called exactly once
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);

        // 7. Assert that the onSubmit function was called with the correct data
        expect(mockOnSubmit).toHaveBeenCalledWith({ username: 'john_doe' });
    });
});
