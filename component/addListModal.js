import React, { Component } from 'react'

import { TextInput, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, View, } from 'react-native';
import colors from '../Colors';
import { AntDesign } from "@expo/vector-icons";
import {styles} from '../assets/styles';


export default class addListModal extends React.Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];
    state = {
        name: "",
        color: this.backgroundColors[0],
        message:false,
    };
    createTodo=()=>{
        const {name,color}=this.state
       const list={name,color};
       if(this.state.name!=""){
             this.props.addList(list);
              this.setState({name:""});
        this.props.closeModal();
        this.setState({message:false})
       }
     else{
        this.setState({message:true})
     }
      
    };
    renderColor() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity key={color} style={[styles.colorSelectM, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })} />
            )
        })
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}  >
                <TouchableOpacity style={{ position: "absolute",  top: 30, right: 320 }}>
                    <AntDesign name="close" size={24} color={colors.black} onPress={this.props.closeModal} />
                </TouchableOpacity>
                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.titleM}>
                        Create Todo List

              </Text>
                    <TextInput
                        style={styles.inputM} placeholder="List name ? "
                        onChangeText={name => this.setState({ name:name })} 
                        defaultValue={this.state.name}/>
                        {this.state.message?<Text style={styles.addM}>the name is empty !!!</Text>:null}
                        
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>{this.renderColor()}

                    </View>
                    <TouchableOpacity
                     style={[styles.createM, { backgroundColor: this.state.color}]}
                     onPress={this.createTodo}
                     >
                        <Text style={{ color: colors.white, fontWeight: "600" }}>
                            Create !
                  </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        )
    }
}

 