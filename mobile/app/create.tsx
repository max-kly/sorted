import { styles } from "@/styles/styles";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View, Button, TextInput, useColorScheme, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/tasksSlice";
import Loader from "@/components/Loader";

export default function Create() {
    const dispatch = useDispatch<AppDispatch>();
    const mode = useColorScheme() || null
    const navigation = useNavigation()
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [isLoading, setIsLoading] = useState(true)
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
        setIsLoading(false)
    }, [navigation, taskTitle, taskDescription, mode])
    if (isLoading) return <Loader mode={mode} />
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={mode === 'dark' ? styles.containerDark : styles.container}>
                <TextInput multiline style={mode === 'dark' ? styles.titleDark : styles.title} onChangeText={(text) => setTaskTitle(text)}
                    placeholder="Enter task title" value={taskTitle} />
                <TextInput multiline style={mode === 'dark' ? styles.descriptionDark : styles.description}
                    onChangeText={(text) => setTaskDescription(text)}
                    placeholder="Enter task description" value={taskDescription} />
            </View>
        </TouchableWithoutFeedback>
    )
}