import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const TaskList = ({ currentDate }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks([
      { task: "Hello World", id: "1" },
      { task: "Hello World", id: "2" },
      { task: "Hello World", id: "3" },
    ]);
  }, [currentDate]);
  return (
    <View style={styles.taskList}>
      <View>
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </View>
      <View>
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </View>
    </View>
  );
};

const Task = ({ task }) => {
  return (
    <View style={styles.task}>
      <Text>{task.task}</Text>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  taskList: {
    marginTop: 20,
    padding: 10,
  },
  task: {
    padding: 10,
    fontSize: 16,
  },
});
