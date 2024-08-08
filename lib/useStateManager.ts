import { useState, useRef, useCallback, useEffect } from 'react';

export default function useStateManager<T extends { id: string }>(
  initialData: T[]
) {
  const [state, setState] = useState<Map<string, T>>(() => {
    const initialState = new Map<string, T>();
    initialData.forEach((item) => initialState.set(item.id, item));
    return initialState;
  });
  const updateQueue = useRef<Set<string>>(new Set());

  useEffect(() => {
    const initialState = new Map<string, T>();
    initialData.forEach((item) => initialState.set(item.id, item));
    setState(initialState);
  }, [initialData]);

  const handleStateChange = useCallback(
    (itemId: string, newState: Partial<T>) => {
      setState((prevState) => {
        const newStateMap = new Map(prevState);
        const item = newStateMap.get(itemId);
        if (item) {
          newStateMap.set(itemId, { ...item, ...newState });
        }
        return newStateMap;
      });

      updateQueue.current.add(itemId);
    },
    []
  );

  const handlePushState = useCallback((newItems: T[]) => {
    setState((prevState) => {
      const newStateMap = new Map(prevState);
      newItems.forEach((item) => {
        newStateMap.set(item.id, item);
      });
      return newStateMap;
    });
  }, []);

  const getUpdateQueue = useCallback(() => {
    const itemsToProcess = Array.from(updateQueue.current);
    updateQueue.current.clear();
    return itemsToProcess;
  }, []);

  return {
    state,
    handleStateChange,
    handlePushState,
    getUpdateQueue,
  };
}
