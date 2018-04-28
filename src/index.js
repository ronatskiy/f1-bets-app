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
import ScrollToTop from "./components/common/scroll-to-top";

useStrict(true);

const app = new Application({ configProvider });
const stores = app.getStores();

ReactDOM.render(
	<Provider {...stores}>
		<Router>
			<ScrollToTop>
				<AppComponent />
			</ScrollToTop>
		</Router>
	</Provider>,
	document.getElementById("root"),
);
registerServiceWorker();
