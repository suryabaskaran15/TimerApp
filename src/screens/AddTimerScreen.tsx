import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import TimerContext from '../context/TimerContext';

const AddTimerScreen = () => {
  const { dispatch } = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleAdd = () => {
    dispatch({ type: 'ADD_TIMER',payload:{
      id: Date.now().toString(),
      name,
      duration: Number(duration),
      remaining: Number(duration),
      category: 'General',
      running:false,
      completed:false
    }});
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Duration (sec):</Text>
      <TextInput value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <Button title="Add Timer" onPress={handleAdd} />
    </View>
  );
};

export default AddTimerScreen;
