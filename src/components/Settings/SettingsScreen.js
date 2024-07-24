import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import * as Notifications from 'expo-notifications';
import styles from './styles.js'; // Adjust path as necessary

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      status = (await Notifications.requestPermissionsAsync()).status;
    }
    if (status === 'granted') {
      setIsEnabled(previousState => !previousState);
      if (isEnabled) {
        // If the switch is currently enabled, cancel all scheduled notifications
        await Notifications.cancelAllScheduledNotificationsAsync();
      } else {
        // If the switch is currently disabled, schedule a new notification
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Todo Reminder',
            body: 'Remember to check your tasks',
          },
          trigger: {
            seconds: 5, // one day
            repeats: true,
          },
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      <Text style={styles.text}>Remind me to keep my tasks up-to-date.</Text>
      <View style={styles.row}>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
         <Text style={styles.text}>Set daily reminder</Text>
      </View>
    </View>
  );
}