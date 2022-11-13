import { render, screen } from '@testing-library/react';
import Homepage from '../pages/homepage';
import '@testing-library/jest-dom';

describe('Homepage tests', () => {
    test('renders correctly', () => {
        render(<Homepage/>);
        const heading = screen.getByRole('heading', {
            name: /Workout Calendar/i,
        });
        const workoutButton = screen.getByRole('button', {
            name: /Create Workout/i,
        });
        const calendar = screen.getByRole('table', {
            name: /Month View/i,
        });
        expect(heading).toBeInTheDocument();
        expect(workoutButton).toBeInTheDocument();
        expect(calendar).toBeInTheDocument();
    });
});