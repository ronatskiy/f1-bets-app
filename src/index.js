import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import registerServiceWorker from "./registerServiceWorker";
import configProvider from "./config/config";

import "./vendor/index";

import AppComponent from "./components/app";
import Application from "./application";

useStrict(true);

const app = new Application({ configProvider });
const stores = app.getStores();

ReactDOM.render(
	<Provider {...stores}>
		<Router>
			<AppComponent />
		</Router>
	</Provider>,
	document.getElementById("root"),
);
registerServiceWorker();
