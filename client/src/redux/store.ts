import { configureStore } from '@reduxjs/toolkit';
import { bookingsReducer as bookings } from './bookings.redux';
import { gridReducer as grid } from './grid.redux';
import { hotelsReducer as hotels } from './hotels.redux';
import { popupReducer as popup } from './popup.redux';
import { userReducer as users } from './users.redux';

export const store = configureStore({
  reducer: {
    bookings,
    hotels,
    grid,
    popup,
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
