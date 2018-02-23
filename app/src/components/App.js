import { h, Component } from 'preact';
import { Layout } from 'preact-mdl';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'preact-redux';

import Header from './Header';
import Drawer from './Drawer';

import Login from '../routes/login';
import Main from '../routes/main';

import store from '../redux/store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div id="app">
                        <Route path="/login/" render={({ history }) => (
                            <Layout fixed-header>
                                <Header />
                                <Layout.Content>
                                    <Login history={history} />
                                </Layout.Content>
                            </Layout>
                        )} />
                        <Route path="/main/" render={() => (
                            <Layout fixed-header>
                                <Header />
                                <Drawer />
                                <Layout.Content>
                                    <Main />
                                </Layout.Content>
                            </Layout>
                        )} />
                        <Route exact path="/" render={() => (
                            <Redirect to="/login/" />
                        )} />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
