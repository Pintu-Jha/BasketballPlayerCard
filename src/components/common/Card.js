import {
  Image,
  Dimensions,
  Animated,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from '../../style/responsiveStyles';

const {height, width} = Dimensions.get('window');
const Card = ({item, isFirst, swipe, ...rest}) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const imageSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            opacity: nopeOpacity,
          }}>
          <Image
            source={require('../../images/wrong.png')}
            style={{tintColor: 'red', width: scale(80), height: scale(80)}}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            opacity: likeOpacity,
          }}>
          <Image
            source={require('../../images/right.png')}
            style={{width: scale(80), height: scale(80)}}
          />
        </Animated.View>
      </>
    );
  }, []);
  return (
    <Animated.View
      style={[
        {
          alignSelf: 'center',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#000',
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...rest}>
      <View
        style={{
          borderWidth: 1,
          width: scale(width) / 1.1,
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            width: scale(width) / 1.1,
            height: verticalScale(height) / 1.1,
            resizeMode: 'cover',
          }}
        />

        {isFirst && imageSelection()}
        <Text
          style={{
            fontSize: textScale(20),
            color: '#fff',
            marginTop: moderateScale(15),
            fontWeight: '800',
            alignSelf: 'center',
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: textScale(18),
            color: '#fff',
            fontWeight: '600',
            marginTop: moderateScale(15),
            alignSelf: 'center',
          }}>
          {item.position}
        </Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>
            Points per game: {item.stats.pointsPerGame}
          </Text>
          <Text style={styles.stats}>
            Assists per game: {item.stats.assistsPerGame}
          </Text>
          <Text style={styles.stats}>
            Rebounds per game: {item.stats.reboundsPerGame}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: scale(width),
    height: verticalScale(height) / 1.2,
    resizeMode: 'cover',
  },
  name: {
    fontSize: textScale(25),
    fontWeight: 'bold',
    color: '#fff',
    opacity: 0.9,
  },
  position: {
    fontSize: textScale(20),
    fontWeight: '800',
    color: '#fff',
    opacity: 0.8,
  },
  statsContainer: {
    width: scale(width) / 1.1,
    marginTop: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    fontSize: textScale(16),
    marginBottom: moderateScale(6),
    color: '#fff',
    fontWeight: '500',
    opacity: 0.6,
  },
});

export default Card;
