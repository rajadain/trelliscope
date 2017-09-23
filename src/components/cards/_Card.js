import { h, Component } from 'preact';
import { Button, Card, Icon } from 'preact-mdl';

export default class _Card extends Component {
    downloadShape() {
        const filename = `${this.props.params.title}.geojson`;
        const geojson = encodeURIComponent(this.props.params.geojson);

        const a = document.createElement('a');
        a.setAttribute('href', `data:text/plain;charset=utf-8,${geojson}`);
        a.setAttribute('download', filename);
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

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
                    <Button onClick={this.downloadShape.bind(this)}>
                        <Icon icon="file download" />
                    </Button>
                </Card.Actions>
                <Card.Menu>
                    <Button onClick={onClear}><Icon icon="close" /></Button>
                </Card.Menu>
            </Card>
        );
    }
}
