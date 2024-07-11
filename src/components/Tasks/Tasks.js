import React from 'react';
import { View, ScrollView } from 'react-native';
import Task from './Task/Task';
import styles from './styles';

export default function Tasks(props) {
  // No local state for tasks needed, they are managed via props

  return (
    <View style={styles.container}>
      <ScrollView>
        {props.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onStatusChange={props.onStatusChange}
            onTaskRemoval={props.onTaskRemoval}
          />
        ))}
      </ScrollView>
    </View>
  );
}
