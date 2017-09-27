import { h, Component } from 'preact';
import L from 'leaflet';

const token = "pk.eyJ1IjoicmFqYWRhaW4iLCJhIjoiY2o3eTh4NG5sMWVqejJxczZmZDhpbmJudyJ9.Osu0iffc0R9I2ML4BBNCvw";

export default class Map extends Component {
    shouldComponentUpdate = () => false;

    componentDidMount() {
        const map = L.map('map', { zoomControl: false })
                     .setView([39.9526, -75.1652], 8);

        L.tileLayer(
            `https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png32?access_token=${token}`
        ).addTo(map);

        const shapeLayer = new L.FeatureGroup();

        map.addLayer(shapeLayer);

        this.map = map;
        this.shapeLayer = shapeLayer;
    }

    componentWillReceiveProps({ shape, layers }) {
        const { map, props, shapeLayer } = this;

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
    }

    render() {
        return <div id="map" />;
    }
}
