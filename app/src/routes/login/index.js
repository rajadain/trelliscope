import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import axios from 'axios';

import CredentialForm from '../../components/CredentialForm';

import {
    setCredentials,
    startFetchLayers,
    finishFetchLayers,
    errorFetchLayers,
} from '../../redux/actions';
import { bindActions } from '../../redux/utils';

const { protocol, hostname } = document.location;
const LAYERS_LIST_URL = `${protocol}//${hostname}:7316/layers`;

class Login extends Component {
    onLogin({awsAccessKeyId, awsSecretAccessKey, s3Path}) {
        const {
            setCredentials,
            startFetchLayers,
            finishFetchLayers,
            errorFetchLayers,
            history,
        } = this.props;

        startFetchLayers();
        axios
            .post(LAYERS_LIST_URL, {
                awsAccessKeyId,
                awsSecretAccessKey,
                s3Path,
            })
            .then(({ data }) => {
                setCredentials(awsAccessKeyId, awsSecretAccessKey, s3Path);
                finishFetchLayers(data);
                history.push('/main/');
            })
            .catch(errorFetchLayers);
    }

    render() {
        return (
            <div id="login" class="mdl-grid">
                <div class="mdl-cell mdl-cell--4-col">
                    <CredentialForm onSubmit={this.onLogin.bind(this)} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ login: state.login });
const mapDispatchToProps = bindActions({
    setCredentials,
    startFetchLayers,
    finishFetchLayers,
    errorFetchLayers,
 });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
