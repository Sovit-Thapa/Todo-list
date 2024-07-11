import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'; // Adjust path as necessary
import * as database from '../../../database/firebase'
export default function Task(props) {
  const [showModal, setShowModal] = useState(false);
  const [taskDone, setTaskDone] = useState(props.task.done);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleStatusChangePress = async () => {
    setTaskDone(!taskDone);
    const updated = await database.updateTaskStat(props.task.id, !props.task.done);
    if (!updated){
      props.task.id = props.task.id
      props.task.done = !props.task.done
    }
  };

  const handleRemovePress = () => {
    Alert.alert(
      'Remove Task',
      'This action will permanently delete this task. This action cannot be undone!',
      [
        {
          text: 'Confirm',
          onPress: () => {
            props.onTaskRemoval(props.task.id)
              .then(() => {
                setShowModal(false);
              })
              .catch(error => {
                console.error('Error removing task:', error);
                Alert.alert('Error', 'Failed to remove task. Please try again later.');
              });
          },
        },
        {
          text: 'Cancel',
        },
      ]
    );
  };

  return (
    <>
      <Pressable onPress={handleModalToggle}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.task.description}</Text>
          <Text style={styles.text}>Id: {props.task.id}</Text>
          <Text style={styles.text}>Status: {taskDone ? 'Completed' : 'Open'}</Text>
        </View>
      </Pressable>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Pressable onPress={handleModalToggle} style={styles.closeButtonContainer}>
              <Text style={styles.closeButton}><Text style={styles.redX}> X </Text> Close</Text>
            </Pressable>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{props.task.description}</Text>
              <View style={styles.buttonRow}>
                <View style={styles.switchContainer}>
                  <Switch
                    value={taskDone}
                    onValueChange={handleStatusChangePress}
                  />
                  <Text>Toggle Status</Text>
                </View>
                <Pressable onPress={handleRemovePress} style={styles.removeButtonContainer}>
                  <Ionicons name="trash-outline" size={24} color="red" style={styles.removeIcon} />
                  <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
