import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme, View } from "react-native";

export function AndroidButton({
	onPress,
	children = (
		<Ionicons
			name="add"
			size={28}
			color={useColorScheme() === "dark" ? "white" : "black"}
		/>
	),
	style,
	rippleColor = "#6d6d6d",
}) {
	return (
		<View className="rounded-full overflow-hidden" style={style}>
			<Pressable
				className="p-4"
				android_ripple={{ color: rippleColor }}
				onPress={onPress}
			>
				{children}
			</Pressable>
		</View>
	);
}
