import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";

@observer
class Index extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {}
	}

	public render() {
		return (
			<div>
				DEMO
			</div>
		)
	}
}

export default withRouter(Index);
