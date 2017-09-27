import { h, Component } from 'preact';
import { Button, Card, Icon } from 'preact-mdl';

export default class AddShape extends Component {
    handleUploadShape({ target: { files }}) {
        if (!files || files.length === 0 || files.item(0).name === '') {
            return false;
        }

        const fr = new FileReader();
        let title = "Shape";

        fr.onload = ({ target: { result }}) => {
            this.props.onUpload(title, JSON.parse(result));
        };

        title = files.item(0).name
                .replace('.geojson', '')
                .replace('.json', '')
                .replace('.txt', '');
        fr.readAsText(files.item(0));

        this.uploadFileInput.value = null;
    }

    triggerUploadShape() {
        this.uploadFileInput.click();
    }

    render({ color }) {
        return (
            <Card shadow={4} class="card shape" style={{backgroundColor: color}}>
                <Card.Title>
                    <Card.TitleText>
                        Shape
                        <Icon icon="terrain" />
                    </Card.TitleText>
                </Card.Title>
                <Card.Menu>
                    <Button><Icon icon="edit" /></Button>
                    <Button onClick={this.triggerUploadShape.bind(this)}>
                        <Icon icon="file upload" />
                    </Button>
                    <input type="file"
                           style="display:none"
                           onChange={this.handleUploadShape.bind(this)}
                           ref={(r) => this.uploadFileInput = r} />
                </Card.Menu>
            </Card>
        );
    }
}
