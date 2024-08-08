import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer";
import {
	View,
	Text,
	Image,
	useColorScheme,
	TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AndroidButton } from "./AndroidButton";

export default function CustomDrawer(props) {
	const colorScheme = useColorScheme();

	return (
		<View className="flex-1">
			<DrawerContentScrollView {...props}>
				<View
					style={{ borderBottomWidth: 2, borderBottomColor: "#4b4b4b" }}
					className="m-4 p-2 pb-4 justify-start items-start"
				>
					{/* <ThemedText type="default" >
						Welcome,
					</ThemedText> */}
					<View className="w-full flex-row justify-between items-start">
						<Image
							source={{
								uri: "https://phantom-marca.unidadeditorial.es/c894a9fe33544116c51a881cd6819819/resize/828/f/jpg/assets/multimedia/imagenes/2023/05/27/16852166698636.jpg",
							}}
							style={{
								width: 100,
								height: 100,
								borderRadius: 50,
								borderWidth: 2,
								borderColor: "#4b4b4b",
							}}
						/>
						<TouchableOpacity hitSlop={20} onPress={() => console.log("pressed")}>
							<MaterialCommunityIcons
								name="dots-vertical"
								size={24}
								color={colorScheme === "dark" ? "#ffffff" : "#000000"}
							/>
						</TouchableOpacity>
					</View>
					<ThemedText type="title" className="mt-3">
						Yuvraj Singh
					</ThemedText>
				</View>
				<DrawerItemList {...props} />
				{/* <DrawerItem label={"logout"} /> */}
			</DrawerContentScrollView>
		</View>
	);
}
