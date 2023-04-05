import { configureStore } from "@reduxjs/toolkit";
import fileType from "./itemsSlice";
import registerStatus from "./registerSlice";
import loggedInSlice from "./userLoginInfo";
import cart from "./cartSlice";
import { createWrapper } from "next-redux-wrapper";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const persistFilters = persistReducer(persistConfig, fileType);
const persistUserRegister = persistReducer(persistConfig, registerStatus);
const persistUserDetails = persistReducer(persistConfig, loggedInSlice);
const persistCart = persistReducer(persistConfig, cart);

export const store = configureStore({
  reducer: {
    fileType,
    registerStatus: persistUserRegister,
    loggedInSlice: persistUserDetails,
    cart: persistCart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export const wrapper = createWrapper<AppStore>(makeStore);
