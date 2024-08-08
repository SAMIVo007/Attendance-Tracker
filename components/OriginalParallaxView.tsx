import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
	headerImage: ReactElement;
	headerBackgroundColor: { dark: string; light: string };
}>;

export default function OriginalParallaxView({
	children,
	headerImage,
	headerBackgroundColor,
}: Props) {
	const colorScheme = useColorScheme() ?? "light";
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);

	const contentBG = useColorScheme() === "dark" ? "#000000" : "#e9e9e9";

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	return (
		<ThemedView style={[styles.container, { backgroundColor: contentBG }]}>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				ref={scrollRef}
				scrollEventThrottle={16}
			>
				<Animated.View
					style={[
						styles.header,
						{ backgroundColor: headerBackgroundColor[colorScheme] },
						headerAnimatedStyle,
					]}
				>
					{headerImage}
				</Animated.View>
				<ThemedView style={[styles.content, { backgroundColor: contentBG }]}>
					{children}
				</ThemedView>
			</Animated.ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 300,
		paddingTop: 80,
		overflow: "hidden",
	},
	content: {
		flex: 1,
		padding: 24,
		// paddingBottom: 200,
		gap: 16,
		overflow: "hidden",
	},
});
