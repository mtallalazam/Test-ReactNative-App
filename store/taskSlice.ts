import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskType } from "../types";

interface TaskSliceState {
	taskList: taskType[];
}

const initialState: TaskSliceState = {
	taskList: [],
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		saveTaskList: (state, action: PayloadAction<taskType[]>) => {
			state.taskList = action.payload;
		},
		changeTaskStatus: (state, action: PayloadAction<taskType>) => {
			const taskIndex = state.taskList.findIndex((item) => item.id === action.payload.id);
			let editedTask = state.taskList[taskIndex];
			editedTask.status = editedTask.status === "inprogress" ? "completed" : "inprogress";
			let editedList = JSON.parse(JSON.stringify(state.taskList));
			editedList[taskIndex] = editedTask;
			state.taskList = editedList;
		},
		saveNewTask: (state, action: PayloadAction<taskType>) => {
			state.taskList = [...state.taskList, action.payload];
		},
	},
});

export const { saveTaskList, changeTaskStatus, saveNewTask } = taskSlice.actions;

export default taskSlice.reducer;
