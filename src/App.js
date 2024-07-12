import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlayerCardScreen  from './components/screens/PlayerCardScreen'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
     <PlayerCardScreen/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})