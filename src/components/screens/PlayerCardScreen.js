import {View, Animated, PanResponder} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Card from '../common/Card';
import WapperContainer from '../common/WapperContainer';

const PlayerCardScreen = () => {
  const [data, setData] = useState([
    {
      image:
        'https://assets.website-files.com/5ddabea1cd7d37be3420fcd0/5e28f51874cbda647715c6ce_image-asset.png',
      position: 'Forward',
      stats: {pointsPerGame: 25.4, assistsPerGame: 7.1, reboundsPerGame: 10.5},
      name: 'LeBron James',
      id: 1,
    },
    {
      name: 'Tim Duncan',
      image:
        'https://s.wsj.net/public/resources/images/BN-OW027_GAY071_P_20160711160359.jpg',
      position: 'Power forward',
      stats: {pointsPerGame: 25.4, assistsPerGame: 7.1, reboundsPerGame: 10.5},
      id: 2,
    },
    {
      name: 'Larry Bird',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQKlKVngcy940b8ZW2JLW6v8WHySwPbMlTw&s',
      position: 'Forward',
      stats: {pointsPerGame: 25.4, assistsPerGame: 7.1, reboundsPerGame: 10.5},
      id: 3,
    },
  ]);
  useEffect(() => {
    if (!data.length) {
      setData([
        {
          image:
            'https://assets.website-files.com/5ddabea1cd7d37be3420fcd0/5e28f51874cbda647715c6ce_image-asset.png',
          position: 'Forward',
          stats: {pointsPerGame: 25.4, assistsPerGame: 7.1, reboundsPerGame: 10.5},
          name: 'LeBron James',
          id: 1,
        },
        {
          name: 'Tim Duncan',
          image:
            'https://s.wsj.net/public/resources/images/BN-OW027_GAY071_P_20160711160359.jpg',
          position: 'Power forward',
          stats: {pointsPerGame: 25.4, assistsPerGame: 7.1, reboundsPerGame: 10.5},
          id: 2,
        },
        {
          name: 'Larry Bird',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQKlKVngcy940b8ZW2JLW6v8WHySwPbMlTw&s',
          position: 'Forward',
          stats: {pointsPerGame: 25.4, assistsPerGame: 7.1, reboundsPerGame: 10.5},
          id: 3,
        },
      ]);
    }
  }, [data]);
  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      swipe.setValue({x: dx, y: dy});
    },

    onPanResponderRelease: (_, {dx, dy}) => {
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeCard = useCallback(() => {
    setData(prepState => prepState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  return (
    <WapperContainer style={{flex: 1}}>
      {data
        .map((item, index) => {
          let isFirst = index === 0;
          let dragHanlders = isFirst ? panResponser.panHandlers : {};
          return (
            <Card
              item={item}
              rotate={rotate}
              isFirst={isFirst}
              swipe={swipe}
              {...dragHanlders}
              key={item.id}
            />
          );
        })
        .reverse()}
    </WapperContainer>
  );
};

export default PlayerCardScreen;
