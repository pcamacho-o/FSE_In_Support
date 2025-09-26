    import React, { useState } from "react";
    import { View, Text, Button } from "react-native";
    import troubleshootingData from "../data/troubleshooting.json";

    export default function TroubleshootScreen() {
    const module = troubleshootingData.power_supply; // later pick dynamically
    const [currentStepId, setCurrentStepId] = useState(1);

    const currentStep = module.steps.find(step => step.id === currentStepId);

    const handleAnswer = (answer) => {
        const next = currentStep[answer];
        if (typeof next === "number") {
        setCurrentStepId(next);
        } else {
        alert(next); // final message
        setCurrentStepId(1); // reset
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
            {module.symptom}
        </Text>

        <Text style={{ fontSize: 18, marginBottom: 20 }}>
            {currentStep.question}
        </Text>

        <Button title="Yes" onPress={() => handleAnswer("yes")} />
        <View style={{ marginVertical: 10 }} />
        <Button title="No" onPress={() => handleAnswer("no")} />
        </View>
    );
    }
