import { useState, useEffect } from "react";
import {
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { selectTaskList } from "../store";
import { changeTaskStatus, saveTaskList, saveNewTask } from "../store/taskSlice";
import { RootTabScreenProps, taskType } from "../types";

const windowHeight = Dimensions.get("window").height;

export default function CreateTask({ navigation }: RootTabScreenProps<"CreateTask">) {
	const dispatch = useDispatch();
	const tabBarHeight = useBottomTabBarHeight();
	//State
	const taskList = useSelector(selectTaskList);

	//Local State
	const [summary, changeSummary] = useState("");
	const [description, changeDescription] = useState("");
	const [dueDate, changeDueDate] = useState<Date | null>();
	const [showDatePicker, toggleShowDatePicker] = useState(false);
	const [processingCreateNewTask, toggleProcessingCreateNewTask] = useState(false);
	const [errors, changeErrorsList] = useState<string[]>([]);

	// Methods
	const handleErrors = (action: "add" | "remove", error: string) => {
		if (action === "add") {
			if (!errors.includes(error)) {
				let errorsList = errors;
				errorsList.push(error);
				changeErrorsList([...errorsList]);
			}
		} else {
			changeErrorsList((errorsList) => {
				let editedErrorsList = errorsList.filter((item) => item !== error);
				return editedErrorsList;
			});
		}
	};

	const handleChangeDueDate = (event: unknown) => {
		if (event.type && event.type === "dismissed") {
			toggleShowDatePicker(false);
			return;
		}
		console.log("handleChangeDueDate", event.nativeEvent);
		const selectedDate: Date = new Date(event.nativeEvent.timestamp);
		changeDueDate(selectedDate);
		toggleShowDatePicker(false);
	};

	const handleCreateNewTask = () => {
		if (!summary.length) {
			handleErrors("add", "emptySummary");
			return;
		} else {
			handleErrors("remove", "emptySummary");
		}
		if (!description.length) {
			handleErrors("add", "emptyDescription");
			return;
		} else {
			handleErrors("remove", "emptyDescription");
		}
		if (!dueDate) {
			handleErrors("add", "emptyDueDate");
			return;
		} else {
			handleErrors("remove", "emptyDueDate");
		}

		toggleProcessingCreateNewTask(true);

		const newTask = {
			id: `new-task-${taskList.length}`,
			title: summary,
			description: description,
			status: "inprogress",
			due_at: `${dueDate}`,
		};

		setTimeout(() => {
			dispatch(saveNewTask(newTask));
			toggleProcessingCreateNewTask(false);
			navigation.navigate("Task");
		}, 1000);
	};

	useEffect(() => {
		return () => {
			changeSummary("");
			changeDescription("");
			changeDueDate(null);
			toggleShowDatePicker(false);
		};
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{
						display: "flex",
						justifyContent: "space-between",
						paddingHorizontal: 20,
						paddingBottom: 25,
						minHeight: windowHeight - tabBarHeight,
					}}
				>
					<View>
						<Text style={{ fontSize: 30, marginVertical: 36, paddingTop: 20, textAlign: "center" }} font={"600"}>
							New Task
						</Text>

						<View style={styles.inputContainer}>
							<Ionicons
								name="chatbubble-ellipses-outline"
								style={{
									paddingVertical: 6,
								}}
								size={24}
								color="#575767"
							/>
							<TextInput
								style={styles.input}
								onChangeText={changeSummary}
								value={summary}
								placeholderTextColor={"#BDBDBD"}
								placeholder="Summary"
							/>
						</View>
						<View style={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
							{errors.includes("emptySummary") && (
								<View style={styles.errorContainer}>
									<MaterialIcons name="error-outline" size={20} color="red" />
									<Text style={styles.errorText}>Kindly enter a Summary!</Text>
								</View>
							)}
						</View>

						<View style={styles.inputContainer}>
							<Feather
								name="align-justify"
								style={{
									paddingVertical: 2,
								}}
								size={24}
								color="#575767"
							/>
							<TextInput
								style={styles.input}
								onChangeText={changeDescription}
								value={description}
								placeholderTextColor={"#BDBDBD"}
								placeholder="Description"
								multiline={true}
								numberOfLines={6}
								textAlignVertical="top"
							/>
						</View>
						<View style={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
							{errors.includes("emptyDescription") && (
								<View style={styles.errorContainer}>
									<MaterialIcons name="error-outline" size={20} color="red" />
									<Text style={styles.errorText}>Kindly enter a Description!</Text>
								</View>
							)}
						</View>

						<View style={[styles.inputContainer, { marginBottom: 30 }]}>
							<Feather
								name="clock"
								style={{
									paddingVertical: 4,
								}}
								size={24}
								color="#575767"
							/>
							<Text onPress={() => toggleShowDatePicker(true)} style={[styles.input, !dueDate && styles.placeholder]}>
								{dueDate ? dayjs(dueDate).format("DD/MM/YYYY") : "Due Date"}
							</Text>
							{showDatePicker && (
								<DateTimePicker
									testID="dateTimePicker"
									value={dueDate ? dueDate : new Date()}
									mode="date"
									is24Hour={true}
									minimumDate={new Date()}
									display="default"
									onChange={handleChangeDueDate}
								/>
							)}
						</View>
						<View style={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
							{errors.includes("emptyDueDate") && (
								<View style={styles.errorContainer}>
									<MaterialIcons name="error-outline" size={20} color="red" />
									<Text style={styles.errorText}>Kindly select a Date!</Text>
								</View>
							)}
						</View>
					</View>

					<View>
						<TouchableOpacity style={styles.loginBtnBox} onPress={handleCreateNewTask} activeOpacity={0.8}>
							{processingCreateNewTask ? (
								<ActivityIndicator size="large" color="#fff" />
							) : (
								<Text style={styles.loginBtnText} font={"600"}>
									Save
								</Text>
							)}
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inputContainer: {
		display: "flex",
		flexGrow: 0,
		flexDirection: "row",
		alignItems: "flex-start",
		paddingVertical: 30,
		borderBottomColor: "#BDBDBD",
		borderBottomWidth: 1,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#000",
		marginLeft: 10,
		fontWeight: "700",
		padding: 6,
	},
	placeholder: {
		color: "#BDBDBD",
	},
	loginBtnBox: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 50,
		backgroundColor: "#000",
		borderRadius: 50,
		marginVertical: 10,
	},
	loginBtnText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
	},
	errorContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 15,
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginLeft: 5,
	},
});
