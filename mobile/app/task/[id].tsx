import { Button, useColorScheme, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { styles } from "@/styles/styles";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadTaskById, removeTask, editTask, loadTasks } from "@/redux/tasksSlice";
import Loader from "@/components/Loader";

export default function TaskDetails() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useLocalSearchParams<{ id: string }>();
    const task = useSelector((state: RootState) => state.tasks.selected);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (id) {
            dispatch(loadTaskById(id));
            setIsLoading(false)
        }
    }, [id]);
    useEffect(() => {
        if (task) {
            setTaskTitle(task.title);
            setTaskDescription(task.description);
        }
    }, [task]);
    const mode = useColorScheme() || null
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
                    Alert.alert('Deleted', 'Task has been deleted successfully.')
                    navigation.goBack()
                }} />
            ),
        })
    }, [navigation])
    if (isLoading) return <Loader mode={mode} />

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={mode === 'dark' ? styles.containerDark : styles.container}>
                <TextInput multiline style={mode === 'dark' ? styles.titleDark : styles.title} onChangeText={(text) => setTaskTitle(text)}
                    onBlur={() => {
                        dispatch(editTask({ id, updates: { title: taskTitle } }))
                    }} value={taskTitle} />
                <TextInput multiline style={mode === 'dark' ? styles.descriptionDark : styles.description}
                    onChangeText={(text) => setTaskDescription(text)}
                    onBlur={() => {
                        dispatch(editTask({ id, updates: { description: taskDescription } }))
                    }} placeholder="No description for the task" value={taskDescription} />
            </View>
        </TouchableWithoutFeedback >
    );
}