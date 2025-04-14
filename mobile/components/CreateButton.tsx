import { Link } from "expo-router"
import { View, Text } from "react-native"
import { styles } from "@/styles/styles"
export default function CreateButton() {
    return (
        <Link href="/create" style={styles.floatingButton}>
            <View style={styles.buttonCircle}>
                <Text style={styles.iconColor}>+</Text>
            </View>
        </Link>
    )
}