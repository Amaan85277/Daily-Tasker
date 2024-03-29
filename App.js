import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";

import colors from "./color";
import tempData from "./tempData";
import TodoList from "./component/TodoList";
import AddListModal from "./component/AddListModal";
// import Fire from "./Fire";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData,
    // lists:[],
    user: {},
    // loading: true,
  };

  // componentDidMount() {
  //   firebase = new Fire((error, user) => {
  //     if (error) {
  //       return alert("Something went wrong!! Please try again later");
  //     }

  //     firebase.getLists((lists) => {
  //       this.setState({ lists, user }, () => {
  //         this.setState({ loading: false });
  //       });
  //     });

  //     this.setState({ user });
  //   });
  // }

  // componentWillUnmount() {
  //   firebase.detach();
  // }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderlist = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    // firebase.addList({
    //   name: list.name,
    //   color: list.color,
    //   todos: [],
    // });
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
  };

  updateList = (list) => {
    // firebase.updateList(list);
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    // if (this.state.loading) {
    //   return (
    //     <View style={styles.container}>
    //       <ActivityIndicator size="large" color={colors.blue} />
    //     </View>
    //   );
    // }

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            <Text style={{ fontWeight: "500", color: colors.lightBlue }}>
              Your{" "}
            </Text>
            <Text style={{ color: "rgb(93, 83, 83)" }}>Daily</Text>
            <Text style={{ fontWeight: "500", color: colors.lightBlue }}>
              {" "}
              Tasks
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 50 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={20} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}> Add a Task</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderlist(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.black,
    alignSelf: "center",
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
});
