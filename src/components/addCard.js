import { h, Component } from 'preact';
import { Button, Card, Icon, TextField } from 'preact-mdl';

export default class AddCard extends Component {
    render() {
        const type = this.props.type || 'layer';
        const color = type === 'polygon' ? '#FFEE58' : '#CE93D8';
        const icon = type === 'polygon' ? 'terrain' : 'layers';
        const title = type === 'polygon' ? 'Shape' : 'Layer';
        const menu = type === 'polygon' ?
            (<Card.Menu>
                <Button><Icon icon="edit" /></Button>
                <Button><Icon icon="file upload" /></Button>
            </Card.Menu>) :
            (<Card.Menu>
                <Button><Icon icon="library add" /></Button>
            </Card.Menu>);
        const style = {backgroundColor: color};

        return (
            <Card shadow={4} class="layer-card" style={style}>
                <Card.Title>
                    <Card.TitleText>
                        {title}
                        <Icon icon={icon} />
                    </Card.TitleText>
                </Card.Title>
                {menu}
            </Card>
        );
    }
}
