import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import TodoModal from './TodoModal'
export default class TodoList extends React.Component {
    state = {
        showListVisible: false
    }
    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }
    render() {
        const list = this.props.list;
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingcount = list.todos.length - completedCount;
        return (

            <View>
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
                   <TodoModal list={list} closeModal={()=>this.toggleListModal()}/>
                </Modal>
                
                <TouchableOpacity
                    onPress={() => this.toggleListModal()}
                    style={{ paddingVertical: 32, paddingHorizontal: 30, marginHorizontal: 20, backgroundColor: list.color, borderRadius: 10 }}>
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                    <View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>
                                {completedCount}
                            </Text>
                            <Text style={styles.titre}>
                                completed
                        </Text>

                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>
                                {remainingcount}
                            </Text>
                            <Text style={styles.titre}>
                                non Completed
                        </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>



        )
    }

}


const styles = StyleSheet.create({

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


});
