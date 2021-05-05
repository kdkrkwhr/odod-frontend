import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Route from "./src/components/Route";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Hello World2</Text>
    // </View>
    <Route />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
