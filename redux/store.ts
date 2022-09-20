import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { mambaApi } from "./api/mambaApi";
import loginCredentialsSlice from "./slices/loginCredentialsSlice";

export const store = configureStore({
    reducer: {
        loginCredentials: loginCredentialsSlice,
        [mambaApi.reducerPath]: mambaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mambaApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
