import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import { Swipeable } from "react-native-gesture-handler";

import colors from "../color";

export default class TodoModal extends React.Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;

    if(!list.todos.some(todo=>todo.title === this.state.newTodo)){
      list.todos.push({ title: this.state.newTodo, completed: false });

      this.props.updateList(list);
    }
    
    this.setState({ newTodo: "" });

    Keyboard.dismiss();
  };

  deleteTodo= (index) =>{
    let list = this.props.list;
    list.todos.splice(index, 1)

    this.props.updateList(list);
  }

  renderTodo = (todo, index) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => this.rightAction(dragX, index)}
      >
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
            <Ionicons
              name={todo.completed ? "ios-square" : "ios-square-outline"}
              size={24}
              color={colors.gray}
              style={{ width: 32 }}
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.todo,
              {
                color: todo.completed ? colors.gray : colors.black,
                textDecorationLine: todo.completed ? "line-through" : "none",
              },
            ]}
          >
            {todo.title}
          </Text>
        </View>
      </Swipeable>
    );
  };

  rightAction = (dragX, index) => {

    const scale = dragX.interpolate({
      inputRange:[-100, 0],
      outputRange:[1, 0.9],
      extrapolate: "clamp"
    })

    const opacity = dragX.interpolate({
      inputRange:[-100, -20,  0],
      outputRange:[1, 0.9, 0],
      extrapolate: "clamp"
    })


    return (
      <TouchableOpacity onPress={()=>this.deleteTodo(index)}>
        <Animated.View style={[styles.deletebtn, {opacity: opacity}]}>
          <Animated.Text style={{ color: colors.white, fontWeight: "800", transform:[{scale}] }}>
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.list;

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 60, right: 30, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 , marginVertical:16}]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={item => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 60,
    borderBottomWidth: 3,
    paddingTop:16
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    fontWeight: "600",
    color: colors.gray,
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical:16
  },
  input: {
    flex: 1,
    height: 40,
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
    paddingLeft:32
  },
  todo: {
    color: colors.blue,
    fontWeight: "700",
    fontSize: 16,
  },
  deletebtn: {
    flex: 1,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});
