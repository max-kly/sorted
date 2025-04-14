import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout() {
  const mode = useColorScheme()
  const background = mode === 'dark' ? '#000' : '#FFF'
  const color = mode === 'dark' ? '#FFF' : '#000'
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name='index'
          options={{ title: 'Home', headerShown: false, }}
        />
        <Stack.Screen
          name='create'
          options={{
            title: 'New task',
            headerStyle: { backgroundColor: background },
            headerTintColor: color,
          }}
        />
      </Stack>
    </Provider>
  )
}