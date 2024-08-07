import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersAPI from "../apis/usersAPI";
import vouchersAPI from "../apis/couponsAPI";
import reservationsAPI from "../apis/reservationsAPI";
import cartSlice from "../features/cart/CartSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [vouchersAPI.reducerPath]: vouchersAPI.reducer,
  [reservationsAPI.reducerPath]: reservationsAPI.reducer,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(
      usersAPI.middleware,
      vouchersAPI.middleware,
      reservationsAPI.middleware
    ),
});

export const persistor = persistStore(store);

// !Set up listeners for RTK Query
setupListeners(store.dispatch);

//! Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
