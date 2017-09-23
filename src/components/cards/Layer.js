import { h, Component } from 'preact';
import Card from './_Card';

export default class Layer extends Component {
    render({ title }) {
        return (
            <Card title={title} icon="layers" class="layer" />
        );
    }
}
