import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import registerServiceWorker from "./registerServiceWorker";
import configProvider from "./config/config";

import "./vendor/index";

import AppComponent from "./ui/components/app";
import Application from "./application";
import ScrollToTop from "./ui/components/common/scroll-to-top";

configure({ enforceActions: "strict" });

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
