import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import letterReducer from '../features/LetterSlice';
import parcelReducer from '../features/ParcelSlice';
import depotReducer from '../features/DepotSlice';
import driverReducer from '../features/DriverSlice' 
export const store = configureStore({
  reducer: {
    letter: letterReducer,
    parcel: parcelReducer,
    depot: depotReducer,
    driver: driverReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
