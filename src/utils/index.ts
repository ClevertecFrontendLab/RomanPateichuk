export const getStorageItem = (storage: Storage, item: string) => {
    try {
        const localStorageItem = storage.getItem(item);
        return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch {
        return null;
    }
};
