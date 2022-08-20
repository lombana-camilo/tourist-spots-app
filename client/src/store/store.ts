import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./api/authApiSlice";
import { reviewsApiSlice } from "./api/reviewsApiSlice";
import { spotsApiSlice } from "./api/spotsApiSlice";
import notificationsSlice from "./notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    notification: notificationsSlice,
    [spotsApiSlice.reducerPath]: spotsApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [reviewsApiSlice.reducerPath]: reviewsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(spotsApiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(reviewsApiSlice.middleware);
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
