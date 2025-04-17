import { Text, View, useColorScheme, FlatList } from "react-native";
import { styles } from "@/styles/styles";
import { useEffect } from "react";
import { Task } from '@/assets/types'
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadTasks } from "@/redux/tasksSlice";
import ListElement from "@/components/ListElement";
import CreateButton from "@/components/CreateButton";
import NoData from "@/components/NoData";

export default function Index() {
  const mode = useColorScheme() || null
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.list) || null
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);
  return (
    <View style={mode === 'dark' ? styles.containerDark : styles.container}>
      <Text style={mode === 'dark' ? styles.titleDark : styles.title}>Welcome back!</Text>
      {tasks ? (
        <>
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
        </>
      ) : <NoData entity={'upcomming tasks'} mode={mode} />}
    </View>
  );
}