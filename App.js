import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";

import colors from "./color";
import tempData from "./tempData";
import TodoList from "./component/TodoList";
import React from "react";

export default class App extends React.Component {
  state = { addTodoVisible: false };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={this.state.addTodoVisible}>
          <View>
            <Text>I'm a modal! :)</Text>
          </View>
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            <Text style={{ fontWeight: "250", color: colors.lightBlue }}>
              Your{" "}
            </Text>
            Daily
            <Text style={{ fontWeight: "250", color: colors.lightBlue }}>
              {" "}
              Tasks
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 50 }}>
          <TouchableOpacity style={styles.addList}>
            <AntDesign name="plus" size={20} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}> Add a Task</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={tempData}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <TodoList list={item} />}
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
