import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import CredentialForm from '../../components/CredentialForm';

import { setCredentials, navigateTo } from '../../redux/actions';
import { bindActions } from '../../redux/utils';

class Login extends Component {
    onLogin({awsAccessKeyId, awsSecretAccessKey}) {
        this.props.setCredentials(awsAccessKeyId, awsSecretAccessKey);
        this.props.navigateTo('/main/');
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
const mapDispatchToProps = bindActions({ setCredentials, navigateTo });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
