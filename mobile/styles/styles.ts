import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        position: 'relative',
        backgroundColor: '#FFF'
    },
    containerDark: {
        paddingTop: 30,
        flex: 1,
        position: 'relative',
        backgroundColor: '#000'
    },
    title: {
        fontSize: 30,
        fontWeight: 800,
        margin: 20,
    },
    titleDark: {
        fontSize: 30,
        fontWeight: 800,
        margin: 20,
        color: '#FFF'
    },
    descriptionSm: {
        color: '#808080',
        marginTop: 5
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        zIndex: 100,
    },
    buttonCircle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconColor: {
        color: '#fff',
        fontSize: 30,
    },
    text: {
        fontSize: 20
    },
    textDark: {
        fontSize: 20,
        color: '#FFF'
    },
    scrollableContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 20,
        width: '90%',
    },
    description: {
        margin: 20,
        fontSize: 20,
        color: '#000',
    },
    descriptionDark: {
        margin: 20,
        fontSize: 20,
        color: '#FFF',
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        width: '100%',
    }
});
