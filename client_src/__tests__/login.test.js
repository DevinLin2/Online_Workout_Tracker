import { render, screen } from '@testing-library/react';
import Login from '../pages/login';
import '@testing-library/jest-dom';

describe('Login tests', () => {
    test('renders correctly', () => {
        render(<Login/>);
        const heading = screen.getByRole('heading', {
            name: /Online Workout Tracker/i,
        });
        const workoutButton = screen.getByRole('button', {
            name: /Login/i,
        });
        const username = screen.getByText('Username');
        const password = screen.getByText('Password');

        expect(heading).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(workoutButton).toBeInTheDocument();
    });
});