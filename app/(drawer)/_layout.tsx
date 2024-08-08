import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Pressable, Text, View } from "react-native";
import { AndroidButton } from "@/components/AndroidButton";
import { router } from "expo-router";
import CustomDrawer from "@/components/CustomDrawer";

export default function Layout() {
	const colorScheme = useColorScheme();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				drawerContent={CustomDrawer}
				screenOptions={{
					drawerActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
					drawerType: "slide",
					drawerPosition: "right",
					drawerLabelStyle: {
						marginLeft: -16,
						fontSize: 17,
						paddingTop: 4,
					},
					drawerStyle: { paddingTop: 4, width: "73%" },
				}}
			>
				<Drawer.Screen
					name="(tabs)"
					options={{
						drawerLabel: "Home",
						drawerIcon: ({ color, focused, size }) => (
							<TabBarIcon
								name={focused ? "home" : "home-outline"}
								color={color}
								size={size}
								style={{ marginLeft: 8, marginBottom: 1 }}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="addSubjects"
					options={{
						// headerShown: true,
						// headerLeft: () => (
						// 	<AndroidButton
						// 		style={{ marginLeft: 2, marginRight: -10 }}
						// 		onPress={() => router.back()}
						// 	>
						// 		<Ionicons
						// 			name="chevron-back"
						// 			size={26}
						// 			color={useColorScheme() === "dark" ? "white" : "black"}
						// 		/>
						// 	</AndroidButton>
						// ),
						drawerLabel: "Add Subjects",
						headerTitle: "Add Subjects",
						drawerIcon: ({ color, focused, size }) => (
							<MaterialCommunityIcons
								name={focused ? "book-plus-multiple" : "book-plus-multiple-outline"}
								size={size}
								color={color}
								style={{ marginLeft: 8, marginBottom: 1 }}
							/>
						),
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
