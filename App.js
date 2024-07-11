import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Header from './src/components/Header/Header';
import Tasks from './src/components/Tasks/Tasks';
import Form from './src/components/Form/Form';
import { fetchTasks, addTask, removeTask, subscribeToTaskChanges } from './src/database/firebase'; // Adjust path as necessary

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Firestore and subscribe to real-time updates on component mount
  useEffect(() => {
    const unsubscribe = subscribeToTaskChanges((updatedTasks) => {
      setTasks(updatedTasks);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleAddTask = async (taskDescription, taskDone) => {
    try {
      await addTask(taskDescription, taskDone);
      // No need to update tasks state here; it will be updated via the listener automatically
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await removeTask(taskId);
      // No need to update tasks state here; it will be updated via the listener automatically
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'List') {
                  iconName = 'list-outline';
                } else if (route.name === 'Add') {
                  iconName = 'add-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'red',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen
              name="List"
              children={(props) => (
                <>
                  <Header />
                  <Tasks
                    {...props}
                    tasks={tasks}
                    onTaskRemoval={handleRemoveTask} // Pass handleRemoveTask function to Tasks component
                  />
                </>
              )}
              options={{
                tabBarLabel: 'Tasks',
              }}
            />
            <Tab.Screen
              name="Add"
              children={(props) => (
                <>
                  <Header />
                  <Form
                    {...props}
                    onAddTask={handleAddTask} // Pass handleAddTask function to Form component
                  />
                </>
              )}
              options={{
                tabBarLabel: 'Add Task',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
