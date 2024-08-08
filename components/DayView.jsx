import {
	FlatList,
	Pressable,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import * as Haptics from "expo-haptics";
import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const Lecture = ({ name }) => {
	const colorScheme = useColorScheme() === "dark" ? "white" : "black";

	return (
		<View className="w-full mb-1 rounded-lg overflow-hidden">
			<Pressable
				onLongPress={() => {
					Haptics.selectionAsync();
				}}
				android_ripple={{ color: "#6d6d6d" }}
				className="bg-[#323232] p-[8] "
			>
				<Text className="text-start" style={{ color: colorScheme }}>
					{name}
				</Text>
			</Pressable>
		</View>
	);
};

const Lab = () => (
	<View className="w-full mb-1 rounded-lg overflow-hidden">
		<Pressable
			onLongPress={() => {
				Haptics.selectionAsync();
			}}
			android_ripple={{ color: "#6d6d6d" }}
			className="bg-[#323232] p-5 py-[2.6rem] "
		></Pressable>
	</View>
);

export function DayView({}) {
	const [time, setTime] = useState(0);

	useEffect(() => {
		const startTime = new Date();
		startTime.setHours(8, 0, 0, 0);

		const totalMinutes = 440;

		const updateTime = () => {
			const now = new Date();
			now.setHours(now.getHours() + 5, now.getMinutes() + 30, 0, 0);
			const elapsedMinutes = (now - startTime) / 30000;
			const newTime = Math.min(Math.max(elapsedMinutes, 0), totalMinutes);
			setTime(newTime);
			console.log(now);
		};

		const intervalId = setInterval(updateTime, 600000);

		updateTime();

		return () => clearInterval(intervalId);
	}, []);

	return (
		<View className="flex-1 flex-row justify-start items-start pt-1">
			<View className="flex-col mr-2 justify-between items-center">
				<ThemedText type="small" className="pb-2">
					8:00
				</ThemedText>
				<ThemedText type="small" className="py-2">
					8:50
				</ThemedText>
				<ThemedText type="small" className="py-3">
					9:40
				</ThemedText>
				<ThemedText type="small" className="py-3">
					10:30
				</ThemedText>
				<ThemedText type="small" className="py-2.5">
					11:20
				</ThemedText>
				<ThemedText type="small" className="py-3">
					12:10
				</ThemedText>
				<ThemedText type="small" className="py-2.5">
					1:00
				</ThemedText>
				<ThemedText type="small" className="py-3">
					1:50
				</ThemedText>
				<ThemedText type="small" className="py-2.5">
					2:40
				</ThemedText>
				<ThemedText type="small" className="py-3">
					3:30
				</ThemedText>
				<ThemedText type="small" className="py-2.5">
					4:20
				</ThemedText>
				<ThemedText type="small" className="py-2.5">
					5:10
				</ThemedText>
				<ThemedText type="small" className="pt-2">
					6:00
				</ThemedText>
			</View>

			<View className="flex-1 flex-row ">
				<FontAwesome6
					name="caret-right"
					size={20}
					color="#c00000"
					className="mr-[-2] z-10"
					style={{ paddingTop: time }}
				/>
				<View className="flex-1 flex-col pt-1 justify-between items-center">
					<Lecture name="dad" />
					<Lecture />
					<Lecture />
					<Lecture />
					<Lecture />
					<Lecture />
					<Lecture />
					<Lecture />
					<Lecture />
					<Lecture />
					<Lecture />
					<Lecture />
				</View>
			</View>
		</View>
	);
}
