import { render, screen } from '@testing-library/react';
import Register from '../pages/register';
import '@testing-library/jest-dom';

describe('Register tests', () => {
    test('renders correctly', () => {
        render(<Register/>);
        const heading = screen.getByRole('heading', {
            name: /Online Workout Tracker/i,
        });
        const workoutButton = screen.getByRole('button', {
            name: /Register/i,
        });
        const username = screen.getByText('Username');
        const password = screen.getByText('Password');
        const Reenter = screen.getByText('Re-enter Password');
        expect(heading).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(Reenter).toBeInTheDocument();
        expect(workoutButton).toBeInTheDocument();
    });
});