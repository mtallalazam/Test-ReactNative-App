import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import "react-native-gesture-handler";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store from "./store";
import Colors from "./constants/Colors";

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold,
	});

	if (!isLoadingComplete && !fontsLoaded) {
		return null;
	} else {
		return (
			<Provider store={store}>
				<SafeAreaProvider
					style={{
						backgroundColor: "#000",
					}}
				>
					<Navigation colorScheme={colorScheme} />
					<StatusBar backgroundColor={Colors[colorScheme].background} />
				</SafeAreaProvider>
			</Provider>
		);
	}
}
