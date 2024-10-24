import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { createRoot } from "react-dom/client";
import seatReducer from "./redux/seatReducer.jsx";

let rootReducer = combineReducers({ seatReducer });
let store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
