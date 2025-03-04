import React, { useState, useContext } from "react";
import { View, FlatList, Button, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TimerContext from "../context/TimerContext";
import TimerItem from "../components/TimerItem";
import AddTimerModal from "../components/AddTimerModal";

const HomeScreen = () => {
    const { state } = useContext(TimerContext);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation(); // ✅ Navigation Hook

    return (
        <View style={styles.container}>
            <Button title="Add Timer" onPress={() => setModalVisible(true)} />
            
            {/* ✅ History Button */}
            <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("History")}>
                <Text style={styles.historyButtonText}>📜 View History</Text>
            </TouchableOpacity>

            <FlatList
                data={state.timers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TimerItem timer={item} />}
            />
            
            <AddTimerModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
    historyButton: {
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    historyButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;
