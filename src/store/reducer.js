import Actions from "./actions";

/* ---------------- Initial State ---------------- */
const Initials = {
  loading: false,
  message: [false, null],
  model: [false, null], // or modal
  screen: [null, null],
  popup: [true, "wallet"],
  token: null,
  user: {},
  data: {},
  store: {},
  cart: { items: [], amount: 0 },
  footer: true,
  cache: false,
};

/* ---------------- Reducer ---------------- */
function Reducers(state, action) {
  switch (action.type) {
    case Actions.loading: return { ...state, loading: action.payload };
    case Actions.message: return { ...state, message: action.payload };
    case Actions.data: return { ...state, data: action.payload };
    case Actions.store: return { ...state, store: action.payload };
    case Actions.user: return { ...state, user: action.payload || {} };
    case Actions.token: return { ...state, token: action.payload || null };
    case Actions.model: return { ...state, model: action.payload };
    case Actions.screen: return { ...state, screen: action.payload };
    case Actions.footer: return { ...state, footer: action.payload };
    case Actions.cache: return { ...state, cache: action.payload };
    case Actions.cart: return { ...state, cart: action.payload || { items: [], amount: 0 } };
    default: return state;
  }
}
export { Reducers, Initials };
