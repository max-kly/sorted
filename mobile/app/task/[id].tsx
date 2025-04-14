import { Button, useColorScheme, View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from "@/styles/styles";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadTaskById, removeTask, editTask, loadTasks } from "@/redux/tasksSlice";

export default function TaskDetails() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useLocalSearchParams<{ id: string }>();
    const task = useSelector((state: RootState) => state.tasks.selected);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    useEffect(() => {
        if (id) {
            dispatch(loadTaskById(id));
        }
    }, [id]);
    useEffect(() => {
        if (task) {
            setTaskTitle(task.title);
            setTaskDescription(task.description);
        }
    }, [task]);
    const mode = useColorScheme()
    const navigation = useNavigation()
    const background = mode === 'dark' ? '#000' : '#FFF'
    const color = mode === 'dark' ? '#FFF' : '#000'
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Task details',
            headerStyle: { backgroundColor: background },
            headerTintColor: color,
            headerRight: () => (
                <Button title='Delete' color={'#FF0000'} onPress={async () => {
                    await dispatch(removeTask(id));
                    await dispatch(loadTasks())
                    alert('Task was deleted')
                    navigation.goBack()
                }} />
            ),
        })
    }, [navigation])
    if (mode === 'dark') {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerDark}>
                    <TextInput multiline style={styles.titleDark} onChangeText={(text) => setTaskTitle(text)}
                        onBlur={() => {
                            dispatch(editTask({ id, updates: { title: taskTitle } }))
                        }} value={taskTitle} />

                    <TextInput multiline style={styles.descriptionDark}
                        onChangeText={(text) => setTaskDescription(text)}
                        onBlur={() => {
                            dispatch(editTask({ id, updates: { description: taskDescription } }))
                        }} placeholder="No description for the task" value={taskDescription} />
                </View>
            </TouchableWithoutFeedback >
        );
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInput multiline style={styles.title} onChangeText={(text) => setTaskTitle(text)}
                    onBlur={() => {
                        dispatch(editTask({ id, updates: { title: taskTitle } }))
                    }}>{taskTitle}</TextInput>

                <TextInput multiline style={styles.description}
                    onChangeText={(text) => setTaskDescription(text)}
                    onBlur={() => {
                        dispatch(editTask({ id, updates: { description: taskDescription } }))
                    }} placeholder="No description for the task">{taskDescription}</TextInput>
            </View>
        </TouchableWithoutFeedback >
    );
}