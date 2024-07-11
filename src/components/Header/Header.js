import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";

export default function Header() {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="tasks" size={24} style={styles.icon} />
      <Text style={styles.title}>Todo App</Text>
      <Text style={styles.subtitle}> by Sovit Thapa</Text>
    </View>
  );
}
