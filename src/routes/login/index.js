import { h, Component } from 'preact';
import CredentialCard from '../../components/credentialCard';

export default class Login extends Component {
    render() {
        return (
            <div id="login" class="mdl-grid">
                <div class="mdl-cell mdl-cell--4-col">
                    <CredentialCard />
                </div>
            </div>
        );
    }
}
