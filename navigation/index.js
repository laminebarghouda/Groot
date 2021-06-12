import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Product from "../screens/Product";
import UpdatePlant from "../screens/UpdatePlant";
import AddPlant from "../screens/AddPlant";

import { theme } from "../constants";

const screens = createStackNavigator(
    {
        Welcome,
        Login,
        SignUp,
        Forgot,
        Explore,
        Browse,
        Product,
        AddPlant,
        UpdatePlant
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                height: theme.sizes.base * 4,
                backgroundColor: "transparent",
                borderBottomColor: "transparent",
                elevation: 0, // for android

            },
            headerBackImage: () => <Image source={require("../assets/icons/back.png")} />,
            headerBackTitle: null,
            headerLeftContainerStyle: {
                alignItems: "center",
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base
            },
            headerRightContainerStyle: {
                alignItems: "center",
                paddingRight: theme.sizes.base
            },
            headerTitle: (props) => null,
        }
    }
);

export default createAppContainer(screens);
