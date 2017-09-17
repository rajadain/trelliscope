import { h, Component } from 'preact';
import { List } from 'preact-mdl';
import LayerCard from '../../components/layerCard';

export default class Main extends Component {
    render() {
        return (
            <div id="main" class="mdl-grid">
                <div class="mdl-cell mdl-cell--3-col">
                    <LayerCard type="polygon" />
                    <LayerCard />
                    <LayerCard />
                    <LayerCard />
                </div>
                <div class="mdl-cell mdl-cell--9-col">
                </div>
            </div>
        );
    }
}
