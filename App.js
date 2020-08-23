import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
 import { AntDesign } from "@expo/vector-icons";
 import TodoList from './component/TodoList';
import AddListModal from './component/addListModal';
import Fire from './Fire';
import { styles } from './assets/styles'
console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: "",
    loading: true,
  };
  componentDidMount() {
    firebase = new Fire((error, user) => {
      if(error)
       {
         return alert("something wrong");
       }
      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        })
      });
      this.setState({ user });
    });

    firebase.detach()
  }

  toggleAddTodoModal() {
    this.setState({
      addTodoVisible: !this.state.addTodoVisible
    })
  };
  deleteList = list => {
    firebase.deleteList(list);
  };
  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} deleteList={this.deleteList} />
  };
  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    })
  };
  updateList = list => {
    firebase.updateList(list);
  };
  render() {
    if (this.state.loading) {
      return (<View style={styles.container}><ActivityIndicator size="large" color="coral" /></View>)

    }
    return (
      <View style={styles.container}>
        <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View />
          <Text style={styles.titleG}>
            ToDo <Text style={{ fontWeight: "300", color: "coral" }}>List</Text>
          </Text>
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color="coral" />
          </TouchableOpacity>
          <Text style={[styles.add, { color: "coral" }]}>New List</Text>

        </View>

        <View style={{ height: 330}}>

          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
              this.renderList(item)
            }
            keyboardShouldPersistTaps="always"
          /> 
         </View>
      
      </View>
    );
  }

}
