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
    clearLayer,
    setLayerColor,
    toggleLayerVisibility,
    finishMapAdjustment,
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
             clearLayer,
             setLayerColor,
             toggleLayerVisibility,
             finishMapAdjustment,
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
        const layerCards = layers.data.map((layer, index) => (
                <Layer key={index} index={index} params={layer}
                       onClear={clearLayer}
                       onSetColor={setLayerColor}
                       onVisibilityToggle={toggleLayerVisibility}
                />
            ));

        return (
            <div id="main">
                <Map shape={shape} layers={layers}
                     onDrawFinish={finishDrawing}
                     onLayerAdjustment={finishMapAdjustment}
                />
                <div class="controls">
                    {shapeRegion}
                    <div class="layers-list">
                        <AddLayer />
                        {layerCards}
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
    clearLayer,
    setLayerColor,
    toggleLayerVisibility,
    finishMapAdjustment,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
