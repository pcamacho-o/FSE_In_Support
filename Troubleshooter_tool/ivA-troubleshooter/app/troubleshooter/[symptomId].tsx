import React, { useCallback, useMemo, useRef, useState } from "react";
<View style={styles.handle} />
<Text style={styles.moduleTitle}>{currentStep?.module ?? "Module"}</Text>
</View>


<View style={styles.sheetBody}>
<Text style={styles.instruction}>{currentStep?.instruction}</Text>
<Text style={styles.detail}>{currentStep?.detail}</Text>
{currentStep?.evidence && <Text style={styles.evidence}>Evidence: {currentStep.evidence}</Text>}


{/* special states: close / escalation */}
{currentStep?.id === "escalate" || currentStep?.id === "close" ? (
<View style={{ marginTop: 16 }}>
<Text style={{ fontWeight: "700" }}>{currentStep.instruction}</Text>
<Text style={{ marginTop: 6 }}>{currentStep.detail}</Text>
<TouchableOpacity style={styles.btnPrimary} onPress={() => router.push("/troubleshooter") }>
<Text style={styles.btnText}>Back to Symptoms</Text>
</TouchableOpacity>
</View>
) : (
<View style={styles.actionsRow}>
<TouchableOpacity style={[styles.btn, styles.fail]} onPress={() => handleResult("fail")}>
<Text style={styles.btnText}>❌ Fail</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.btn, styles.pass]} onPress={() => handleResult("pass")}>
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
handle: { width: 60, height: 6, backgroundColor: "#e5e7eb", borderRadius: 6, marginBottom: 8 },
moduleTitle: { fontSize: 16, fontWeight: "700" },
sheetBody: { flex: 1 },
instruction: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
detail: { color: "#374151", marginBottom: 8 },
evidence: { fontStyle: "italic", color: "#6b7280", marginBottom: 12 },
actionsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
btn: { flex: 1, padding: 12, borderRadius: 10, alignItems: "center", marginHorizontal: 6 },
fail: { backgroundColor: "#ef4444" },
pass: { backgroundColor: "#10b981" },
btnPrimary: { marginTop: 12, backgroundColor: "#2563eb", padding: 12, borderRadius: 10, alignItems: "center" },
btnText: { color: "white", fontWeight: "700" },
center: { flex: 1, alignItems: "center", justifyContent: "center" },
});