import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getSymptoms } from "../utils/flow";


export default function TroubleshooterList() {
const router = useRouter();
const symptoms = getSymptoms();


return (
<View style={styles.container}>
<Text style={styles.title}>Select a symptom to troubleshoot</Text>
<FlatList
data={symptoms}
keyExtractor={(i) => i.id}
contentContainerStyle={{ padding: 12 }}
renderItem={({ item }) => (
<TouchableOpacity
style={styles.card}
onPress={() => router.push({ pathname: "/troubleshooter/[symptomId]", params: { symptomId: item.id } })}
>
<Text style={styles.cardTitle}>{item.label}</Text>
<Text style={styles.cardSubtitle}>{item.id}</Text>
</TouchableOpacity>
)}
/>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: "#f8fafc" },
title: { fontSize: 18, fontWeight: "700", padding: 12 },
card: { backgroundColor: "white", padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
cardTitle: { fontSize: 16, fontWeight: "700" },
cardSubtitle: { marginTop: 6, color: "#6b7280" },
});