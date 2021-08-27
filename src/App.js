import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-contex';

function App() {
    const authCxt = useContext(AuthContext);

    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/auth'>
                    <AuthPage />
                </Route>

                <Route path='/profile'>
                    {authCxt.isLoggedIn && <UserProfile />}
                    {!authCxt.isLoggedIn && (
                        <Redirect to='/auth'></Redirect>
                    )}
                </Route>

                <Route path='*'>
                    <Redirect to='/'></Redirect>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
