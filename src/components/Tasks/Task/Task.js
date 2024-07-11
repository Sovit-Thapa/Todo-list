import { View, Text } from 'react-native';
import styles from './styles';
export default function Task(props) {
return (
<View style={styles.container}>
<Text>{props.task.description}</Text>
<Text>Id: {props.task.id}</Text>
<Text>Status: {props.task.done ? 'Completed' : 'Open'}</Text>
</View>
);
}