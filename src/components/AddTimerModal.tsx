import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import TimerContext from '../context/TimerContext';
import uuid from 'react-native-uuid';

interface AddTimerModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddTimerModal: React.FC<AddTimerModalProps> = ({ visible, onClose }) => {
  const { dispatch } = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleAddTimer = () => {
    if (!name || !duration || !category || isNaN(Number(duration))) {
      alert('Please fill all fields correctly');
      return;
    }

    dispatch({
      type: 'ADD_TIMER',
      payload: {
        id: uuid.v4() as string, // Generate a valid unique ID
        name,
        duration: Number(duration),
        remaining: Number(duration),
        category,
        running: false,
        completed: false,
      },
    });

    // Reset fields and close modal
    setName('');
    setDuration('');
    setCategory('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add New Timer</Text>
          <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
          <TextInput
            placeholder="Duration (in seconds)"
            style={styles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />
          <TextInput placeholder="Category" style={styles.input} value={category} onChangeText={setCategory} />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Add" onPress={handleAddTimer} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AddTimerModal;
