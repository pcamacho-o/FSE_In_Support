    import { View, Text, Button } from "react-native";

    export default function ModulesScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Select a Module</Text>
        <Button
            title="Power Supply"
            onPress={() =>
            navigation.navigate("Troubleshoot", { moduleKey: "power_supply" })
            }
        />
        <View style={{ marginVertical: 10 }} />
        <Button
            title="Barcode Reader"
            onPress={() =>
            navigation.navigate("Troubleshoot", { moduleKey: "barcode_reader" })
            }
        />
        </View>
    );
    }
