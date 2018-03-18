import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "mobx-react";

import "bootstrap/dist/css/bootstrap.css";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

import RootStore from "./store/root-store";
import App from "./app/app";

const stores = {
	rootStore: new RootStore(),
};

ReactDOM.render(
	<Provider {...stores}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root"),
);
registerServiceWorker();
