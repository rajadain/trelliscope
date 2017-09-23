import { h, Component } from 'preact';
import { Button, Card, Icon } from 'preact-mdl';

export default class _Card extends Component {
    render({ params, onClear, onVisibilityToggle, icon, className }) {
        return (
            <Card shadow={4} class={`card ${className}`}>
                <Card.Title>
                    <Card.TitleText>
                        {params.title}
                        <Icon icon={icon} />
                    </Card.TitleText>
                </Card.Title>
                <Card.Actions>
                    <Button><Icon icon="color lens" /></Button>
                    <Button onClick={onVisibilityToggle}>
                        <Icon icon={`visibility${ params.hidden ? " off" : ""}`} />
                    </Button>
                    <Button><Icon icon="file download" /></Button>
                </Card.Actions>
                <Card.Menu>
                    <Button onClick={onClear}><Icon icon="close" /></Button>
                </Card.Menu>
            </Card>
        );
    }
}
