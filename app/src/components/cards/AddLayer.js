import { h, Component } from 'preact';
import { Button, Card, Icon } from 'preact-mdl';

export default class AddLayer extends Component {
    render() {
        return (
            <Card shadow={4} class="card layer">
                <Card.Title>
                    <Card.TitleText>
                        Layer
                        <Icon icon="layers" />
                    </Card.TitleText>
                </Card.Title>
                <Card.Menu>
                    <Button><Icon icon="library add" /></Button>
                </Card.Menu>
            </Card>
        );
    }
}
