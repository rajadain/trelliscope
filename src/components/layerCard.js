import { h, Component } from 'preact';
import { Button, Card, Icon, TextField } from 'preact-mdl';

export default class LayerCard extends Component {
    render() {
        const type = this.props.type || 'layer';
        const color = type === 'polygon' ? '#FFEE58' : '#CE93D8';
        const icon = type === 'polygon' ? 'terrain' : 'layers';
        const title = type === 'polygon' ? 'Shape' : 'Layer';

        const style = {backgroundColor: color};

        return (
            <Card shadow={4} class="layer-card" style={style}>
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
