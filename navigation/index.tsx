/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, TouchableOpacity, View, GestureResponderEvent } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Inter_700Bold } from "@expo-google-fonts/inter";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import CreateTask from "../screens/CreateTask";
import Task from "../screens/Task";
import Login from "../screens/Login";
import Location from "../screens/Location";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { selectAuthStatus } from "../store";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	const authStatus = useSelector(selectAuthStatus);
	const colorScheme = useColorScheme();

	return (
		<Stack.Navigator>
			{!authStatus ? (
				<Stack.Screen
					name="Login"
					component={Login}
					options={{
						headerShown: false,
					}}
				/>
			) : (
				<>
					<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
					<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
					<Stack.Group screenOptions={{ presentation: "modal" }}>
						<Stack.Screen name="Modal" component={ModalScreen} />
					</Stack.Group>
				</>
			)}
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Task"
			screenOptions={{
				tabBarStyle: {
					height: 83,
					borderTopColor: Colors[colorScheme].bottomBar.color,
				},
				tabBarIconStyle: {},
				tabBarLabelStyle: {
					marginTop: -20,
					marginBottom: 20,
					fontSize: 10,
					fontFamily: "Inter_700Bold",
				},
				tabBarLabelPosition: "below-icon",
				tabBarActiveTintColor: Colors[colorScheme].bottomBar.activeColor,
				tabBarInactiveTintColor: Colors[colorScheme].bottomBar.color,
			}}
		>
			<BottomTab.Screen
				name="Task"
				component={Task}
				options={({ navigation }: RootTabScreenProps<"Task">) => ({
					headerShown: false,
					title: "Task",
					tabBarLabel: "Task",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-text-outline" size={22} color={color} />,
				})}
			/>
			<BottomTab.Screen
				name="CreateTask"
				component={CreateTask}
				options={({ navigation }: RootTabScreenProps<"CreateTask">) => ({
					headerShown: false,
					title: "CreateTask",
					tabBarLabel: () => null,
					tabBarIcon: ({ color }) => (
						<AntDesign name="plus" size={24} color={Colors[colorScheme].bottomBar.customBtn.color} />
					),
					tabBarButton: (props) => <CreateTaskButton {...props} />,
				})}
			/>
			<BottomTab.Screen
				name="Location"
				component={Location}
				options={{
					headerShown: false,
					title: "Location",
					tabBarLabel: "Location",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map-marker-outline" size={24} color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome5>["name"]; color: string }) {
	return <FontAwesome5 size={22} style={{ marginBottom: -1 }} {...props} />;
}

function CreateTaskButton(props: {
	children: React.ReactNode;
	onPress: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void) | undefined;
}) {
	const colorScheme = useColorScheme();

	return (
		<TouchableOpacity
			style={{
				top: -8,
				justifyContent: "center",
				alignItems: "center",
			}}
			onPress={props.onPress}
			activeOpacity={0.6}
		>
			<View
				style={{
					width: 56,
					height: 56,
					borderRadius: 35,
					backgroundColor: Colors[colorScheme].bottomBar.customBtn.background,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 5 },
					shadowOpacity: 0.25,
					shadowRadius: 5,
					elevation: 3,
				}}
			>
				{props.children}
			</View>
		</TouchableOpacity>
	);
}
