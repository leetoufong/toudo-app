import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting Component', () => {
    test('renders with the provided name prop', () => {
        // 1. Render the component into the virtual DOM
        render(<Greeting name="Alex" />);

        // 2. Query for the text content
        const headingElement = screen.getByText('Hello, Alex!');

        // 3. Make an assertion
        expect(headingElement).toBeInTheDocument();
    });

    test('renders fallback when no name prop is given', () => {
        render(<Greeting />);
        const headingElement = screen.getByText('Hello, Guest!');
        expect(headingElement).toBeInTheDocument();
    });
});