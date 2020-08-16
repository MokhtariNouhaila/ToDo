import React, { Component } from 'react'

import { TextInput, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, View, } from 'react-native';
import colors from '../Colors';
import { AntDesign } from "@expo/vector-icons";
import tempData from '../tempData';

export default class addListModal extends React.Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];
    state = {
        name: "",
        color: this.backgroundColors[0]
    };
    createTodo=()=>{
        const {name,color}=this.state
        tempData.push({
            name,
            color,
            todos:[]
        });
        this.setState({name:""});
        this.props.closeModal();
    };
    renderColor() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity key={color} style={[styles.colorSelect, { backgroundColor: color }]}
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
                    <Text style={styles.title}>
                        Create Todo List

              </Text>
                    <TextInput
                        style={styles.input} placeholder="List name ? "
                        onChange={text => this.setState({ name: text })} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>{this.renderColor()}

                    </View>
                    <TouchableOpacity
                     style={[styles.create, { backgroundColor: this.state.color}]}
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
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


});