    import React, { useCallback, useMemo, useRef, useState } from "react";
    import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    } from "react-native";
    import BottomSheet from "@gorhom/bottom-sheet";
    import { useLocalSearchParams, useRouter } from "expo-router";
    import {
    getSymptomById,
    getFirstStep,
    getNext,
    getModuleImage,
    } from "../../utils/flow";

    const { height } = Dimensions.get("window");

    export default function SymptomFlowScreen() {
    const { symptomId } = useLocalSearchParams() as { symptomId: string };
    const router = useRouter();
    const symptom = getSymptomById(symptomId);
    const [currentStep, setCurrentStep] = useState(() => getFirstStep(symptomId));

    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => [0.22 * height, 0.7 * height], []);

    const moduleImage = getModuleImage(
        currentStep?.module ?? symptom?.module_hint?.[0]
    );

    const handleResult = useCallback(
        (result: "pass" | "fail") => {
        if (!currentStep) return;
        const nextId =
            result === "pass" ? currentStep.on_pass_next : currentStep.on_fail_next;
        const next = getNext(symptomId, nextId);
        if (!next) return;
        setCurrentStep(next);
        // when next is close or escalate we keep sheet open at large
        setTimeout(() => sheetRef.current?.snapToIndex(1), 300);
        },
        [currentStep, symptomId]
    );

    if (!symptom)
        return (
        <View style={styles.center}>
            <Text>Symptom not found</Text>
        </View>
        );

    return (
        <View style={styles.flex}>
        <ImageBackground
            source={moduleImage}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlayTop} />
            <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            >
            <View style={styles.sheetInner}>
                <View style={styles.sheetHeader}>
                <View style={styles.handle} />
                <Text style={styles.moduleTitle}>
                    {currentStep?.module ?? "Module"}
                </Text>
                </View>

                <View style={styles.sheetBody}>
                <Text style={styles.instruction}>{currentStep?.instruction}</Text>
                <Text style={styles.detail}>{currentStep?.detail}</Text>
                {currentStep?.evidence && (
                    <Text style={styles.evidence}>
                    Evidence: {currentStep.evidence}
                    </Text>
                )}

                {/* special states: close / escalation */}
                {currentStep?.id === "escalate" || currentStep?.id === "close" ? (
                    <View style={{ marginTop: 16 }}>
                    <Text style={{ fontWeight: "700" }}>
                        {currentStep.instruction}
                    </Text>
                    <Text style={{ marginTop: 6 }}>{currentStep.detail}</Text>
                    <TouchableOpacity
                        style={styles.btnPrimary}
                        onPress={() => router.push("/troubleshooter")}
                    >
                        <Text style={styles.btnText}>Back to Symptoms</Text>
                    </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actionsRow}>
                    <TouchableOpacity
                        style={[styles.btn, styles.fail]}
                        onPress={() => handleResult("fail")}
                    >
                        <Text style={styles.btnText}>❌ Fail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, styles.pass]}
                        onPress={() => handleResult("pass")}
                    >
                        <Text style={styles.btnText}>✅ Pass</Text>
                    </TouchableOpacity>
                    </View>
                )}
                </View>
            </View>
            </BottomSheet>
        </ImageBackground>
        </View>
    );
    }

    const styles = StyleSheet.create({
    flex: { flex: 1 },
    background: { flex: 1, justifyContent: "flex-end" },
    overlayTop: { height: 40 },
    sheetInner: { flex: 1, paddingHorizontal: 16 },
    sheetHeader: { alignItems: "center", marginBottom: 8 },
    handle: {
        width: 60,
        height: 6,
        backgroundColor: "#e5e7eb",
        borderRadius: 6,
        marginBottom: 8,
    },
    moduleTitle: { fontSize: 16, fontWeight: "700" },
    sheetBody: { flex: 1 },
    instruction: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
    detail: { color: "#374151", marginBottom: 8 },
    evidence: { fontStyle: "italic", color: "#6b7280", marginBottom: 12 },
    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    btn: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 6,
    },
    fail: { backgroundColor: "#ef4444" },
    pass: { backgroundColor: "#10b981" },
    btnPrimary: {
        marginTop: 12,
        backgroundColor: "#2563eb",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    btnText: { color: "white", fontWeight: "700" },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    });
