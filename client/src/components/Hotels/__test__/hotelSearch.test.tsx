import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelSearch from '../HotelSearch'; // Adjust the import path as necessary

describe('HotelSearch Component', () => {
  it('renders without crashing', () => {
    const onChangeMock = vi.fn();
    const { getByText } = render(<HotelSearch onChange={onChangeMock} />);

    // Assuming your DateRangePicker uses a placeholder or text, adjust as necessary
    expect(getByText('Date Range')).toBeInTheDocument();
  });

  it('calls onChange prop when date range changes', async () => {
    const onChangeMock = vi.fn();
    const { getByPlaceholderText } = render(<HotelSearch onChange={onChangeMock} />);
    const dateInput = getByPlaceholderText('Start Date'); // Adjust based on your actual placeholders

    await fireEvent.change(dateInput, { target: { value: '2022-01-01' } });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
