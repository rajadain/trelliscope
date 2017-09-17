import { h, Component } from 'preact';
import { Button, Card, Icon, TextField } from 'preact-mdl';

export default class CredentialCard extends Component {
    render() {
        return (
            <Card shadow={4} id="credential-card">
                <Card.Title>
                    <Card.TitleText>
                        Credentials
                        <Icon icon="lock outline" />
                    </Card.TitleText>
                </Card.Title>
                <Card.Text>
                    <TextField
                        floating-label
                        label="AWS_ACCESS_KEY_ID"
                        type="password" />
                    <TextField
                        floating-label
                        label="AWS_SECRET_ACCESS_KEY"
                        type="password" />
                </Card.Text>
                <Card.Actions>
                    <Button raised accent>Go</Button>
                </Card.Actions>
            </Card>
        );
    }
}
