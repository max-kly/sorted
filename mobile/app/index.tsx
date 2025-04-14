import { Text, View, useColorScheme, FlatList } from "react-native";
import { styles } from "@/styles/styles";
import { useEffect } from "react";
import { Task } from '@/assets/types'
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadTasks } from "@/redux/tasksSlice";
import ListElement from "@/components/ListElement";
import CreateButton from "@/components/CreateButton";

export default function Index() {
  const mode = useColorScheme() || null
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.list)
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  if (mode === 'dark') {
    return (
      <View style={styles.containerDark}>
        <Text style={styles.titleDark}>Welcome back!</Text>
        <FlatList<Task>
          style={styles.scrollableContainer}
          data={[...tasks].sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
          })}
          renderItem={({ item }) => (
            <ListElement
              id={item.id}
              title={item.title}
              description={item.description}
              completed={item.completed}
              mode={mode}
            />
          )}
          keyExtractor={(item) => item.id.toString()} />
        <CreateButton />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <FlatList<Task>
        style={styles.scrollableContainer}
        data={[...tasks].sort((a, b) => {
          if (a.completed === b.completed) return 0;
          return a.completed ? 1 : -1;
        })}
        renderItem={({ item }) => (
          <ListElement
            id={item.id}
            title={item.title}
            description={item.description}
            completed={item.completed}
            mode={mode}
          />
        )}
        keyExtractor={(item) => item.id.toString()} />
      <CreateButton />
    </View>
  );
}