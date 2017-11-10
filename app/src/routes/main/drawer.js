import { h, Component } from 'preact';
import { Layout, Navigation } from 'preact-mdl';
import { connect } from 'preact-redux';

import LayerEntry from '../../components/LayerEntry';

class Drawer extends Component {
    render({ layerNames: { data }}) {
        const empty = (<Navigation.Link>No Layers Loaded</Navigation.Link>),
              links = !data ? empty :
                      data.map(({ active, title }, index) => (
                              <LayerEntry key={index}
                                          index={index}
                                          title={title}
                                          active={active}
                              />));

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
