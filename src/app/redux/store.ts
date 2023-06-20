import { configureStore } from "@reduxjs/toolkit";

// import { reducer } from "./slices/character";

export const store = configureStore(
{
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(subclassDataSlice.middleware),
	reducer:
	{
		// characters: reducer,
		// [subclassDataSlice.reducerPath]: subclassDataSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
