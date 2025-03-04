import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TimerContext, { Timer } from '../context/TimerContext';
import ProgressBar from './ProgressBar';

const TimerItem: React.FC<{ timer: Timer }> = ({ timer }) => {
    const { dispatch } = useContext(TimerContext);
    const [timeLeft, setTimeLeft] = useState(timer.remaining);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (timer.running) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev > 1) {
                        return prev - 1;
                    }
                    if (prev === 1) {
                        // ✅ Ensure dispatch happens outside of `setState`
                        setTimeout(() => dispatch({ type: "MARK_COMPLETED", id: timer.id }), 0);
                    }
                    return 0;
                });
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }
        return () => interval && clearInterval(interval);
    }, [timer.running]);



    useEffect(() => {
        setTimeLeft(timer.remaining); // Update timeLeft when timer is reset
    }, [timer.remaining]);

    const handleReset = () => {
        dispatch({ type: 'RESET_TIMER', id: timer.id });
        setTimeLeft(timer.duration); // Reset local state
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{timer.name} ({timeLeft}s)</Text>
            <ProgressBar progress={timeLeft / timer.duration} />
            <View style={styles.buttons}>
                <Button title={timer.running ? 'Pause' : 'Start'} onPress={() => dispatch({ type: 'TOGGLE_TIMER', id: timer.id })} />
                <Button title="Reset" onPress={handleReset} />
                <Button title="Delete" color="red" onPress={() => dispatch({ type: 'DELETE_TIMER', id: timer.id })} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10, backgroundColor: 'white', marginVertical: 5, borderRadius: 5 },
    name: { fontSize: 18, fontWeight: 'bold' },
    buttons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 },
});

export default TimerItem;
