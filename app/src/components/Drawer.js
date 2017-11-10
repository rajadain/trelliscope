import { h, Component } from 'preact';
import { Layout, Navigation, TextField } from 'preact-mdl';
import { connect } from 'preact-redux';

import LayerEntry from './LayerEntry';

class Drawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: "",
        };
    }

    onFilter = (e) => {
        this.setState({ filterText: e.target.value });
    }

    render({ layerNames: { data }}, { filterText }) {
        const empty = (<Navigation.Link>No Layers Loaded</Navigation.Link>),
              links = data.length === 0 ? empty :
                      data.map(({ active, title }, index) => {
                              if (!filterText || title.indexOf(filterText) > -1) {
                                  return <LayerEntry
                                             key={index}
                                             index={index}
                                             title={title}
                                             active={active}
                                         />;
                              }
                          });

        return (
            <Layout.Drawer>
                <Layout.Title>Add Layer</Layout.Title>
                <Layout.Title>
                    <TextField
                        onKeyUp={this.onFilter}
                        value={filterText}
                        placeholder="Filter" />
                </Layout.Title>
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
