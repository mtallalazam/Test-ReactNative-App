const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
	light: {
		text: "#000",
		background: "#fff",
		tint: tintColorLight,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorLight,
		bottomBar: {
			color: "#828282",
			activeColor: "#000",
			background: "#FAFAFA",
			divider: "#BDC5CD",
			customBtn: {
				background: "#000",
				color: "#fff",
			},
		},
	},
	dark: {
		text: "#fff",
		background: "#262626",
		tint: tintColorDark,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorDark,
		bottomBar: {
			color: "#828282",
			activeColor: "#fff",
			background: "#000",
			divider: "#4b4b4b",
			customBtn: {
				background: "#fff",
				color: "#000",
			},
		},
	},
};
