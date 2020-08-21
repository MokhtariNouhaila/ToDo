import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
        color: colors.red,
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 8,
    },
  input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 18,
        fontSize: 18
    },
    addM: {
        color: colors.red,
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 8,
      },
    inputM: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 18,
        fontSize: 18
    },
    titleM: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    createM: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    colorSelectM: {
        marginTop: 12,
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    colorSelect: {
        marginTop: 12,
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    listTitle: {
        fontSize: 25,
        fontWeight: "bold",

        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        color: colors.white,
        textDecorationLine: "underline"

    },
    count: {
        fontSize: 20,
        fontWeight: "200",
        color: colors.white,

    },
    titre: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.white,
    },

    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 60,
        marginTop: 30,
        borderBottomWidth: 3
    },

    taskCount: {
        marginTop: 4,

        color: colors.gray,
        fontWeight: "600",
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    },
    closebtn: {
        position: "absolute",
        marginLeft: 270,
        alignItems: "center",
        justifyContent: "center",
        color: colors.red,

    },

  
    title: {
        fontSize: 25,
        fontWeight: "700",
        color: colors.black,
        paddingHorizontal: 64,
    },
    titleG: {
        fontSize: 38,
        fontWeight: "700",
        color: colors.black,
        paddingHorizontal: 64,
    },


    addList: {
        borderWidth: 2,
        borderColor: "coral",
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },




})