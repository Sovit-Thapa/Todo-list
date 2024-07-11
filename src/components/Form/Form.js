import { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Keyboard } from 'react-native';
import styles from './styles';
export default function Form(props) {
const [taskDescription, setTaskDescription] = useState('');
const [taskDone, setTaskDone] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);
const handleAddPress = () => {
if (taskDescription) {
props.onAddTask(taskDescription, taskDone);
setErrorMessage(null);
setTaskDescription('');
setTaskDone(false);
Keyboard.dismiss();
}
else {
setErrorMessage('The description is required.');
}
}
const handleDescriptionChange = (value) => {
setTaskDescription(value);
}
const handleStatusChange = (value) => {
setTaskDone(value);
}
return (
<View style={styles.container}>
{errorMessage && (
<View>
<Text>Attention:</Text>
<Text>{errorMessage}</Text>
</View>
)}
<TextInput
placeholder='Enter a task description'
maxLength={150}
onChangeText={handleDescriptionChange}
defaultValue={taskDescription}
/>
<View>
<Text>Completed:</Text>
<Switch
value={taskDone}
onValueChange={handleStatusChange}
/>
</View>
<Button
title='Add'
onPress={handleAddPress}
/>
</View>
);
}