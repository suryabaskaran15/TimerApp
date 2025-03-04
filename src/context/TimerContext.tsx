import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Timer types
export interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  category: string;
  running: boolean;
  completed: boolean;
}

type State = { timers: Timer[] };

type Action =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'TOGGLE_TIMER'; id: string }
  | { type: 'RESET_TIMER'; id: string }
  | { type: 'DELETE_TIMER'; id: string }
  | { type: 'LOAD_TIMERS'; payload: Timer[] };

const TimerContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: { timers: [] }, dispatch: () => { } });

const timerReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TIMER':
      return { timers: [...state.timers, action.payload] };

    case 'TOGGLE_TIMER':
      return {
        timers: state.timers.map(timer =>
          timer.id === action.id ? { ...timer, running: !timer.running } : timer
        ),
      };

    case 'RESET_TIMER': // ✅ Fix: Stop the timer and reset remaining time
      return {
        timers: state.timers.map(timer =>
          timer.id === action.id
            ? { ...timer, remaining: timer.duration, running: false } // Stop running when reset
            : timer
        ),
      };

    case 'DELETE_TIMER':
      return { timers: state.timers.filter(timer => timer.id !== action.id) };

    case 'LOAD_TIMERS':
      return { timers: action.payload };

    default:
      return state;
  }
};


export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, { timers: [] });

  useEffect(() => {
    const loadTimers = async () => {
      const data = await AsyncStorage.getItem('timers');
      if (data) {
        dispatch({ type: 'LOAD_TIMERS', payload: JSON.parse(data) });
      }
    };
    loadTimers();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('timers', JSON.stringify(state.timers));
  }, [state.timers]);

  return <TimerContext.Provider value={{ state, dispatch }}>{children}</TimerContext.Provider>;
};

export default TimerContext;
