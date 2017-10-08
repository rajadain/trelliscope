import { h, Component } from 'preact';
import Card from './_Card';

const cardColors = [
    '#F48FB1',
    '#B39DDB',
    '#90CAF9',
    '#80CBC4',
    '#FFEE58',
];

export default class Shape extends Component {
    render({ params, onClear, onSetColor, onVisibilityToggle }) {
        return (
            <Card params={params} onClear={onClear}
                  onSetColor={onSetColor}
                  onVisibilityToggle={onVisibilityToggle}
                  icon="terrain" className="shape"
                  cardColors={cardColors} />
        );
    }
}
