import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity, KeyboardAvoidingView
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const { width, height } = Dimensions.get("window");

class Browse extends Component {
  state = {
    active: "Garden",
    subData: [],
    data: []
  };

  constructor(props) {
    super(props);
  }

  refreshData = () => {
    fetch('http://192.168.1.140:3000/plants/all')
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data: data});
          this.setState({ subData: data.filter(d => d.zone === this.state.active)});
        })
        .catch(error => {
          console.log(error)
        }) }

  componentDidMount() {
    this.refreshData()
  }

  handleTab = tab => {
    this.setState({ active: tab, subData: this.state.data.filter(d => d.zone === tab)});
    this.refreshData()
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
        <TouchableOpacity
            key={`tab-${tab}`}
            onPress={() => this.handleTab(tab)}
            style={[styles.tab, isActive ? styles.active : null]}
        >
          <Text size={16} medium gray={!isActive} secondary={isActive}>
            {tab}
          </Text>
        </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;
    const { subData, data } = this.state;
    const tabs = ["Garden", "Kitchen", "Balcony"];

    return (
        <Block>
          <Block flex={false} row center space="between" style={styles.header}>
            <Text h1 bold>
              Home
            </Text>
            <Block padding={[0, 0, 0, 100]}>
              <Button gradient onPress={() => navigation.navigate("Explore", {zone : this.state.active})} >
                <Text center semibold white>
                  Explore
                </Text>
              </Button>
            </Block>
          </Block>

          <Block flex={false} row style={styles.tabs}>
            {tabs.map(tab => this.renderTab(tab))}
          </Block>

          <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ paddingVertical: theme.sizes.base * 2 }}
          >
            <Block flex={false} row space="between" style={styles.categories}>
              {subData.map(category => (
                  <TouchableOpacity
                      key={category.name}
                      onPress={() => navigation.navigate("UpdatePlant", { plant : category })}
                  >
                    <Card center middle shadow style={styles.category}>
                      <Badge
                          margin={[0, 0, 15]}
                          size={50}
                          color="rgba(41,216,143,0.20)"
                      >
                        <Image source={require("../assets/icons/flowers.png")} />
                      </Badge>
                      <Text medium height={20}>
                        {category.name}
                      </Text>
                    </Card>
                  </TouchableOpacity>
              ))}

            </Block>

            <LinearGradient
                locations={[0.5, 1]}
                style={styles.add}
                colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
            >
              <Button gradient style={{ width: width / 2.678 }}  onPress={() => {
                navigation.navigate("AddPlant", {
                  zone : this.state.active
                })
              }}>
                <Text bold white center>
                  Add
                </Text>
              </Button>
            </LinearGradient>

          </ScrollView>

        </Block>
    );
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories
};

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 1
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  add: {
    bottom: 0,
    right: 0,
    left: 0,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4,
  }
});
