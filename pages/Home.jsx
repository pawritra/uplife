import React, { useState } from "react";
import { Text, View } from "react-native";
import Calendar from "../components/home/Calendar";
import TaskList from "../components/home/TaskList";
const Home = () => {
  const [currentDate, setCurrentDate] = useState(2);
  return (
    <View>
      <Calendar
        data={[1, 2, 3, 4, 5, 6, 7]}
        initialIndex={3}
        onIndexChange={({ index }) => setCurrentDate(index)}
      />

      <TaskList currentDate={currentDate} />
    </View>
  );
};

export default Home;
