import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import colors from './Colors';
import { AntDesign } from "@expo/vector-icons";
import tempData from './tempData';
import TodoList from './component/TodoList';
import AddListModal from './component/addListModal';
export default class App extends React.Component {
  state = {
    addTodoVisible: false
  };
  toggleAddTodoModal() {
    this.setState({
      addTodoVisible: !this.state.addTodoVisible
    })
  }
  renderList=list=>{
    return <TodoList list={list}/>
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={()=>this.toggleAddTodoModal()}>
        <AddListModal closeModal={()=>this.toggleAddTodoModal()}/>
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            ToDo <Text style={{ fontWeight: "300", color: colors.blue }}>List</Text>
          </Text>
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>

        </View>

        <View style={{ height: 253 }}>

          <FlatList
            data={tempData}
            keyExtractor={item => item.name}
            horizontal={true}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
             this.renderList(item)
            }
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.black,
    paddingHorizontal: 64,
  },

  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },


  add: {
    color: colors.blue,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 8,
  },

});
