import createWebStorage from "redux-persist/lib/storage/createWebStorage";
const createNoopSTorage = () =>{
    return {
      getItem() {
        return Promise.resolve();
      },
      setItem(_key: string, value: string) {
        return Promise.resolve(value);
      },
      removeItem() {
        return Promise.resolve();
      },
    };
}


const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopSTorage()

export default storage