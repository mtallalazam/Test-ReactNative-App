import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSliceState {
	authStatus: boolean;
}

const initialState: AuthSliceState = {
	authStatus: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		changeAuthStatus: (state, action: PayloadAction<boolean>) => {
			state.authStatus = action.payload;
		},
	},
});

export const { changeAuthStatus } = authSlice.actions;

export default authSlice.reducer;
