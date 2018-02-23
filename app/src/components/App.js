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
                        <Layout fixed-header>
                            <Header />
                            <Route path="/main/" component={Drawer} />
                            <Layout.Content>
                                <Route path="/login/" component={Login} />
                                <Route path="/main/" component={Main} />
                            </Layout.Content>
                        </Layout>
                        <Route exact path="/" render={() => (
                            <Redirect to="/login/" />
                        )} />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
