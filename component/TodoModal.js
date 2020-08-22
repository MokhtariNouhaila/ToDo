import React, { Component } from 'react'

import { TextInput, Text, Modal, Keyboard, KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView, FlatList, } from 'react-native';
import colors from '../Colors';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import tempData from '../tempData';
import { styles } from '../assets/styles'


export default class TodoModal extends React.Component {
    state = {
        newTodo: "",
        message: "non",
        title:"***",
        open: false,
    };
    toggleTitleModal() {
        this.setState({ open: !this.state.open }),
        this.setState({message:""})
    }
    toggelTodoCompleted = index => {

        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;
        this.props.updateList(list);
    }
    toggelTodoTitle () {
if(this.state.title.length!=0){
     let list = this.props.list;
        list.name =this.state.title;
        this.props.updateList(list);
        this.toggleTitleModal() ; 
        this.setState({message:""})
 
}
else {
    this.setState({message:"nonTitre"})
}
     
    }
    addTodo = () => {
        let list = this.props.list;
        if (!list.todos.some(todo => todo.title === this.state.newTodo) && this.state.newTodo.length != 0) {
            list.todos.push({ title: this.state.newTodo, completed: false });
            this.props.updateList(list);
            this.setState({ newTodo: "" });
            Keyboard.dismiss;
        }
        else if (list.todos.some(todo => todo.title === this.state.newTodo)) {
            this.setState({ message: "existe" })
        }
        else if (this.state.newTodo.length == 0) {
            this.setState({ message: "vide" })

        }



    }
    deleteTodo = index => {
        let list = this.props.list;
        list.todos.splice(index, 1);
        this.props.updateList(list);

    }
    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toggelTodoCompleted(index)}>
                    <Ionicons
                        name={todo.completed ? "ios-square" : "ios-square-outline"} size={25} color={colors.gray} style={{ width: 32 }} />
                </TouchableOpacity>
                <Text style={[styles.todo, { width: 190, color: todo.completed ? colors.gray : colors.black }]}>{todo.title}</Text>
                <AntDesign name="close" size={24} style={styles.closebtn} onPress={() => this.deleteTodo(index)} />
            </View>
        )
    }

    render() {
        const list = this.props.list;
        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length
        return (
            <SafeAreaView style={styles.container}>
                <Modal animationType="slide" visible={this.state.open} onRequestClose={() => this.toggleTitleModal()}>
                    <TouchableOpacity style={{ position: "absolute",  top: 20, right: 290}}>
                        <AntDesign name="close" size={24} color={colors.black} onPress={() => this.toggleTitleModal()} />
                    </TouchableOpacity>
                    <TextInput style={[styles.inputMod, { borderColor: list.color }]} 
                    defaultValue={list.name}
                    onChangeText={title => this.setState({ title:title })} 
                     />
                       {this.state.message == "nonTitre" ? <Text style={[styles.addM,{marginLeft:30}]}>Is empty !!!</Text> : null}
                    
                    <TouchableOpacity
                        style={[styles.createMod, { backgroundColor: list.color }]}
                        onPress={() => this.toggelTodoTitle()}
                    >
                        <Text style={{ color: colors.white, fontWeight: "600" }}>
                            Update !
                  </Text>
                    </TouchableOpacity>
                </Modal>
                <TouchableOpacity
                    onPress={this.props.closeModal}
                    style={{ position: "absolute",  top: 20, right: 290}}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>
                <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                    <View>
                        <Text style={styles.title} onPress={() => this.toggleTitleModal()}>
                            {list.name}
                        </Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks
                        </Text>
                    </View>
                </View>
                <View style={[styles.section, { flex: 3 }]}>

                    <FlatList
                        data={list.todos}
                        renderItem={({ item, index }) => this.renderTodo(item, index)}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 20 }}
                        showsVerticalScrollIndicator={false}
                    />

                </View>
                <KeyboardAvoidingView style={[styles.section, styles.footer]}  >
                    {this.state.message == "existe" ? <Text style={styles.addM}>already exists !!</Text> : (this.state.message == "vide" ? <Text style={styles.addM}>Is empty !!!</Text> : null)}

                    <TextInput style={[styles.input, { borderColor: list.color }]} onChangeText={text => this.setState({ newTodo: text })} value={this.state.newTodo} />

                    <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => this.addTodo()}>
                        <AntDesign name="plus" size={20} color={colors.white} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }

}
