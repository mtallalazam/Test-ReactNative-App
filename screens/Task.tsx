import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Text, View } from "../components/Themed";
import { RootTabScreenProps, taskType } from "../types";
import { selectIncompleteTaskList, selectCompletedTaskList } from "../store";
import { changeTaskStatus, saveTaskList } from "../store/taskSlice";

const tasks = [
	{
		id: 47,
		user_id: 5,
		title: "Hello",
		description: "Dnsnnssn",
		status: "inprogress",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T07:03:20.000000Z",
		updated_at: "2021-03-29T17:58:36.000000Z",
		deleted_at: null,
	},
	{
		id: 61,
		user_id: 5,
		title: "Nbg",
		description: "H",
		status: "completed",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T07:23:13.000000Z",
		updated_at: "2021-03-29T12:35:23.000000Z",
		deleted_at: null,
	},
	{
		id: 63,
		user_id: 5,
		title: "Po",
		description: "Hh",
		status: "completed",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T07:26:55.000000Z",
		updated_at: "2021-03-29T12:35:27.000000Z",
		deleted_at: null,
	},
	{
		id: 64,
		user_id: 5,
		title: "L",
		description: "J",
		status: "completed",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T07:27:18.000000Z",
		updated_at: "2021-03-29T17:57:59.000000Z",
		deleted_at: null,
	},
	{
		id: 66,
		user_id: 5,
		title: "G",
		description: "G",
		status: "inprogress",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T07:31:00.000000Z",
		updated_at: "2021-03-29T07:31:00.000000Z",
		deleted_at: null,
	},
	{
		id: 68,
		user_id: 5,
		title: "P",
		description: "N",
		status: "inprogress",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T07:37:01.000000Z",
		updated_at: "2021-03-29T07:37:01.000000Z",
		deleted_at: null,
	},
	{
		id: 69,
		user_id: 5,
		title: "J",
		description: "H",
		status: "inprogress",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T07:39:09.000000Z",
		updated_at: "2021-03-29T07:39:09.000000Z",
		deleted_at: null,
	},
	{
		id: 71,
		user_id: 5,
		title: "U",
		description: "U",
		status: "inprogress",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T07:44:27.000000Z",
		updated_at: "2021-03-29T07:44:27.000000Z",
		deleted_at: null,
	},
	{
		id: 74,
		user_id: 5,
		title: "Snxsjs",
		description: "Dhdus",
		status: "inprogress",
		due_at: "2020-08-22 04:15:30",
		created_at: "2021-03-29T09:18:00.000000Z",
		updated_at: "2021-03-29T09:18:00.000000Z",
		deleted_at: null,
	},
	{
		id: 90,
		user_id: 5,
		title: "New Task",
		description: "Some new task description",
		status: "inprogress",
		due_at: "2021-12-16 12:00:00",
		created_at: "2021-12-15T13:53:57.000000Z",
		updated_at: "2021-12-15T13:53:57.000000Z",
		deleted_at: null,
	},
	{
		id: 92,
		user_id: 5,
		title: "Another Task",
		description: "Another description",
		status: "inprogress",
		due_at: "2021-12-23 12:00:00",
		created_at: "2021-12-20T09:39:54.000000Z",
		updated_at: "2021-12-20T09:39:54.000000Z",
		deleted_at: null,
	},
	{
		id: 93,
		user_id: 5,
		title: "sdfsdfsdf",
		description: "sdfsdfsdfsdf",
		status: "inprogress",
		due_at: "2021-12-17 12:00:00",
		created_at: "2021-12-20T09:41:11.000000Z",
		updated_at: "2021-12-20T09:41:11.000000Z",
		deleted_at: null,
	},
	{
		id: 94,
		user_id: 5,
		title: "New Task 2",
		description: "Some description",
		status: "inprogress",
		due_at: "2021-12-22 12:00:00",
		created_at: "2021-12-20T10:04:42.000000Z",
		updated_at: "2021-12-20T10:04:42.000000Z",
		deleted_at: null,
	},
	{
		id: 95,
		user_id: 5,
		title: "New Task 2",
		description: "Some Description",
		status: "inprogress",
		due_at: "2021-12-22 12:00:00",
		created_at: "2021-12-20T10:07:42.000000Z",
		updated_at: "2021-12-20T10:07:42.000000Z",
		deleted_at: null,
	},
	{
		id: 96,
		user_id: 5,
		title: "New Task 3",
		description: "Some description",
		status: "inprogress",
		due_at: "2021-12-22 12:00:00",
		created_at: "2021-12-20T10:23:19.000000Z",
		updated_at: "2021-12-20T10:23:19.000000Z",
		deleted_at: null,
	},
];

