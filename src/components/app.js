import { h, Component } from 'preact';
import { Layout } from 'preact-mdl';

import { Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'preact-redux';

import Header from './Header';

import Login from '../routes/login';
import Main from '../routes/main';
import Profile from '../routes/profile';

import { history, store } from '../redux/store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div id="app">
                        <Layout fixed-header>
                            <Header />
                        </Layout>
                        <Layout.Content>
                            <Route path="/login/" component={Login} />
                            <Route path="/main/" component={Main} />
                            <Route exact path="/" render={() => (
                                <Redirect to="/login/" />
                            )} />
                        </Layout.Content>
                    </div>
                </Router>
            </Provider>
        );
    }
}
