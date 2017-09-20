import { h, Component } from 'preact';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Layout } from 'preact-mdl';
import { createStore } from 'redux';

import Header from './header';
import Login from '../routes/login';
import Main from '../routes/main';
import Profile from '../routes/profile';

import reducer from '../redux/reducer';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
    render() {
        return (
            <Router>
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
        );
    }
}
