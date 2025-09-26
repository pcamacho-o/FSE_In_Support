import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";


export default function Layout(props: any) {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <View style={styles.flex}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
flex: { flex: 1 },
});
