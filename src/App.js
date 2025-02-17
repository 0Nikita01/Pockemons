import {useLocation, Route, Switch, Redirect} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import Footer from './components/Footer';
import MenuHeader from './components/MenuHeader';
import GamePage from './routes/Game';
import HomePage from './routes/Home';
import NotFound from './routes/NotFound';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import PrivateRoute from './components/PrivateRoute';
import cn from 'classnames';
import s from './App.module.css';
import 'react-notifications/lib/notifications.css';
import { FireBaseContext } from './context/firebaseContext';
import FirebaseClass from './service/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserAsync, selectUserLoading } from './store/user';
import Spinner from "./components/Spinner";
import UserPage from './routes/UserPage';

const App = () => {
	const isUserLoading = useSelector(selectUserLoading);
	const location = useLocation();
	const isPadding = location.pathname === '/' || location.pathname === '/game/board';
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserAsync());
	}, []);


	if (isUserLoading)
	{
		return <Spinner />
	}

	return (
		<FireBaseContext.Provider value={FirebaseClass}>
			<Switch>
				<Route path="/404" component={NotFound}/>
				<Route>
					<>
						<MenuHeader bgActive={!isPadding}/>
						<div className={cn(s.wrap, {[s.isHomePage]: isPadding})}>
							<Switch>
								<Route path="/" exact component={HomePage} />
								<Route path="/home" render={() => (<Redirect to="/" />)} />
								<PrivateRoute path="/game" component={GamePage} />
								<PrivateRoute path="/about" component={AboutPage} />
								<PrivateRoute path="/contact" component={ContactPage} />
								<PrivateRoute path="/user" component={UserPage} />
								<Route render={() => (
									<Redirect to="/404" />
								)} />
							</Switch>
						</div>
					</>
				</Route>
				
			</Switch>
			<NotificationContainer />
		</FireBaseContext.Provider>
	)
};

export default App;