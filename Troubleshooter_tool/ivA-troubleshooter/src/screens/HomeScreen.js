    import { View, Text, Button } from 'react-native';

    export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 22, marginBottom: 20 }}>
            ivA Troubleshooter
        </Text>
        <Button
            title="Go to Modules"
            onPress={() => navigation.navigate('Modules')}
        />
        </View>
    );
    }
