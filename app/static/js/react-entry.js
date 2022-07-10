const ReactDOM = require("react-dom");
const React = require("react");
const { HashRouter, Route, Switch } = require("react-router-dom");

import Login from "../components/LoginPage";
import Index from "../components/IndexPage";
import Mods from "../components/Mods";

ReactDOM.render(
	<HashRouter>
		<Switch>
			<Route path="/" exact={true} component={Login} />
			<Route path="/dashboard" exact={true} component={Index} />
			<Route path="/mods" exact={true} component={Mods} />
		</Switch>
	</HashRouter>,
	document.body
);
