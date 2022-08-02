import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./api/authApiSlice";
import { spotsApiSlice } from "./api/spotsApiSlice";

const store = configureStore({
  reducer: {
    [spotsApiSlice.reducerPath]: spotsApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(spotsApiSlice.middleware)
      .concat(authApiSlice.middleware);
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
