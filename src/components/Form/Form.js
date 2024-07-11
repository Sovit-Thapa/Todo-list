import React, { useState } from "react";
import { View, Text, TextInput, Switch, Button, Keyboard, ActivityIndicator, StyleSheet } from "react-native";
import styles from "./styles";

export default function Form(props) {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDone, setTaskDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleAddPress = () => {
    if (taskDescription) {
      setLoading(true);
      setTimeout(() => {
        props.onAddTask(taskDescription, taskDone);
        setErrorMessage(null);
        setTaskDescription("");
        setTaskDone(false);
        setLoading(false);
        setSavedMessage(true);
        Keyboard.dismiss();
        setTimeout(() => {
          setSavedMessage(false);
        }, 1000);
      }, 2000);
    } else {
      setErrorMessage("The description is required.");
    }
  };

  const handleDescriptionChange = (value) => {
    setTaskDescription(value);
  };

  const handleStatusChange = (value) => {
    setTaskDone(value);
  };

  return (
    <View style={styles.container}>
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Attention:</Text>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      {savedMessage && (
        <View style={localStyles.savedContainer}>
          <Text style={localStyles.savedText}>Saved!</Text>
        </View>
      )}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task description"
          maxLength={150}
          onChangeText={handleDescriptionChange}
          value={taskDescription}
          editable={!loading}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Completed:</Text>
          <Switch
            style={styles.switch}
            value={taskDone}
            onValueChange={handleStatusChange}
            disabled={loading}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Add" onPress={handleAddPress} style={styles.button} />
        )}
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  savedContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'grey',
    padding: 50,
    borderRadius: 5,
  },
  savedText: {
    color: '#fff',
    fontSize: 16,
  },
});
