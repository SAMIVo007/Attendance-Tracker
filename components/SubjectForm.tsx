import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	View,
	Text,
	useColorScheme,
	TextInput,
	Pressable,
	TouchableOpacity,
} from "react-native";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { ThemedText } from "./ThemedText";
import { AndroidButton } from "./AndroidButton";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	sub_name: Yup.string().required("*Subject Name is required"),
	sub_code: Yup.string().required("*Subject Code is required"),
	slots: Yup.array().of(
		Yup.object().shape({
			day: Yup.string()
				.notOneOf(["Select Day *"], "*Day is required")
				.required("*Day is required"),
			type: Yup.string()
				.notOneOf(["Session Type *"], "*Session Type is required")
				.required("*Session Type is required"),
			timeSlot: Yup.string()
				.notOneOf(["Choose Time Slot *"], "*Time Slot is required")
				.required("*Time Slot is required"),
			room: Yup.string().optional(),
			faculty: Yup.string().optional(),
		})
	),
});

interface Props {
	closeSheet: () => void;
}
type Ref = BottomSheet;

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const sessionTypes = ["Lecture", "Tutorial", "Lab"];

const lectureSlots = [
	"8:00 AM - 8:50 AM",
	"8:50 AM - 9:40 AM",
	"9:40 AM - 10:30 AM",
	"10:30 AM - 11:20 AM",
	"11:20 AM - 12:10 PM",
	"12:10 PM - 1:00 PM",
	"1:00 PM - 1:50 PM",
	"1:50 PM - 2:40 PM",
	"2:40 PM - 3:30 PM",
	"3:30 PM - 4:20 PM",
	"4:20 PM - 5:10 PM",
	"5:10 PM - 6:00 PM",
];

const labSlots = [
	"8:00 AM - 9:40 AM",
	"9:40 AM - 11:20 AM",
	"11:20 AM - 1:00 PM",
	"1:50 PM - 3:30 PM",
	"3:30 PM - 5:10 PM",
];

const SubjectForm = forwardRef<Ref, Props>((props, ref) => {
	const snapPoints = useMemo(() => ["66%", "85%"], []);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log("BottomSheet:", index);
	}, []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
		),
		[]
	);

	const colors = {
		foreground: useColorScheme() === "dark" ? "#999999" : "#5f5f5f",
		background: useColorScheme() === "dark" ? "#2a2a2a" : "#a7a7a7",
		text: useColorScheme() === "dark" ? "#ffffff" : "#000000",
		button: useColorScheme() === "dark" ? "#4a4a4a" : "#5f5f5f",
		textInputBG: useColorScheme() === "dark" ? "#3a3a3a" : "#a7a7a7",
	};

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{
				sub_name: "",
				sub_code: "",
				slots: [
					{
						day: "Select Day *",
						type: "Session Type *",
						timeSlot: "Choose Time Slot *",
						room: "",
						faculty: "",
					},
				],
			}}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{({
				handleChange,
				handleSubmit,
				setFieldValue,
				resetForm,
				values,
				touched,
				errors,
			}) => (
				<BottomSheet
					snapPoints={snapPoints}
					index={0}
					ref={ref}
					onChange={handleSheetChanges}
					enableOverDrag={false}
					enablePanDownToClose={true}
					backdropComponent={renderBackdrop}
					handleIndicatorStyle={{
						backgroundColor: colors.foreground,
					}}
					backgroundStyle={{
						backgroundColor: colors.background,
					}}
					style={{
						overflow: "hidden",
						borderTopRightRadius: 20,
						borderTopLeftRadius: 20,
					}}
				>
					<BottomSheetScrollView
						showsVerticalScrollIndicator={false}
						style={{
							flex: 1,
							padding: 24,
						}}
					>
						<ThemedText type="subtitle" className="p-1 pb-3">
							Subject Details
						</ThemedText>

						<View className="flex-1 mb-2">
							<TextInput
								style={{
									borderColor: colors.foreground,
									color: colors.text,
									backgroundColor: colors.textInputBG,
								}}
								className="p-2.5 pl-4 border rounded-lg"
								placeholder="Subject Name *"
								placeholderTextColor={colors.foreground}
								value={values.sub_name}
								onChangeText={handleChange("sub_name")}
							/>
							{touched.sub_name && errors.sub_name ? (
								<Text className="text-[#ff2424] text-sm p-1">{errors.sub_name}</Text>
							) : null}
						</View>

						<View className="flex-1 mb-3">
							<TextInput
								style={{
									borderColor: colors.foreground,
									color: colors.text,
									backgroundColor: colors.textInputBG,
								}}
								className="p-2.5 pl-4 border rounded-lg"
								placeholder="Subject Code *"
								placeholderTextColor={colors.foreground}
								value={values.sub_code}
								onChangeText={handleChange("sub_code")}
							/>
							{touched.sub_code && errors.sub_code ? (
								<Text className="text-[#ff2424] text-sm p-1">{errors.sub_code}</Text>
							) : null}
						</View>

						<View className="flex-row items-center justify-between mt-3">
							<ThemedText type="subtitle" className="p-1">
								Timetable Slots
							</ThemedText>

							<AndroidButton
								style={{}}
								onPress={() => {
									const newSlot = {
										day: "Select Day *",
										type: "Session Type *",
										timeSlot: "Choose Time Slot *",
										room: "",
										faculty: "",
									};
									setFieldValue("slots", [...values.slots, newSlot]);
								}}
							>
								<View
									style={{
										alignItems: "center",
										justifyContent: "center",
										flexDirection: "row",
									}}
								>
									<Ionicons name="add" size={20} color={colors.text} />
									<ThemedText type="small" className="pl-1">
										Add New
									</ThemedText>
								</View>
							</AndroidButton>
						</View>

						{values.slots.map((_, index) => (
							<TimetableSlots
								key={index}
								slot={values.slots[index]}
								index={index}
								handleFormikChanges={handleChange}
								RemoveSlot={() =>
									setFieldValue(
										"slots",
										values.slots.filter((_, i) => i !== index)
									)
								}
								touched={touched}
								errors={errors}
							/>
						))}

						<View className="flex-row mb-16 mt-2">
							<AndroidButton
								style={{
									flex: 1,
									borderWidth: 1,
									borderColor: colors.foreground,
									margin: 8,
								}}
								onPress={() => {
									resetForm();
									props.closeSheet();
								}}
							>
								<ThemedText style={{ color: "#e3e3e3" }} className="text-center">
									Cancel
								</ThemedText>
							</AndroidButton>
							<AndroidButton
								style={{
									flex: 1,
									borderWidth: 1,
									borderColor: colors.foreground,
									backgroundColor: colors.button,
									margin: 8,
								}}
								onPress={handleSubmit}
							>
								<ThemedText style={{ color: "#e3e3e3" }} className="text-center">
									Save
								</ThemedText>
							</AndroidButton>
						</View>
					</BottomSheetScrollView>
				</BottomSheet>
			)}
		</Formik>
	);
});

