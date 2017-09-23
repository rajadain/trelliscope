import { h, Component } from 'preact';
import { List } from 'preact-mdl';
import { connect } from 'preact-redux';

import { AddLayer, AddShape, Layer, Shape } from '../../components/cards';

import { uploadShape, clearShape } from '../../redux/actions';
import { bindActions } from '../../redux/utils';

class Main extends Component {
    onUploadShape(title, geojson) {
        this.props.uploadShape(title, geojson);
    }

    render({ shape, layers, clearShape }) {
        const shapeRegion = shape.geojson ?
            <Shape title={shape.title}
                   onClear={clearShape}
            /> :
            <AddShape onUpload={this.onUploadShape.bind(this)} />;

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

const mapDispatchToProps = bindActions({ uploadShape, clearShape });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
