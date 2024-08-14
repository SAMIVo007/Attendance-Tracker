import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";
import { init, addSubject } from "@/database/database";

import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	const [dbInitialized, setDBInitialized] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await init();
			} catch (e) {
				console.warn(e);
			} finally {
				setDBInitialized(true);

				if (dbInitialized && loaded) {
					console.log("Database initialized");
					await SplashScreen.hideAsync();
				}
			}
		}
		prepare();
	}, [dbInitialized, loaded]);

	if (!dbInitialized) {
		return null;
	}

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="(drawer)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</ThemeProvider>
	);
}
