import App from "@components/app/App";
import PageLoading from "@components/load";
import NotFound from "@components/NotFound";
import DataImport from "@views/basic/data/DataImport";
import InvoiceList from "@views/basic/invoice/InvoiceList";
import Login from "@views/login/Login";
import EmployeeManage from "@views/management/employee/EmployeeManage";
import RoleManage from "@views/management/role/RoleManage";
import { createBrowserHistory } from "history";
import { parse } from "qs";
import React from "react";
import Loadable from "react-loadable";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { Paths, RoutePaths } from './const';

const history = createBrowserHistory();

const addLocationQuery = (nextHistory) => {
	nextHistory.location = {
		...nextHistory.location,
		query: parse(nextHistory.location.search.substr(1)),
	};
};

addLocationQuery(history);

history.listen(() => addLocationQuery(history));
//
// const Login = Loadable({
// 	loader: () => import("@views/login/Login"),
// 	loading: PageLoading,
// });

const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<Route exact={true} path={RoutePaths[Paths.LOGIN]} component={Login}/>
			<App>
				<Switch>
					<Route exact={true} path={RoutePaths[Paths.ROLE_MANAGE]} component={RoleManage}/>
					<Route exact={true} path={RoutePaths[Paths.EMPLOYEE_MANAGE]} component={EmployeeManage}/>
					<Redirect exact={true} from={RoutePaths[Paths.INDEX]} to={RoutePaths[Paths.ROLE_MANAGE]}/>
					<Route exact={true} path={RoutePaths[Paths.BASIC_IMPORT]} component={DataImport}/>
					<Route exact={true} path={RoutePaths[Paths.INVOICE_MANAGE]} component={InvoiceList}/>
					<Route path={"*"} component={NotFound}/>
				</Switch>
			</App>
		</Switch>
	</Router>
);

export default AppRouter;