export default SubjectForm;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface TimetableSlotsProps {
	slot: {
		day: string;
		type: string;
		timeSlot: string;
		room: string;
		faculty: string;
	};
	RemoveSlot: any;
	index: number;
	handleFormikChanges: any;
	touched: any;
	errors: any;
}

const TimetableSlots: React.FC<TimetableSlotsProps> = ({
	slot,
	index,
	handleFormikChanges,
	RemoveSlot,
	touched,
	errors,
}) => {
	// Define open and close functions for each picker
	function open(pickerRef: React.RefObject<Picker<string>>) {
		pickerRef.current?.focus();
	}
	function close(pickerRef: React.RefObject<Picker<string>>) {
		pickerRef.current?.blur();
	}

	// Separate states and refs for each picker
	const [selectedDay, setSelectedDay] = useState<string>(slot.day);
	const pickerRef1 = useRef<Picker<string>>(null);

	const [sessionType, setSessionType] = useState<string>(slot.type);
	const pickerRef2 = useRef<Picker<string>>(null);

	const [timeSlot, setTimeSlot] = useState<string>(slot.timeSlot);
	const pickerRef3 = useRef<Picker<string>>(null);

	const [roomNumber, setRoomNumber] = useState<string>(slot.room);
	const [facultyName, setFacultyName] = useState<string>(slot.faculty);

	const [timeslotType, setTimeslotType] = useState<Array<string>>(lectureSlots);

	const colors = {
		foreground: useColorScheme() === "dark" ? "#999999" : "#5f5f5f",
		background: useColorScheme() === "dark" ? "#2a2a2a" : "#a7a7a7",
		text: useColorScheme() === "dark" ? "#ffffff" : "#000000",
		button: useColorScheme() === "dark" ? "#4a4a4a" : "#5f5f5f",
		textInputBG: useColorScheme() === "dark" ? "#3a3a3a" : "#a7a7a7",
	};

	useEffect(() => {
		setSelectedDay(slot.day);
		setSessionType(slot.type);
		setTimeSlot(slot.timeSlot);
		setRoomNumber(slot.room);
		setFacultyName(slot.faculty);
	}, [slot.day, slot.type, slot.timeSlot, slot.room, slot.faculty]);

	return (
		<View
			style={{
				borderColor: colors.foreground,
			}}
			className="flex-1 mb-3 p-1"
		>
			{index !== 0 && (
				<View className="flex-row justify-between items-center">
					<ThemedText className="py-2" type="small">
						New Slot {index}
					</ThemedText>
					<TouchableOpacity onPress={RemoveSlot} className="flex-row">
						<Ionicons name="close" size={20} color={"#cd0000cf"} />
						<ThemedText style={{ color: "#cd0000cf" }} type="small">
							Remove
						</ThemedText>
					</TouchableOpacity>
				</View>
			)}

			<View className="flex-row mb-1 justify-between items-center">
				{/* First Picker */}
				<View className="flex-1">
					<View className="flex-row flex-1 mr-1 items-center">
						<View
							className="flex-1 border rounded-lg overflow-hidden"
							style={{
								borderColor: colors.foreground,
								backgroundColor: colors.textInputBG,
							}}
						>
							<Pressable
								className="p-4"
								android_ripple={{ color: "#6d6d6d" }}
								onPress={() => open(pickerRef1)}
							>
								<Text style={{ color: colors.text }}>{selectedDay}</Text>
							</Pressable>
						</View>
						<Picker
							mode="dropdown"
							ref={pickerRef1}
							selectedValue={selectedDay}
							onValueChange={(itemValue) => {
								setSelectedDay(itemValue);
								handleFormikChanges(`slots[${index}].day`)(itemValue);
							}}
							dropdownIconColor={colors.foreground}
						>
							{weekdays.map((day) => (
								<Picker.Item
									key={day}
									label={day}
									value={day}
									style={{
										color: colors.text,
										backgroundColor: colors.background,
										width: "100%",
									}}
								/>
							))}
						</Picker>
					</View>
					{touched.slots?.[index]?.day && errors.slots?.[index]?.day ? (
						<Text className="text-[#ff2424] text-sm">{errors.slots[index].day}</Text>
					) : null}
				</View>

				{/* Second Picker */}
				<View className="flex-1">
					<View className="flex-row flex-1 ml-1 items-center">
						<View
							className="flex-1 border rounded-lg overflow-hidden"
							style={{
								borderColor: colors.foreground,
								backgroundColor: colors.textInputBG,
							}}
						>
							<Pressable
								className="p-4"
								android_ripple={{ color: "#6d6d6d" }}
								onPress={() => open(pickerRef2)}
							>
								<Text style={{ color: colors.text }}>{sessionType}</Text>
							</Pressable>
						</View>
						<Picker
							mode="dropdown"
							ref={pickerRef2}
							selectedValue={sessionType}
							onValueChange={(itemValue) => {
								setSessionType(itemValue);
								handleFormikChanges(`slots[${index}].type`)(itemValue);
								if (itemValue === "Lab") {
									setTimeslotType(labSlots);
								} else {
									setTimeslotType(lectureSlots);
								}
							}}
							dropdownIconColor={colors.foreground}
						>
							{sessionTypes.map((type) => (
								<Picker.Item
									key={type}
									label={type}
									value={type}
									style={{
										color: colors.text,
										backgroundColor: colors.background,
									}}
								/>
							))}
						</Picker>
					</View>
					{touched.slots?.[index]?.type && errors.slots?.[index]?.type ? (
						<Text className="text-[#ff2424] text-sm pl-1">{errors.slots[index].type}</Text>
					) : null}
				</View>
			</View>

			{/* Third Picker */}
			<View className="flex-1">
				<View
					className="flex-1 flex-row overflow-hidden items-center rounded-lg"
					style={{ borderColor: colors.foreground }}
				>
					<View
						className="flex-1 border rounded-lg overflow-hidden"
						style={{
							borderColor: colors.foreground,
							backgroundColor: colors.textInputBG,
						}}
					>
						<Pressable
							className="p-4"
							android_ripple={{ color: "#6d6d6d" }}
							onPress={() => open(pickerRef3)}
						>
							<Text style={{ color: colors.text }}>{timeSlot}</Text>
						</Pressable>
					</View>

					<Picker
						mode="dropdown"
						ref={pickerRef3}
						selectedValue={timeSlot}
						onValueChange={(itemValue) => {
							setTimeSlot(itemValue);
							handleFormikChanges(`slots[${index}].timeSlot`)(itemValue);
						}}
						dropdownIconColor={colors.foreground}
					>
						{timeslotType.map((slot) => (
							<Picker.Item
								key={slot}
								label={slot}
								value={slot}
								style={{
									color: colors.text,
									backgroundColor: colors.background,
								}}
							/>
						))}
					</Picker>
				</View>
				{touched.slots?.[index]?.timeSlot && errors.slots?.[index]?.timeSlot ? (
					<Text className="text-[#ff2424] text-sm">{errors.slots[index].timeSlot}</Text>
				) : null}
			</View>

			<TextInput
				style={{
					borderColor: colors.foreground,
					color: colors.text,
					backgroundColor: colors.textInputBG,
				}}
				className="p-2.5 pl-4 mt-1.5 border rounded-lg"
				placeholder="Room Number..."
				placeholderTextColor={colors.foreground}
				value={roomNumber}
				onChangeText={(itemValue) => {
					setRoomNumber(itemValue);
					handleFormikChanges(`slots[${index}].room`)(itemValue);
				}}
			/>

			<TextInput
				style={{
					borderColor: colors.foreground,
					color: colors.text,
					backgroundColor: colors.textInputBG,
				}}
				className="p-2.5 pl-4 mt-2 border rounded-lg"
				placeholder="Faculty Name..."
				placeholderTextColor={colors.foreground}
				value={facultyName}
				onChangeText={(itemValue) => {
					setFacultyName(itemValue);
					handleFormikChanges(`slots[${index}].faculty`)(itemValue);
				}}
			/>
		</View>
	);
};
