import { Task } from '../assets/types'
import { Checkbox } from 'expo-checkbox'
import { View, Text } from 'react-native'
import { Link } from "expo-router";
import { styles } from '@/styles/styles';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { editTask, loadTasks } from '../redux/tasksSlice'

export default function ListElement({ id, title, description, completed, mode }: Task & { mode: 'dark' | 'light' | null }) {
    const [isChecked, setChecked] = useState(completed);
    const dispatch = useDispatch<AppDispatch>();
    const task = useSelector((state: RootState) => state.tasks.selected);
    return <View style={styles.taskContainer}>
        <Checkbox value={isChecked} color={'#FF0000'} onValueChange={async (value) => {
            await dispatch(editTask({ id, updates: { completed: value } }))
            await dispatch(loadTasks())
            setChecked(value)
        }} />
        <Link style={styles.listItem} href={`/task/${id}`}>
            <View>
                <Text style={mode === 'dark' ? styles.textDark : styles.text}>{title}</Text>
                {description ? <Text style={styles.descriptionSm}>{description}</Text> : null}
            </View>
        </Link>
    </View>
}