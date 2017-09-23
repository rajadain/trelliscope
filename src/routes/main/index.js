import { h, Component } from 'preact';
import { List } from 'preact-mdl';
import { connect } from 'preact-redux';

import { AddLayer, AddShape, Layer, Shape } from '../../components/cards';

import { uploadShape, clearShape, toggleShapeVisibility } from '../../redux/actions';
import { bindActions } from '../../redux/utils';

class Main extends Component {
    render({ shape, layers,
             uploadShape, clearShape, toggleShapeVisibility }) {
        const shapeRegion = shape.geojson ?
            <Shape params={shape}
                   onClear={clearShape}
                   onVisibilityToggle={toggleShapeVisibility}
            /> :
            <AddShape onUpload={uploadShape} />;

        return (
            <div id="main" class="mdl-grid">
                <div class="mdl-cell mdl-cell--3-col">
                    {shapeRegion}
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

const mapStateToProps = (state) => ({
    shape: state.shape,
    layers: state.layers,
});

const mapDispatchToProps = bindActions({ uploadShape, clearShape, toggleShapeVisibility });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
