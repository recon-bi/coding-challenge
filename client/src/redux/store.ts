import { configureStore } from '@reduxjs/toolkit';
import { bookingsReducer as bookings } from './bookings.redux'; 
import { hotelsReducer as hotels } from './hotels.redux';
import { gridReducer as grid } from './grid.redux';
import { popupReducer as popup } from './popup.redux';
import { userReducer as users } from './users.redux';
import { customerReducer as customers } from './customers.redux';
import { propertiesReducer as properties } from './properties.redux';
import { quoteReducer as quotes } from './quotes.redux';
import { pdfReducer as pdfs } from './pdfs.redux';

export const store = configureStore({
  reducer: {
    bookings,
    hotels,
    customers,
    grid,
    pdfs,
    popup,
    properties,
    quotes,
    users,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
