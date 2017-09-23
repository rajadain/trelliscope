import { h, Component } from 'preact';
import Card from './_Card';

export default class Layer extends Component {
    render({ title, onClear }) {
        return (
            <Card title={title} onClear={onClear}
                  icon="terrain" className="shape" />
        );
    }
}
