import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Map from "../screens/map";
import Login from "../screens/login";
import ImagePickerExample from "../screens/test/ImageUpload";

type Props = {};
const Stack = createStackNavigator();

const Routes = (props: Props) => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Login" component={Login} />

          <Stack.Screen
            name="ImagePickerExample"
            component={ImagePickerExample}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