export default function Task({ navigation }: RootTabScreenProps<"Task">) {
	const dispatch = useDispatch();
	//State
	const inprogressList = useSelector(selectIncompleteTaskList);
	const completedList = useSelector(selectCompletedTaskList);

	//Local State
	const [fetchingTasksStatus, toggleFetchingTasksStatus] = useState(true);
	const [changingTaskStatus, toggleChangingTaskStatus] = useState(false);

	//Methods
	const handleChangeTaskStatus = (payload: taskType) => {
		toggleChangingTaskStatus(true);
		dispatch(changeTaskStatus(payload));
		setTimeout(() => {
			toggleChangingTaskStatus(false);
		}, 1000);
	};

	//Life-cycle hooks
	useEffect(() => {
		toggleFetchingTasksStatus(true);
		setTimeout(() => {
			dispatch(saveTaskList(tasks));
			toggleFetchingTasksStatus(false);
		}, 1000);
	}, []);

	return (
		<View style={styles.container}>
			<Modal visible={changingTaskStatus || fetchingTasksStatus} transparent={true}>
				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#000", opacity: 0.7 }}
				>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			</Modal>

			<ScrollView
				style={{
					paddingHorizontal: 20,
				}}
			>
				<Text style={{ fontSize: 30, marginVertical: 36, paddingTop: 20, textAlign: "center" }} font={"600"}>
					Task
				</Text>

				<Text
					onPress={() => navigation.navigate("CreateTask")}
					style={{ color: "#575767", fontSize: 18, marginBottom: 15 }}
					font="700"
				>
					+ Add new task
				</Text>

				<Text style={{ color: "#575767", fontSize: 18, marginVertical: 15 }} font="700">
					Incomplete
				</Text>

				{inprogressList.map((item, index) => (
					<View key={item.id + "-" + index} style={styles.taskContainer}>
						<TouchableWithoutFeedback onPress={() => handleChangeTaskStatus(item)}>
							<View style={styles.checkBox}></View>
						</TouchableWithoutFeedback>

						<View style={{ marginLeft: 16 }}>
							<Text style={{ fontSize: 18 }} font="500">
								{item.title}
							</Text>
							<Text style={{ color: "#B9B9BE", fontSize: 14 }} font="600">
								⏰ {dayjs(item.due_at).fromNow()}
							</Text>
						</View>
					</View>
				))}

				<Text style={{ color: "#575767", fontSize: 18, marginVertical: 15 }} font="700">
					Completed
				</Text>

				{completedList.map((item, index) => (
					<View key={item.id + "-" + index} style={styles.taskContainer}>
						<TouchableWithoutFeedback onPress={() => handleChangeTaskStatus(item)}>
							<View style={styles.checkBox}>
								{item.status === "completed" && (
									<MaterialCommunityIcons
										name="check-bold"
										size={16}
										color="#575767"
										style={{ transform: [{ rotate: "350deg" }] }}
									/>
								)}
							</View>
						</TouchableWithoutFeedback>

						<View style={{ marginLeft: 16 }}>
							<Text style={{ color: "#B9B9BE", fontSize: 14 }} font="600">
								{item.title}
							</Text>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	checkBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 24,
		height: 24,
		borderColor: "#DADADA",
		borderRadius: 8,
		borderWidth: 2,
		backgroundColor: "#FCFCFC",
	},
	taskContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		paddingRight: 10,
		marginVertical: 12,
	},
});
