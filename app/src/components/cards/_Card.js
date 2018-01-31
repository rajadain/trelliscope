import { h, Component } from 'preact';
import { Button, Card, Icon } from 'preact-mdl';

export default class _Card extends Component {
    toggleDrawer() {
        this.setState({ showDrawer: !this.state.showDrawer });
    }

    downloadShape() {
        const { title, geojson } = this.props.params;
        const filename = `${title}.geojson`;
        const contents = encodeURIComponent(JSON.stringify(geojson));

        const a = document.createElement('a');
        a.setAttribute('href', `data:text/plain;charset=utf-8,${contents}`);
        a.setAttribute('download', filename);
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    render({ params, onClear, onSetColor, onVisibilityToggle, index = null,
             icon, className, cardColors },
           { showDrawer }) {
        const style = {backgroundColor: params.color};
        const colorButtons = cardColors.map(c => {
            const active = c === params.color;

            return (
                <Button disabled={active}
                        onClick={() => { onSetColor(c, index); }}>
                    <Icon icon="lens"
                          class={active ? "active" : ""}
                          style={{color: c}} />
                </Button>
            );
        });

        return (
            <Card shadow={4} class={`card ${className}`} style={style}>
                <Card.Title>
                    <Card.TitleText>
                        {params.title}
                        <Icon icon={icon} />
                    </Card.TitleText>
                </Card.Title>
                <Card.Actions>
                    <Button onClick={this.toggleDrawer.bind(this)}>
                        <Icon icon="color lens" />
                    </Button>
                    <Button onClick={() => onVisibilityToggle(index)}>
                        <Icon icon={`visibility${ params.hidden ? " off" : ""}`} />
                    </Button>
                    <Button onClick={this.downloadShape.bind(this)}>
                        <Icon icon="file download" />
                    </Button>
                </Card.Actions>
                <Card.Menu>
                    <Button onClick={() => onClear(index, params.title)}><Icon icon="close" /></Button>
                </Card.Menu>
                <Card.Text class={`drawer${showDrawer ? " visible" : ""}`}>
                    {colorButtons}
                </Card.Text>
            </Card>
        );
    }
}
