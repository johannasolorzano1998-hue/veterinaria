import { useState } from "react";

// administra datos del local storage
export const useLocalStorage = (key: string) => {
  // estado inicial de valor [key] ingresado
  const [storedValue, setStoredValue] = useState<any | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const user = localStorage.getItem(key);
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  });

  // cambia el estado del valor [key] ingresado
  const setValue = (userToStore: any) => {
    if (typeof window !== "undefined") {
      try {
        setStoredValue(userToStore);
        localStorage.setItem(key, JSON.stringify(userToStore));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // remueve el valor [key] ingresado
  const removeValue = () => {
    if (typeof window !== "undefined") {
      setStoredValue(null);
      localStorage.removeItem(key);
    }
  };

  return { storedValue, setValue, removeValue };
};
