import {
	Image,
	StyleSheet,
	Platform,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	useColorScheme,
	Pressable,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import CircularProgress from "react-native-circular-progress-indicator";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCallback, useEffect, useState } from "react";
import { DayView } from "@/components/DayView";
// import { init, addSubject } from "@/database/database";
import { router, useNavigation } from "expo-router";
import { AndroidButton } from "@/components/AndroidButton";

export default function HomeScreen() {
	const navigation = useNavigation();

	const props = {
		activeStrokeWidth: 30,
		inActiveStrokeWidth: 30,
		inActiveStrokeOpacity: 0.2,
		duration: 2000,
	};

	// const [subject_name, setSubjectName] = useState("");
	// const [subject_id, setSubjectId] = useState("");

	const [lecturesHeld, setlecturesHeld] = useState(8);
	const [present, setPresent] = useState(4);
	const [score, setScore] = useState(1.15);
	const [totalSubjects, setTotalSubjects] = useState(4);
	const [totalLectures, setTotalLectures] = useState(50);

	return (
		<SafeAreaView edges={["top"]} style={{ flex: 1 }}>
			<ParallaxScrollView
				headerBackgroundColor={{ light: "#e9e9e9", dark: "#000000" }}
				headerImage={
					<View className="p-7 mt-8 ">
						<View className="mb-4 flex-row justify-between items-start">
							<View>
								<ThemedText
									type="small"
									className="pb-2"
									style={{ fontSize: 14, color: "#888888" }}
								>
									WEDNESDAY, JUL 31
								</ThemedText>

								<ThemedText type="title">Summary</ThemedText>
							</View>

							<AndroidButton onPress={() => navigation.openDrawer()}>
								<AntDesign
									name="menu-unfold"
									size={24}
									color={useColorScheme() === "dark" ? "white" : "black"}
								/>
							</AndroidButton>
							
						</View>

						<ThemedView className="flex-row justify-between rounded-2xl p-7">
							<View>
								<ThemedText>Total Held</ThemedText>
								<Text className="text-4xl text-[#fa113b] mt-[-4] mb-1">
									{lecturesHeld}
								</Text>
								<ThemedText>Present</ThemedText>
								<Text className="text-4xl text-[#a6ff00] mt-[-4] mb-1">{present}</Text>
								<ThemedText>Score</ThemedText>
								<Text className="text-4xl text-[#00fff6] mt-[-4] items-center justify-center">
									{score}
									<Text className="text-[1.2rem]">/{totalSubjects}</Text>
								</Text>
							</View>

							<CircularProgressBase
								{...props}
								maxValue={totalLectures}
								value={lecturesHeld}
								radius={94.5}
								activeStrokeColor={"#fa113b"}
								inActiveStrokeColor={"#fa113cff"}
							>
								<CircularProgressBase
									{...props}
									maxValue={totalLectures}
									value={present}
									radius={70.4}
									activeStrokeColor={"#a6ff00"}
									inActiveStrokeColor={"#a6ff00"}
								>
									<CircularProgressBase
										{...props}
										maxValue={totalSubjects}
										value={score}
										radius={47.5}
										activeStrokeColor={"#00fff6"}
										inActiveStrokeColor={"#00fff6"}
									>
										{/* <View className="flex-row items-end pt-2 justify-center ">
									<ThemedText style={{ paddingTop: 2, color: "#a6ff00" }} type="title">
										3
									</ThemedText>`
									<ThemedText style={{ paddingTop: 0, color: "#a6ff00" }} type="link">
										/4
									</ThemedText>
								</View>
								<ThemedText style={{ marginTop: -8, color: "#a6ff00", fontSize: 12 }}>
									score
								</ThemedText> */}
									</CircularProgressBase>
								</CircularProgressBase>
							</CircularProgressBase>
						</ThemedView>
					</View>
				}
			>
				<AntDesign
					name="minus"
					size={30}
					color="#a4a4a4"
					style={{ alignSelf: "center" }}
				/>
				<ThemedText type="subtitle" style={{ marginTop: -8 }}>
					Today
				</ThemedText>
				{/* <HelloWave /> */}
				<ThemedView className="flex-row justify-between rounded-2xl p-6">
					<DayView />
				</ThemedView>

				<ThemedView style={styles.stepContainer}>
					<ThemedText type="subtitle">Step 1: Try it</ThemedText>
					<ThemedText>
						Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
						to see changes. Press{" "}
						<ThemedText type="defaultSemiBold">
							{Platform.select({ ios: "cmd + d", android: "cmd + m" })}
						</ThemedText>{" "}
						to open developer tools.
					</ThemedText>
				</ThemedView>
				<ThemedView style={styles.stepContainer}>
					<ThemedText type="subtitle">Step 2: Explore</ThemedText>
					<ThemedText>
						Tap the Explore tab to learn more about what's included in this starter
						app.
					</ThemedText>
				</ThemedView>
				<ThemedView style={styles.stepContainer}>
					<ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
					<ThemedText>
						When you're ready, run{" "}
						<ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to
						get a fresh <ThemedText type="defaultSemiBold">app</ThemedText> directory.
						This will move the current{" "}
						<ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
						<ThemedText type="defaultSemiBold">app-example</ThemedText>.
					</ThemedText>
				</ThemedView>
			</ParallaxScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
