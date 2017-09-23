import { h, Component } from 'preact';
import { List } from 'preact-mdl';
import { connect } from 'preact-redux';

import { AddLayer, AddShape, Layer, Shape } from '../../components/cards';

class Main extends Component {
    render({ polygon, layers }) {
        const polygonRegion = polygon.shape ?
            <Shape title={polygon.title} />:
            <AddShape />;

        return (
            <div id="main" class="mdl-grid">
                <div class="mdl-cell mdl-cell--3-col">
                    {polygonRegion}
                    <div class="layers-list">
                        <AddLayer />
                    </div>
                </div>
                <div class="mdl-cell mdl-cell--9-col">
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ ...state.main });

export default connect(mapStateToProps)(Main);
