import { configureStore } from "@reduxjs/toolkit";
import { albumSlice } from "./slices/x-data";

export const store = configureStore(
{
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(albumSlice.middleware),
	reducer:
	{
		// characters: reducer,
		[albumSlice.reducerPath]: albumSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
