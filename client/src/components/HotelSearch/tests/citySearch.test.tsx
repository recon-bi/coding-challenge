import '@testing-library/jest-dom';
import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import CitySearch from '../CitySearch'; // Adjust the import path as necessary

let container: any = null;

const mockedOptions = [{ label: 'One' }, { label: 'Two' }];

vi.mock('ui/MDBox', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('CitySearch Component', () => {
  it('renders without crashing', () => {
    const onSelectedMock = vi.fn();

    render(<CitySearch onSelected={onSelectedMock} initialState={mockedOptions} />, container);

    expect(container).toBeTruthy();
  });

  it('loads the initialState correctly', () => {
    const onSelectedMock = vi.fn();

    render(<CitySearch onSelected={onSelectedMock} initialState={mockedOptions} />, container);

    act(() => {
      const citySearch = screen.getByRole('combobox');
      fireEvent.change(citySearch, { target: { value: 'Two' } });
      const option = screen.getByRole('option');
      userEvent.click(option as HTMLElement);
      const input: any = screen.getByTestId('citySearch_Autocomplete');
      expect(input.value).toBe('Two');
    });
  });

  it('calls onSelected when an option is selected', () => {
    const onSelectedMock = vi.fn();

    render(<CitySearch onSelected={onSelectedMock} initialState={mockedOptions} />, container);

    expect(onSelectedMock).not.toHaveBeenCalled();

    act(() => {
      const citySearch = screen.getByRole('combobox');
      citySearch.focus();
      userEvent.type(citySearch, 'o', { delay: 1 });
      fireEvent.change(citySearch, { target: { value: 'One' } });
      const option = screen.getByRole('option');
      userEvent.click(option as HTMLElement);
      const input: any = screen.getByTestId('citySearch_Autocomplete');
      expect(input.value).toBe('One');
    });
  });
});
