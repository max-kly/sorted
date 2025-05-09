import { View, Text } from "react-native";
import { styles } from "@/styles/styles";
import CreateButton from "./CreateButton";
export default function NoData({ entity, mode }: { entity: string, mode: string | null }) {
    return (
        <View style={mode === 'dark' ? [styles.containerDark, styles.middleOfScreen] : [styles.container, styles.middleOfScreen]}>
            <Text style={mode === 'dark' ? styles.textDark : styles.text}>No {entity} were found</Text>
            <CreateButton />
        </View>
    )
}