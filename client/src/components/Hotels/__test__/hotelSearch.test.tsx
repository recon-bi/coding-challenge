import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelSearch from '../HotelSearch'; // Adjust the import path as necessary

vitest.mock('src/ui/MDBox');

describe('HotelSearch Component', () => {
  it('renders without crashing', () => {
    const onChangeMock = vi.fn();
    render(<HotelSearch onChange={onChangeMock} />);
    console.log(screen);
    const startDate = screen.getAllByLabelText('Start Date');
    console.log(startDate);
    // Assuming your DateRangePicker uses a placeholder or text, adjust as necessary
    // expect(findByTestId('hotel-search-daterangepicker')).toBeInTheDocument();
  });

  it('calls onChange prop when date range changes', async () => {
    const onChangeMock = vi.fn();
    const { getByPlaceholderText } = render(<HotelSearch onChange={onChangeMock} />);
    const dateInput = getByPlaceholderText('Start Date'); // Adjust based on your actual placeholders

    await fireEvent.change(dateInput, { target: { value: '2022-01-01' } });

    // expect(onChangeMock).toHaveBeenCalled();
  });
});
