import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SnackBarDocument {
  snackBarOpen: boolean;
  snackBarType: "success" | "error" | "info" | "warning"
  snackBarMessage: string;
}

const initialState: SnackBarDocument = {
  snackBarOpen: false,
  snackBarType: "success",
  snackBarMessage: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setSnackBar: (state, action: PayloadAction<SnackBarDocument>) => {
      const { snackBarOpen, snackBarType, snackBarMessage } = action.payload;
      state.snackBarOpen = snackBarOpen
      state.snackBarType = snackBarType;
      state.snackBarMessage = snackBarMessage;
    },
  },
});

export const {setSnackBar} = notificationSlice.actions
export default notificationSlice.reducer
