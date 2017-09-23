import { h, Component } from 'preact';
import Card from './_Card';

export default class Layer extends Component {
    render({ params, onClear, onVisibilityToggle }) {
        return (
            <Card params={params} onClear={onClear}
                  onVisibilityToggle={onVisibilityToggle}
                  icon="layers" className="layer" />
        );
    }
}
