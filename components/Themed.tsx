/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
	const theme = useColorScheme();
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

const fontsList = {
	"400": "Inter_400Regular",
	"500": "Inter_500Medium",
	"600": "Inter_600SemiBold",
	"700": "Inter_700Bold",
	"800": "Inter_800ExtraBold",
};

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"] & { font?: "400" | "500" | "600" | "700" | "800" };
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, font = "400", ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return <DefaultText style={[{ color }, style, { fontFamily: fontsList[font] }]} {...otherProps} />;
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
