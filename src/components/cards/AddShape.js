import { h, Component } from 'preact';
import { Button, Card, Icon } from 'preact-mdl';

export default class AddShape extends Component {
    render() {
        return (
            <Card shadow={4} class="card shape">
                <Card.Title>
                    <Card.TitleText>
                        Shape
                        <Icon icon="terrain" />
                    </Card.TitleText>
                </Card.Title>
                <Card.Menu>
                    <Button><Icon icon="edit" /></Button>
                    <Button><Icon icon="file upload" /></Button>
                </Card.Menu>
            </Card>
        );
    }
}
