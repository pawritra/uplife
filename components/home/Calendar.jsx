import { useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Pressable,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_HEIGHT = 200;
const ITEM_WIDTH = width * 0.4;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

const Calendar = ({ onIndexChange, data, initialIndex }) => {
  const flatList = useRef(null);
  const scrollX = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    scrollToIndex(initialIndex);
  }, []);

  const scrollToIndex = (index) => {
    flatList.current.scrollToIndex({ index: index, viewOffset: ITEM_SPACING });
    onIndexChange({ index: index });
  };

  const renderItem = ({ item, index }) => {
    return (
      <Card
        data={item}
        index={index}
        scrollX={scrollX}
        onClick={scrollToIndex}
      />
    );
  };

  const getItemLayout = (_, index) => ({
    offset: ITEM_SPACING + ITEM_WIDTH * index,
    length: ITEM_WIDTH,
    index,
  });

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { x: scrollX },
        },
      },
    ],
    { useNativeDriver: true }
  );

  return (
    <View>
      <Animated.FlatList
        ref={flatList}
        pagingEnabled
        horizontal
        onScroll={onScroll}
        snapToInterval={ITEM_WIDTH}
        contentContainerStyle={{
          paddingHorizontal: ITEM_SPACING,
        }}
        style={{ flexGrow: 0 }}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.toString()}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Calendar;

const Card = ({ data, index, scrollX, onClick }) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  });

  return (
    <Pressable onPress={() => onClick(index)}>
      <Animated.View style={[styles.card, { transform: [{ scale: scale }] }]}>
        <Text style={styles.cardText}>{data}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },

  cardText: {
    fontSize: 42,
    fontWeight: "bold",
  },
});
