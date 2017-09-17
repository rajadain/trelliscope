import { h, Component } from 'preact';
import { List } from 'preact-mdl';
import AddCard from '../../components/addCard';
import LayerCard from '../../components/layerCard';

export default class Main extends Component {
    render() {
        return (
            <div id="main" class="mdl-grid">
                <div class="mdl-cell mdl-cell--3-col">
                    <AddCard type="polygon" />
                    <div class="layers-list">
                        <AddCard type="layer" />
                    </div>
                </div>
                <div class="mdl-cell mdl-cell--9-col">
                </div>
            </div>
        );
    }
}
