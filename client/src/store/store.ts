import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/spotsApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
   middleware: (getDefaultMiddleware)=>{
      return getDefaultMiddleware().concat(apiSlice.middleware)
   }
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
