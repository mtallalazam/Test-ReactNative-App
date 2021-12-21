import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		task: taskReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

export const selectAuthStatus = (state: RootState) => state.auth.authStatus;
export const selectTaskList = (state: RootState) => state.task.taskList;
export const selectIncompleteTaskList = (state: RootState) =>
	state.task.taskList.filter((item) => item.status === "inprogress");
export const selectCompletedTaskList = (state: RootState) =>
	state.task.taskList.filter((item) => item.status === "completed");

export default store;
