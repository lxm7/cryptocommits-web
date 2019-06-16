export const fromStorage = () => {
    try {
        const serialisedData = window.localStorage.getItem('watchList');
        if (serialisedData === null) {
            return [];
        }
        return JSON.parse(serialisedData);
    } catch (err) {
        return [];
    }
};

