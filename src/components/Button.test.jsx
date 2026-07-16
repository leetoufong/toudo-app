import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Button from './Button';

test('renders button with text', async () => {
    render(<Button>Click me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();

    await userEvent.click(buttonElement);

    expect(buttonElement).toHaveTextContent('Clicke me');
});
