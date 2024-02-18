import '@testing-library/jest-dom';
import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { ReactNode } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import DateRangeSearch from '../../HotelSearch/DateRangeSearch'; // Adjust the import path as necessary

let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('DateRangeSearch Component', () => {
  it('renders without crashing', () => {
    const onChangeMock = vi.fn();

    act(() => {
      render(<DateRangeSearch onChange={onChangeMock} />, container);
    });

    expect(container).toBeTruthy();
  });

  it('calls onChange prop with the correct params when start date changes', () => {
    const onChangeMock = vi.fn();

    render(<DateRangeSearch onChange={onChangeMock} />, container);

    expect(onChangeMock).not.toHaveBeenCalled();

    const startDateInput = screen.getByTestId('DateRangeSearch_dateRangePickerStart');
    userEvent.type(startDateInput, '01/01/2020', { delay: 1 });
    fireEvent.change(startDateInput, { target: { value: '01/01/2020' } });

    expect(onChangeMock).toHaveBeenCalledWith({
      startDate: '2020-01-01T00:00:00.000Z',
      endDate: null,
    });
  });

  it('calls onChange prop with the correct params when end date changes', () => {
    const onChangeMock = vi.fn();

    render(<DateRangeSearch onChange={onChangeMock} />, container);

    expect(onChangeMock).not.toHaveBeenCalled();

    const endDateInput = screen.getByTestId('DateRangeSearch_dateRangePickerEnd');
    userEvent.type(endDateInput, '01/01/2020', { delay: 1 });
    fireEvent.change(endDateInput, { target: { value: '01/01/2020' } });

    expect(onChangeMock).toHaveBeenCalledWith({
      endDate: '2020-01-01T00:00:00.000Z',
      startDate: null,
    });
  });
});
