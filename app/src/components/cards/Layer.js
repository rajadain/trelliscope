import { h, Component } from 'preact';
import Card from './_Card';

const cardColors = [
    '#E57373',
    '#BA68C8',
    '#4FC3F7',
    '#81C784',
    '#FB8C00',
];

export default class Layer extends Component {
    render({ params, index, onClear, onSetColor, onVisibilityToggle }) {
        return (
            <Card params={params} onClear={onClear}
                  onSetColor={onSetColor}
                  onVisibilityToggle={onVisibilityToggle}
                  index={index}
                  className="layer"
                  cardColors={cardColors} />
        );
    }
}
