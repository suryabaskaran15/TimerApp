import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TimerContext from "../context/TimerContext";

const HistoryScreen = () => {
    const { state } = useContext(TimerContext);

    // Filter completed timers
    const completedTimers = state.timers.filter(timer => timer.completed);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Completed Timers</Text>
            {completedTimers.length === 0 ? (
                <Text style={styles.noHistory}>No completed timers yet</Text>
            ) : (
                <FlatList
                    data={completedTimers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.timerItem}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.duration}>Duration: {item.duration}s</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "white" },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    noHistory: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 20 },
    timerItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
    name: { fontSize: 18, fontWeight: "bold" },
    duration: { fontSize: 16, color: "gray" },
});

export default HistoryScreen;
