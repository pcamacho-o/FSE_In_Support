    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';

    import HomeScreen from '../screens/HomeScreen';
    import ModulesScreen from '../screens/ModulesScreen';
    import TroubleshootScreen from '../screens/TroubleshootScreen';
    import SettingsScreen from '../screens/SettingsScreen';

    const Stack = createNativeStackNavigator();

    export default function AppNavigator() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Modules" component={ModulesScreen} />
            <Stack.Screen name="Troubleshoot" component={TroubleshootScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    );
    }
