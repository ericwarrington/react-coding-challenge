import { TypedUseSelectorHook, useDispatch as rUseDispatch, useSelector as rUseSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = rUseDispatch;
export const select: TypedUseSelectorHook<RootState> = rUseSelector;
