import { h, Component } from 'preact';
import { Layout, Navigation } from 'preact-mdl';

export default class Header extends Component {
    render() {
        return (
            <Layout.Header>
                <Layout.HeaderRow>
                    <Layout.Title>Trelliscope</Layout.Title>
                    <Layout.Spacer />
                    <Navigation>
                        <Navigation.Link href="/login">Login</Navigation.Link>
                        <Navigation.Link href="/profile">Profile</Navigation.Link>
                        <Navigation.Link href="/profile/john">John</Navigation.Link>
                    </Navigation>
                </Layout.HeaderRow>
            </Layout.Header>
        );
    }
}
