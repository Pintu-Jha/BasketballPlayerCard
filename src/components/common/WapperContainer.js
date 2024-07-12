import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

const WapperContainer= ({style, children}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'gray'} />
      <View
        style={{
          ...styles.container,
          ...style,
        }}>
        {children}
      </View>
    </SafeAreaView>
    //
  );
};

export default WapperContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    opacity: 1,
  },
});
