import { h, Component } from 'preact';
import Card from './_Card';

const cardColors = [
    '#e57373',
    '#BA68C8',
    '#4FC3F7',
    '#81C784',
    '#FB8C00',
];

export default class Layer extends Component {
    render({ params, onClear, onVisibilityToggle }) {
        return (
            <Card params={params} onClear={onClear}
                  onVisibilityToggle={onVisibilityToggle}
                  icon="layers" className="layer"
                  cardColors={cardColors} />
        );
    }
}
