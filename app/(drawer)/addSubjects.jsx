import {
	useColorScheme,
	View,
	Image,
	Platform,
	StyleSheet,
} from "react-native";
import { AndroidButton } from "../../components/AndroidButton";
import { addSubject, getSubjects } from "../../database/database";
import OriginalParallaxView from "../../components/OriginalParallaxView";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import { Collapsible } from "../../components/Collapsible";
import { ExternalLink } from "../../components/ExternalLink";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const SubjectView = ({ subject }) => {
	return (
		<ThemedView>
			<ThemedText>{subject.name}</ThemedText>
		</ThemedView>
	);
};

const handleAddSubject = async () => {
	await addSubject("UEC715", "IoT");
};

export default function AddSubjects() {
	const navigation = useNavigation();
	return (
		<>
			<OriginalParallaxView
				headerBackgroundColor={{ light: "#e9e9e9", dark: "#000000" }}
				headerImage={
					<View className="flex-1 p-7 mt-8 items-center">
						<Ionicons
							size={400}
							name="book-outline"
							style={{
								color: "#80808044",
								bottom: -120,
								right: -40,
								position: "absolute",
							}}
						/>
						<View className="flex-1 w-full border-white justify-between">
							<View className="items-center mb-12">
								<ThemedText type="title" className="pt-2">
									Add Subjects
								</ThemedText>
								<ThemedText
									type="small"
									className="pt-2"
									style={{ fontSize: 14, color: "#888888" }}
								>
									0 Subjects
								</ThemedText>
							</View>

							<View className="flex-row items-center justify-between">
								<AndroidButton
									style={{ marginLeft: -8 }}
									onPress={() => navigation.goBack()}
								>
									<Ionicons
										name="chevron-back"
										size={26}
										color={useColorScheme() === "dark" ? "white" : "black"}
									/>
								</AndroidButton>
								<AndroidButton onPress={() => navigation.openDrawer()}>
									<AntDesign
										name="menu-unfold"
										size={22}
										color={useColorScheme() === "dark" ? "white" : "black"}
									/>
								</AndroidButton>
							</View>
						</View>
					</View>
				}
			>
				<ThemedText type="defaultSemiBold">Semester 7</ThemedText>

				<Collapsible title="Quantum Computing" className="p-4 rounded-lg">
					<ThemedText
						type="small"
						style={{ color: useColorScheme() === "dark" ? "#858585" : "#5f5f5f" }}
					>
						SUBJECT CODE: {}
					</ThemedText>
					<ThemedText
						type="small"
						style={{ color: useColorScheme() === "dark" ? "#858585" : "#5f5f5f" }}
					>
						SESSIONS: {}
					</ThemedText>
					<ThemedText
						type="small"
						style={{ color: useColorScheme() === "dark" ? "#858585" : "#5f5f5f" }}
					>
						FACULTY: {}
					</ThemedText>
				</Collapsible>
			</OriginalParallaxView>

			<AndroidButton
				style={{
					position: "absolute",
					right: 35,
					bottom: 32,
					backgroundColor: "#2a2a2a",
				}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});
