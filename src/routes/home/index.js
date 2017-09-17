import { h, Component } from 'preact';
import LayerCard from '../../components/layerCard';

export default class Home extends Component {
    render() {
        return (
            <div id="home" class="mdl-grid">
                <div class="mdl-cell mdl-cell--4-col">
                    <LayerCard />
                </div>
            </div>
        );
    }
}
