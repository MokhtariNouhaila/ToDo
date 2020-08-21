import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import TodoModal from './TodoModal';
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { styles } from '../assets/styles'


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
                    <TodoModal list={list} closeModal={() => this.toggleListModal()}
                        updateList={this.props.updateList} />
                </Modal>
                     <AntDesign name="close" size={25} color="coral" onPress={() => this.props.deleteList(list)} />
                 <TouchableOpacity
                    onPress={() => this.toggleListModal()}
                    style={{ paddingVertical: 12, paddingHorizontal: 30, marginHorizontal: 20, backgroundColor: list.color, borderRadius: 10 }}>

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

