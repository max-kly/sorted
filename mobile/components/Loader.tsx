import { View, ActivityIndicator } from "react-native"
import { styles } from "@/styles/styles"
export default function Loader({ mode }: { mode: string | null }) {
    return <View style={mode === 'dark' ? [styles.containerDark, styles.middleOfScreen] : [styles.container, styles.middleOfScreen]}>
        <ActivityIndicator size={"large"} color={'#FF0000'} />
    </View>
}