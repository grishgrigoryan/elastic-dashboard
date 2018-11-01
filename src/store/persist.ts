import {throttle} from '../helpers/throttle';

export const persist = ({key, blacklist = [], whitelist = []}: { key: string, blacklist?: string[], whitelist?: string[] }) => {
  return next => (reducer, initialState) => {
    if (!window.localStorage) {
      return next(reducer, initialState);
    }
    let persistedState = JSON.parse(localStorage.getItem(key));
    let finalInitialState = persistedState ? {...initialState, ...persistedState} : initialState;

    const store = next(reducer, finalInitialState);
    const exclude = (obj, keys) => {
      if (!keys.length) return obj;
      let target = {};
      for (let i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    };
    const saveStore = (state) => {
      const target = exclude(state, blacklist);
      blacklist.forEach(path => {
        let route = path.split('.');
        if (route.length == 2) {
          target[route[0]] = exclude(target[route[0]], [route[1]])
        }
      });
      const data = {};
      whitelist.forEach(path => {
        data[path] = target[path];
      });
      localStorage.setItem(key, JSON.stringify(data));
    };

    store.subscribe(throttle(() => {
      const state = store.getState();
      saveStore(state);
    }, 1000));
    return store
  }
};
