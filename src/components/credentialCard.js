import { h, Component } from 'preact';
import { Button, Card, Icon, TextField } from 'preact-mdl';

export default class CredentialCard extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    updateAwsAccessKeyId = (e) => {
        this.setState({ awsAccessKeyId: e.target.value });
    };

    updateAwsSecretAccessKey = (e) => {
        this.setState({ awsSecretAccessKey: e.target.value });
    };

    render(_, { awsAccessKeyId, awsSecretAccessKey }) {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <Card shadow={4} id="credential-card">
                    <Card.Title>
                        <Card.TitleText>
                            Credentials
                            <Icon icon="lock outline" />
                        </Card.TitleText>
                    </Card.Title>
                    <Card.Text>
                        <TextField
                            onChange={this.updateAwsAccessKeyId}
                            value={awsAccessKeyId}
                            floating-label
                            label="AWS_ACCESS_KEY_ID"
                            type="password" />
                        <TextField
                            onChange={this.updateAwsSecretAccessKey}
                            value={awsSecretAccessKey}
                            floating-label
                            label="AWS_SECRET_ACCESS_KEY"
                            type="password" />
                    </Card.Text>
                    <Card.Actions>
                        <Button raised accent type="submit">Go</Button>
                    </Card.Actions>
                </Card>
            </form>
        );
    }
}
