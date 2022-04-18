// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

const ws = new WebSocket('ws://178.18.243.134:9090');

// define your typings for the store state
export interface State {
  ws_open: boolean,
  count: number,
  userState: {

  }
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    userState : {},
    ws_open: false,
  },
  mutations: {
    nullOperate() {}
  },
  actions: {
    login({commit}, {username, password}) {
      if(this.state.ws_open == false) return; 

      ws.send(JSON.stringify({
        action: 'LOGIN',
        parameters: {
          usr: username,
          passwd: password
        }
      }));

      commit('nullOperate')
    }
  }
})

ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  console.log(msg);
  if(msg.action === undefined) return;

  switch(msg.action) {
    case 'stateDump': 
      store.state.userState = msg;
      break;
    default:
      break;
  }
}

ws.onopen = () => {
  store.state.ws_open = true;
}

ws.onclose = () => {
  store.state.ws_open = false;
}