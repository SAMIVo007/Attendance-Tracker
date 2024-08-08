// import { useState } from "react";
// import { Image, KeyboardAvoidingView, Text } from "react-native";
// import {
// 	Actionsheet,
// 	ActionsheetBackdrop,
// 	ActionsheetContent,
// 	ActionsheetDragIndicator,
// 	ActionsheetDragIndicatorWrapper,
// 	ActionsheetItem,
// 	ActionsheetItemText,
// 	ActionsheetIcon,
// } from "@/components/ui/actionsheet";
// import {
// 	Button,
// 	ButtonText,
// 	ButtonSpinner,
// 	ButtonIcon,
// 	ButtonGroup,
// } from "@/components/ui/button";
// import { Icon, SearchIcon } from "@/components/ui/icon";
// import {
// 	FormControl,
// 	FormControlLabel,
// 	FormControlLabelText,
// } from "@/components/ui/form-control";
// import { Box } from "@/components/ui/box";
// import { HStack } from "@/components/ui/hstack";
// import { VStack } from "@/components/ui/vstack";
// import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

// export default function ActionSheet({ handleClose , state:boolean}) {
// 	const [showActionsheet, setShowActionsheet] = useState(true);
// 	const handleClose = () => setShowActionsheet(false);
// 	return (
// 		<>
// 			<Actionsheet
// 				isOpen={showActionsheet}
// 				onClose={handleClose}
// 				// snapPoints={[36]}
// 			>
// 				<KeyboardAvoidingView
// 					behavior="position"
// 					style={{
// 						position: "relative",
// 						flex: 1,
// 						justifyContent: "flex-end",
// 					}}
// 				>
// 					<ActionsheetBackdrop />
// 					<ActionsheetContent className="">
// 						<ActionsheetDragIndicatorWrapper>
// 							<ActionsheetDragIndicator />
// 						</ActionsheetDragIndicatorWrapper>
// 						<VStack className="w-full pt-5">
// 							<HStack space="md" className="justify-center items-center">
// 								<Box className="w-[50px] h-full px-2 border border-solid border-outline-300 rounded-sm">
// 									<Image
// 										source={{ uri: "https://i.imgur.com/UwTLr26.png" }}
// 										resizeMode="contain"
// 										className="flex-1"
// 									/>
// 								</Box>
// 								<VStack className="flex-1">
// 									<Text className="font-bold">Mastercard</Text>
// 									<Text>Card ending in 2345</Text>
// 								</VStack>
// 							</HStack>
// 							<FormControl className="mt-9">
// 								<FormControlLabel>
// 									<FormControlLabelText>Confirm security code</FormControlLabelText>
// 								</FormControlLabel>
// 								<Input className="w-full">
// 									<InputSlot>
// 										<InputIcon as={SearchIcon} className="ml-2" />
// 									</InputSlot>
// 									<InputField placeholder="CVC/CVV" />
// 								</Input>
// 								<Button onPress={handleClose} className="mt-3">
// 									<ButtonText className="flex-1">Pay $1000</ButtonText>
// 								</Button>
// 							</FormControl>
// 						</VStack>
// 					</ActionsheetContent>
// 				</KeyboardAvoidingView>
// 			</Actionsheet>
// 		</>
// 	);
// }
