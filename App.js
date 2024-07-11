import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Header from './src/components/Header/Header';
import Tasks from './src/components/Tasks/Tasks';
import Form from './src/components/Form/Form';
import styles from './src/styles/main';
import uuid from 'react-uuid';
import { useState } from 'react';
export default function App() {
const [tasks, setTasks] = useState(
[
{
id: uuid(),
description: "Walk the dog",
done: true
},
{
id: uuid(),
description: "Wash the car",
done: false
},
{
id: uuid(),
description: "Finish the lab",
done: false
},
]
);
const handleAddTask = (taskDescription, taskDone) => {
const updatedTasks = [...tasks];
updatedTasks.push(
{
id: uuid(),
description: taskDescription,
done: taskDone
}
);
setTasks(updatedTasks);
}
return (
<View style={styles.container}>
<StatusBar style="auto" />
<Header />
<Tasks tasks={tasks} />
<Form onAddTask={handleAddTask} />
</View>
);
}