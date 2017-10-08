import { h, Component } from 'preact';
import L from 'leaflet';
import 'leaflet-draw';

const token = "pk.eyJ1IjoicmFqYWRhaW4iLCJhIjoiY2o3eTh4NG5sMWVqejJxczZmZDhpbmJudyJ9.Osu0iffc0R9I2ML4BBNCvw";
const styles = {
    lightGrey: 'v4/mapbox.light/{z}/{x}/{y}@2x.png32',
    frozenYogurt: 'styles/v1/rajadain/cj880p6ol41le2rma2jih3hpm/tiles/256/{z}/{x}/{y}@2x',
    iceCream: 'styles/v1/rajadain/cj881j7o6410o2snu8ah0e0y4/tiles/256/{z}/{x}/{y}@2x'
}

export default class Map extends Component {
    shouldComponentUpdate = () => false;

    constructor(props) {
        super(props);

        this.onDrawFinish = props.onDrawFinish;
        this.onLayerAdjustment = props.onLayerAdjustment;
    }

    componentDidMount() {
        const map = L.map('map', { zoomControl: false })
                     .setView([39.9526, -75.1652], 8);

        L.tileLayer(
            `https://api.mapbox.com/${styles.frozenYogurt}?access_token=${token}`
        ).addTo(map);

        const tileLayer = new L.FeatureGroup();
        const shapeLayer = new L.FeatureGroup();

        map.addLayer(tileLayer);
        map.addLayer(shapeLayer);

        const drawTool = new L.Draw.Polygon(map);

        map.on(L.Draw.Event.CREATED, ({ layer }) => {
            this.onDrawFinish(layer.toGeoJSON());
        });

        map.on(L.Draw.Event.DRAWSTOP, () => {
            drawTool.disable();
        });

        this.map = map;
        this.tileLayer = tileLayer;
        this.shapeLayer = shapeLayer;
        this.drawTool = drawTool;
        this.layerCache = [];
    }

    componentWillReceiveProps({ shape, layers }) {
        const { map, props, shapeLayer, tileLayer, drawTool, layerCache } = this;

        // Handle new shape
        if (props.shape.title !== shape.title) {
            shapeLayer.clearLayers();
            if (shape.geojson) {
                const geojsonLayer = new L.GeoJSON(shape.geojson, {
                    style: {
                        fillColor: shape.color,
                        color: shape.color,
                    },
                });

                shapeLayer.addLayer(geojsonLayer);
                map.flyToBounds(geojsonLayer);
            }
        }

        // Handle shape color change
        if (props.shape.color !== shape.color) {
            shapeLayer.setStyle({
                fillColor: shape.color,
                color: shape.color,
            });
        }

        // Handle opacity change
        if (props.shape.hidden !== shape.hidden) {
            shapeLayer.setStyle({
                fillOpacity: shape.hidden ? 0 : 0.2,
                opacity: shape.hidden ? 0 : 1,
            });
        }

        // Handle drawing
        if (shape.draw) {
            drawTool.setOptions({
                allowIntersection: false,
                shapeOptions: {
                    fillColor: shape.color,
                    fillOpacity: 0.2,
                    color: shape.color,
                    opacity: 1,
                },
            });

            drawTool.enable();
        } else {
            drawTool.disable();
        }

        // Handle layer events
        const { operation, index, data } = layers;
        let layer, tiles;
        if (operation && index !== null) {
            switch(operation) {
                case 'ADD':
                    layer = data[index];
                    tiles = new L.GeoJSON(layer.geojson, {
                        style: {
                            fillColor: layer.color,
                            color: layer.color,
                        },
                    });

                    tileLayer.addLayer(tiles);
                    layerCache.push(tileLayer.getLayerId(tiles));
                    break;
                case 'REMOVE':
                    tiles = layerCache.splice(index, 1);
                    tileLayer.removeLayer(tiles);
                    break;
                case 'UPDATE':
                    layer = data[index];
                    tiles = tileLayer.getLayer(layerCache[index]);
                    tiles.setStyle({
                        fillColor: layer.color,
                        fillOpacity: layer.hidden ? 0 : 0.2,
                        color: layer.color,
                        opacity: layer.hidden ? 0 : 1,
                    });
                    break;
            }

            this.onLayerAdjustment();
        }
    }

    render() {
        return <div id="map" />;
    }
}
