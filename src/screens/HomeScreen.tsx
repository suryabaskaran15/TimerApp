import React, { useState, useContext } from 'react';
import { View, FlatList, Button } from 'react-native';
import TimerContext from '../context/TimerContext';
import TimerItem from '../components/TimerItem';
import AddTimerModal from '../components/AddTimerModal';

const HomeScreen = () => {
    const { state } = useContext(TimerContext);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Button title="Add Timer" onPress={() => setModalVisible(true)} />
            <FlatList
                data={state.timers}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TimerItem timer={item} />}
            />
            <AddTimerModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
};

export default HomeScreen;
