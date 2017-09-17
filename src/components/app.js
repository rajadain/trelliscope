import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Layout } from 'preact-mdl';

import Header from './header';
import Login from '../routes/login';
import Main from '../routes/main';
import Profile from '../routes/profile';
import Redirect from './redirect';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
    /** Gets fired when the route changes.
     *  @param {Object} event       "change" event from [preact-router](http://git.io/preact-router)
     *  @param {string} event.url   The newly routed URL
     */
    handleRoute = e => {
        this.currentUrl = e.url;
    };

    render() {
        return (
            <div id="app">
                <Layout fixed-header>
                    <Header />
                </Layout>
                <Layout.Content>
                    <Router onChange={this.handleRoute}>
                        <Login path="/login/" />
                        <Main path="/main/" />
                        <Profile path="/profile/" user="me" />
                        <Profile path="/profile/:user" />
                        <Redirect path="/" to="/login/" />
                    </Router>
                </Layout.Content>
            </div>
        );
    }
}
