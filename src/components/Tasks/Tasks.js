import { View, ScrollView } from 'react-native';
import Task from './Task/Task';
import styles from './styles';
export default function Tasks(props) {
return (
<View style={styles.container}>
<ScrollView>
{props.tasks.map(
(task, index) => (
<Task key={index} task={task} />
)
)}
</ScrollView>
</View>
);
}