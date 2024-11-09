import React, { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.warn('Error reading localStorage key:', key, error);
      return defaultValue as T;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('Error setting localStorage key:', key, error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? (JSON.parse(event.newValue) as T) : defaultValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn('Error parsing localStorage key:', key, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, defaultValue]);

  return [storedValue, setStoredValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}

export default useLocalStorage;
