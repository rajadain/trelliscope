import { h, Component } from 'preact';
import { Button, Card, Icon } from 'preact-mdl';

export default class _Card extends Component {
    render({ title, icon, className }) {
        return (
            <Card shadow={4} class="card layer">
                <Card.Title>
                    <Card.TitleText>
                        {title}
                        <Icon icon={icon} />
                    </Card.TitleText>
                </Card.Title>
                <Card.Actions>
                    <Button><Icon icon="color lens" /></Button>
                    <Button><Icon icon="visibility off" /></Button>
                    <Button><Icon icon="file download" /></Button>
                </Card.Actions>
                <Card.Menu>
                    <Button><Icon icon="close" /></Button>
                </Card.Menu>
            </Card>
        );
    }
}