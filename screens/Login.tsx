import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	Platform,
	KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { changeAuthStatus } from "../store/authSlice";

export default function Login({ navigation }: RootStackScreenProps<"Login">) {
	//Hooks
	const dispatch = useDispatch();
	// const { authStatus } = useSelector(selectAuthStatus);

	//Local State
	const [email, onChangeEmail] = useState("");
	const [password, onChangePassword] = useState("");
	const [showPassword, toggleShowPassword] = useState(false);
	const [processingLogin, toggleProcessingLogin] = useState(false);
	const [errors, changeErrorsList] = useState<string[]>([]);

	//Methods
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

	const handleLogin = () => {
		if (!email.length) {
			handleErrors("add", "emptyEmail");
			return;
		} else {
			handleErrors("remove", "emptyEmail");
		}
		if (!email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/)) {
			handleErrors("add", "wrongEmail");
			return;
		} else {
			handleErrors("remove", "wrongEmail");
		}
		if (!password.length) {
			handleErrors("add", "emptyPassword");
			return;
		} else {
			handleErrors("remove", "emptyPassword");
		}

		toggleProcessingLogin(true);

		setTimeout(() => {
			toggleProcessingLogin(false);
			dispatch(changeAuthStatus(true));
		}, 3000);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
			<View style={styles.container}>
				<Text style={{ fontSize: 30, marginVertical: 36 }} font={"600"}>
					Log In
				</Text>

				<TextInput
					style={[styles.inputText, styles.inputBox, { width: "100%", height: 50 }]}
					placeholder="Email"
					onChangeText={onChangeEmail}
					keyboardType="email-address"
					value={email}
					autoCapitalize="none"
				/>
				<View style={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
					{errors.includes("emptyEmail") && (
						<View style={styles.errorContainer}>
							<MaterialIcons name="error-outline" size={20} color="red" />
							<Text style={styles.errorText}>Kindly enter an Email!</Text>
						</View>
					)}
					{errors.includes("wrongEmail") && !errors.includes("emptyEmail") && (
						<View style={styles.errorContainer}>
							<MaterialIcons name="error-outline" size={20} color="red" />
							<Text style={styles.errorText}>Kindly enter correct Email!</Text>
						</View>
					)}
				</View>

				<View style={[styles.inputBox, styles.inputContainer]}>
					<TextInput
						style={[styles.inputText, { flexGrow: 1 }]}
						onChangeText={onChangePassword}
						value={password}
						placeholder="Password"
						secureTextEntry={!showPassword}
						autoCapitalize="none"
					/>
					<Text onPress={() => toggleShowPassword(!showPassword)} style={styles.passwordVisibilityBtn} font={"500"}>
						{showPassword ? "Hide" : "Show"}
					</Text>
				</View>

				<View style={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
					{errors.includes("emptyPassword") && (
						<View style={styles.errorContainer}>
							<MaterialIcons name="error-outline" size={20} color="red" />
							<Text style={styles.errorText}>Kindly enter a Password!</Text>
						</View>
					)}
				</View>

				<View style={{ marginTop: "auto", width: "100%", backgroundColor: "transparent" }}>
					<TouchableOpacity style={styles.loginBtnBox} onPress={handleLogin} activeOpacity={0.8}>
						{processingLogin ? (
							<ActivityIndicator size="large" color="#fff" />
						) : (
							<Text style={styles.loginBtnText} font={"600"}>
								Log In
							</Text>
						)}
					</TouchableOpacity>

					<Text style={styles.forgotBtnText} font={"600"}>
						Forgot your password?
					</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	inputText: {
		fontSize: 16,
		fontWeight: "700",
	},
	inputBox: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginBottom: 10,
		borderRadius: 8,
		borderWidth: 1,
		backgroundColor: "#F6F6F6",
		borderColor: "#E8E8E8",
	},
	inputContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		height: 50,
	},
	passwordVisibilityBtn: {
		fontSize: 16,
		color: "black",
		flexGrow: 0,
	},
	loginBtnBox: {
		width: "100%",
		height: 50,
		backgroundColor: "#000",
		borderRadius: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	loginBtnText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
	},
	forgotBtnText: {
		color: "#000",
		textAlign: "center",
		fontSize: 16,
		marginTop: 16,
	},
	errorContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginLeft: 5,
	},
});
