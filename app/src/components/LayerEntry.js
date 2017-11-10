import { h, Component } from 'preact';
import { CheckBox, Navigation } from 'preact-mdl';
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
            index, title, active,
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
                    layer: title,
                    shape: JSON.stringify(geojson),
                })
                .then(({ data }) => {
                    finishQueryLayer(index, title, data);
                })
                .catch(() => {
                    errorQueryLayer(index);
                });
        } else {
            removeQueryLayer(index, title);
        }
    }

    render({ title, active }) {
        return (
            <Navigation.Link onClick={this.onClick.bind(this)}>
                <CheckBox checked={active} disabled />
                {title}
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
