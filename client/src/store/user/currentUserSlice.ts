import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionData {
  _id: string | null;
  email: string | null;
  username: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  sessionId: string | null;
  iat: number | null;
  exp: number | null;
}
interface SessionState {
  session: SessionData;
}

const initialState: SessionState = {
  session: {
    _id: null,
    email: null,
    username: null,
    createdAt: null,
    updatedAt: null,
    sessionId: null,
    iat: null,
    exp: null,
  },
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    getCurrentSession: (state, action: PayloadAction<SessionState>) => {
      state.session = action.payload.session;
    },
  },
});

export const {getCurrentSession} = currentUserSlice.actions
export default currentUserSlice.reducer
