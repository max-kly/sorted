import { styles } from "@/styles/styles";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View, Button, TextInput, useColorScheme, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/tasksSlice";

export default function Create() {
    const dispatch = useDispatch<AppDispatch>();
    const mode = useColorScheme()
    const navigation = useNavigation()
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title='Create' color={mode === 'dark' ? '#FFF' : '#000'} onPress={() => {
                    if (taskTitle === '') {
                        Alert.alert('Title is missing', 'Task title is required.')
                        return
                    }
                    dispatch(addTask({ title: taskTitle, description: taskDescription ? taskDescription : null }))
                    navigation.goBack()
                }} />
            ),
        })
    }, [navigation, taskTitle, taskDescription, mode])
    if (mode === 'dark') {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerDark}>
                    <TextInput multiline style={styles.titleDark} onChangeText={(text) => setTaskTitle(text)}
                        placeholder="Enter task title" value={taskTitle} />
                    <TextInput multiline style={styles.descriptionDark}
                        onChangeText={(text) => setTaskDescription(text)}
                        placeholder="Enter task description" value={taskDescription} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInput multiline style={styles.title} onChangeText={(text) => setTaskTitle(text)}
                    placeholder="Enter task title" value={taskTitle}></TextInput>
                <TextInput multiline style={styles.description}
                    onChangeText={(text) => setTaskDescription(text)}
                    placeholder="Enter task description" value={taskDescription}></TextInput>
            </View>
        </TouchableWithoutFeedback>
    )

}