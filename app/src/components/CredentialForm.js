import { h, Component } from 'preact';
import { Button, Card, Icon, Switch, TextField } from 'preact-mdl';

export default class CredentialForm extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.customCredentials) {
            this.setState({ awsAccessKeyId: "", awsSecretAccessKey: "" });
        }
        this.props.onSubmit(this.state);
    };

    updateAwsAccessKeyId = (e) => {
        this.setState({ awsAccessKeyId: e.target.value });
    };

    updateAwsSecretAccessKey = (e) => {
        this.setState({ awsSecretAccessKey: e.target.value });
    };

    updateS3Path = (e) => {
        this.setState({ s3Path: e.target.value });
    };

    setCustomCredentials = (e) => {
        this.setState({ customCredentials: e.target.checked });
    };

    render(_, { awsAccessKeyId, awsSecretAccessKey, s3Path, customCredentials }) {
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
                        <Switch onChange={this.setCustomCredentials}>
                            Use Custom Credentials
                        </Switch>
                        <div class={`custom-credentials ${customCredentials ? '' : 'closed'}`}>
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
                        </div>
                        <TextField
                            onChange={this.updateS3Path}
                            value={s3Path}
                            floating-label
                            label="S3 Bucket / Path" />
                    </Card.Text>
                    <Card.Actions>
                        <Button raised accent type="submit">Go</Button>
                    </Card.Actions>
                </Card>
            </form>
        );
    }
}
