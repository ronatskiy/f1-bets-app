import React, { Component } from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import MobXDevTools from "mobx-react-devtools";
import DevelopmentModeAlert from "./development-mode-alert";
import { Button } from "../../../vendors";

import "./dev-tools.css";

@observer
class DevelopmentTools extends Component {
	@observable
	isVisible = false;

	toggle = action(() => {
		this.isVisible = !this.isVisible;
	});

	render() {
		return (
			<>
				{this.isVisible ? (
					<div className="dev-tools">
						<div className="dev-tools__tools">
							<DevelopmentModeAlert />
						</div>
						<Button color="danger" size="sm" className="dev-tools__close-button" onClick={this.toggle}>
							x
						</Button>
					</div>
				) : (
					<div title="Open dev tools" className="dev-tools--collapsed-mode" onClick={this.toggle}>
						open
					</div>
				)}
				<MobXDevTools />
			</>
		);
	}
}

export default DevelopmentTools;
