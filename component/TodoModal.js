import React, { Component } from 'react'

import { TextInput, Text, Modal, Keyboard, KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView, FlatList, } from 'react-native';
import colors from '../Colors';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import tempData from '../tempData';
import { styles } from '../assets/styles'


export default class TodoModal extends React.Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    state = {
        newTodo: "",
        message: "non",
        title:this.props.list.name,
        color: this.props.list.color,
        open: false,
    };
    toggleTitleModal() {
        this.setState({ open: !this.state.open }),
            this.setState({ message: "" }),
            this.setState({title:this.props.list.name})

    }
    toggelTodoCompleted = index => {

        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;
        this.props.updateList(list);
    }
    toggelTodoTitle() { 
       
        let list = this.props.list; list.color = this.state.color;
        if (this.state.title.length != 0) {
            list.name = this.state.title;
            this.props.updateList(list);
            this.toggleTitleModal();
            this.setState({ message: "" })
        }
        else {
            this.setState({ message: "nonTitre" })
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
    updateTodo = (text,index) => {
        let list = this.props.list;
        list.todos[index].title=text;
        this.props.updateList(list);

    }
    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toggelTodoCompleted(index)}>
                    <Ionicons
                        name={todo.completed ? "ios-square" : "ios-square-outline"} size={25} color={colors.gray} style={{ width: 32 }} />
                </TouchableOpacity>
                <TextInput onChangeText={(text) => this.updateTodo(text,index)} style={[styles.todo, { width: 190, color: todo.completed ? colors.gray : colors.black }]} defaultValue={todo.title}/>
              
                <AntDesign name="close" size={24} style={styles.closebtn} onPress={() => this.deleteTodo(index)} />
            </View>
        )
    }
    renderColor() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity key={color} style={[styles.colorSelectM, { backgroundColor: color,marginLeft:15 }]}
                    onPress={() => this.setState({ color })} />
            )
        })
    }

    render() {
        const list = this.props.list;
           const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length

        return (
            <SafeAreaView style={styles.container}>
                <Modal animationType="slide" style={{ height: 20 }} visible={this.state.open} onRequestClose={() => this.toggleTitleModal()}>
                    <View style={{ height: 20 }}>
                        <TouchableOpacity style={{ position: "absolute", top: 20, right: 290 }}>
                            <AntDesign name="close" size={24} color={colors.black} onPress={() => this.toggleTitleModal()} />
                        </TouchableOpacity>
                        <TextInput style={[styles.inputMod, { borderColor: this.state.color}]}
                            defaultValue={list.name}
                            onChangeText={title => this.setState({ title: title })}
                        />
                        {this.state.message == "nonTitre" ? <Text style={[styles.addM, { marginLeft: 30 }]}>Is empty !!!</Text> : null}
                        <View style={{ flexDirection: "row" ,marginLeft:15}}>{this.renderColor()}

                        </View>
                        <TouchableOpacity
                            style={[styles.createMod, { backgroundColor: this.state.color }]}
                            onPress={() => this.toggelTodoTitle()}
                        >
                            <Text style={{ color: colors.white, fontWeight: "600" }}>
                                Update !
                  </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <TouchableOpacity
                    onPress={this.props.closeModal}
                    style={{ position: "absolute", top: 20, right: 290 }}>
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
