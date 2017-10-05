import { h, Component } from 'preact';
import { Navigation } from 'preact-mdl';
import { connect } from 'preact-redux';
import axios from 'axios';

import {
    startQueryLayer,
    finishQueryLayer,
    errorQueryLayer,
    removeQueryLayer,
} from '../redux/actions';
import { bindActions } from '../redux/utils';

const { protocol, hostname } = document.location;
const LAYERS_QUERY_URL = `${protocol}//${hostname}:7316/query`;

class LayerEntry extends Component {
    onClick() {
        const {
            index, name, active,
            login, shape,
            startQueryLayer,
            finishQueryLayer,
            errorQueryLayer,
            removeQueryLayer,
        } = this.props;

        const { awsAccessKeyId, awsSecretAccessKey, bucketName } = login;
        const { geojson } = shape;

        if (!geojson) {
            return;
        }

        if (!active) {
            startQueryLayer(index);
            axios.
                post(LAYERS_QUERY_URL, {
                    awsAccessKeyId,
                    awsSecretAccessKey,
                    bucket: bucketName,
                    layer: name,
                    shape: JSON.stringify(geojson),
                })
                .then(({ data }) => {
                    finishQueryLayer(index, name, data);
                })
                .catch(() => {
                    errorQueryLayer(index);
                });
        } else {
            removeQueryLayer(index);
        }
    }

    render({ name }) {
        return (
            <Navigation.Link onClick={this.onClick.bind(this)}>
                {name}
            </Navigation.Link>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.login,
    shape: state.shape,
});

const mapDispatchToProps = bindActions({
    startQueryLayer,
    finishQueryLayer,
    errorQueryLayer,
    removeQueryLayer,
});

export default connect(mapStateToProps, mapDispatchToProps)(LayerEntry);
