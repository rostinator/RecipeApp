import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-blue">
      <Text className="bg-slate-500">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}