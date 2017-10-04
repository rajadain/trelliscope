import { h, Component } from 'preact';
import { Button, Card, Icon, Menu } from 'preact-mdl';

export default class AddLayer extends Component {
    toggleDrawer() {
        document.getElementsByClassName('mdl-layout')[0].MaterialLayout.toggleDrawer();
    }

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
                    <Button onClick={this.toggleDrawer}>
                        <Icon icon="library add" />
                    </Button>
                </Card.Menu>
            </Card>
        );
    }
}
