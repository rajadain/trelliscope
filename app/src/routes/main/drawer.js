import { h, Component } from 'preact';
import { Layout, Navigation } from 'preact-mdl';
import { connect } from 'preact-redux';

class Drawer extends Component {
    render({ layerNames: { data }}) {
        const links = data ? data.filter(d => !d.active).map(d => (
            <Navigation.Link>
                {d.name}
            </Navigation.Link>
        )) : (
            <Navigation.Link>
                No Layers Loaded
            </Navigation.Link>
        );

        return (
            <Layout.Drawer>
                <Layout.Title>Add Layer</Layout.Title>
                <Navigation>
                    {links}
                </Navigation>
            </Layout.Drawer>
        );
    }
}

const mapStateToProps = (state) => ({
    layerNames: state.layerNames,
});

export default connect(mapStateToProps)(Drawer);
