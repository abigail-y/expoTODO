import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, TouchableOpacity } from 'react-native-web';
import { CheckBox } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons'; // Importing FontAwesome for the trash can icon

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8F6', // Light green background
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    padding: 20,
  },
  inputContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  input: { 
    flex: 1, 
    borderBottomWidth: 1, 
    borderColor: '#A8D5BA', // Light green border color for input fields
    padding: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 5
  },
  addButton: { 
    backgroundColor: "#A8D5BA", 
    padding: 10, 
    borderRadius: 5 
  },
  addButtonText: { 
    color: "#fff", 
    fontSize: 20 
  },
  taskContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#A8D5BA', // Light green border around tasks
    borderRadius: 8,
    backgroundColor: "#fff", 
  },
  taskText: { 
    marginLeft: 10, 
    fontSize: 16 
  },
  completedTask: { 
    textDecorationLine: "line-through", 
    color: "gray" 
  },
  descriptionText: { 
    marginTop: 5, 
    color: "gray",
    fontStyle: "italic"
  },
  deleteButton: { 
    backgroundColor: "#FF69B4", // Nice pink background
    padding: 10, 
    borderRadius: 5, 
    marginLeft: 10,
  },
  deleteButtonText: { 
    color: "#fff", 
    fontSize: 16 
  },
});

export default function App() {
  const [tasks, doTask] = useState([
    { key: "1", title: "Take out trash", completed: false, description: "Take the trash out to the curb" },
    { key: "2", title: "Get a car wash", completed: false, description: "Wash the car at the local car wash" },
    { key: "3", title: "Finish project", completed: false, description: "Complete the final project for class" }
  ]);
  const [doNewTask, setNewTask] = useState("");
  const [doNewDescription, setNewDescription] = useState(""); // For adding description

  // New task
  const addTask = () => {
    if (doNewTask.trim() !== "") {
      doTask([...tasks, { key: Date.now().toString(), title: doNewTask, completed: false, description: doNewDescription }]);
      setNewTask("");
      setNewDescription(""); // Reset description after adding
    }
  };

  // Task completed
  const toggleTodo = (taskKey) => {
    doTask(tasks.map(task =>
      task.key === taskKey ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = (taskKey) => {
    doTask(tasks.filter(task => task.key !== taskKey));
  };

  // Render task
  const renderTodo = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox checked={item.completed} onPress={() => toggleTodo(item.key)} />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.title}
      </Text>
      <Text style={styles.descriptionText}>{item.description}</Text>


      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.key)}>
        <FontAwesome name="trash" size={20} color="white" /> {/*delete button */}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type new task"
          value={doNewTask}
          onChangeText={setNewTask}
        />
        <TextInput
          style={styles.input}
          placeholder="Type task description"
          value={doNewDescription}
          onChangeText={setNewDescription}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={tasks} renderItem={renderTodo} />
    </SafeAreaView>
  );
}
