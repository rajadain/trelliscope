import { h, Component } from 'preact';
import { Layout, Navigation } from 'preact-mdl';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <Layout.Header>
                <Layout.HeaderRow>
                    <Layout.Title>Trelliscope</Layout.Title>
                    <Layout.Spacer />
                    <Navigation>
                        <Link to="/login">Login</Link>
                    </Navigation>
                </Layout.HeaderRow>
            </Layout.Header>
        );
    }
}
