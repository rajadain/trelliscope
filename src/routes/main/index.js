import { h, Component } from 'preact';
import { List } from 'preact-mdl';
import { connect } from 'preact-redux';

import { AddLayer, AddShape, Layer, Shape } from '../../components/cards';

import {
    clearShape,
    uploadShape,
    setShapeColor,
    toggleShapeVisibility
} from '../../redux/actions';
import { bindActions } from '../../redux/utils';

class Main extends Component {
    render({ shape, layers,
             clearShape,
             uploadShape,
             setShapeColor,
             toggleShapeVisibility,
            }) {
        const shapeRegion = shape.geojson ?
            <Shape params={shape}
                   onClear={clearShape}
                   onSetColor={setShapeColor}
                   onVisibilityToggle={toggleShapeVisibility}
            /> :
            <AddShape color={shape.color} onUpload={uploadShape} />;

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

const mapDispatchToProps = bindActions({
    clearShape,
    uploadShape,
    setShapeColor,
    toggleShapeVisibility,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
