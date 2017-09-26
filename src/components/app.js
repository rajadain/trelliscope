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
                        <Route path="/login/" render={() => (
                            <Layout fixed-header>
                                <Header />
                                <Layout.Content>
                                    <Login />
                                </Layout.Content>
                            </Layout>
                        )} />
                        <Route path="/main/" render={() => (
                            <Layout fixed-header>
                                <Header />
                                <Layout.Content>
                                    <Main />
                                </Layout.Content>
                            </Layout>
                        )} />
                        <Route exact path="/" render={() => (
                            <Redirect to="/login/" />
                        )} />
                    </div>
                </Router>
            </Provider>
        );
    }
}
