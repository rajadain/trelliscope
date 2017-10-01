import { h, Component } from 'preact';
import { List } from 'preact-mdl';
import { connect } from 'preact-redux';

import { AddLayer, AddShape, Layer, Shape } from '../../components/cards';
import Map from '../../components/Map';

import {
    clearShape,
    uploadShape,
    setShapeColor,
    toggleShapeVisibility,
    startDrawing,
    cancelDrawing,
    finishDrawing,
} from '../../redux/actions';
import { bindActions } from '../../redux/utils';

class Main extends Component {
    render({ shape, layers,
             clearShape,
             uploadShape,
             setShapeColor,
             toggleShapeVisibility,
             startDrawing,
             cancelDrawing,
             finishDrawing,
            }) {
        const shapeRegion = shape.geojson ?
            <Shape params={shape}
                   onClear={clearShape}
                   onSetColor={setShapeColor}
                   onVisibilityToggle={toggleShapeVisibility}
            /> :
            <AddShape color={shape.color} isDrawing={shape.draw}
                      onDrawStart={startDrawing}
                      onDrawCancel={cancelDrawing}
                      onUpload={uploadShape}
            />;

        return (
            <div id="main">
                <Map shape={shape} layers={layers}
                     onDrawFinish={finishDrawing}
                />
                <div class="controls">
                    {shapeRegion}
                    <div class="layers-list">
                        <AddLayer />
                    </div>
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
    startDrawing,
    cancelDrawing,
    finishDrawing,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
