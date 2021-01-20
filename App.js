import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Easing,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';

import faker from 'faker';
import BG_IMG from './assets/background.jpg';

const { width, height } = Dimensions.get('screen');

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <Image
        source={BG_IMG}
        blurRadius={30}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 3)
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1)
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          })

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          })

          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,

                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255, 0.8)',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                opacity,
                shadowRadius: 20,
                shadowOpacity: .3,
                transform: [{ scale }]
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />

              <View>
                <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
                <Text style={{ fontSize: 18, opacity: .7 }}>{item.jobTitle}</Text>
                <Text style={{ fontSize: 14, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
              </View>
            </Animated.View>
          )
        }}
      />
    </View>)
}