import { h, Component } from 'preact';
import L from 'leaflet';

const token = "pk.eyJ1IjoicmFqYWRhaW4iLCJhIjoiY2o3eTh4NG5sMWVqejJxczZmZDhpbmJudyJ9.Osu0iffc0R9I2ML4BBNCvw";

export default class Map extends Component {
    shouldComponentUpdate = () => false;

    componentDidMount() {
        const map = L.map('map').setView([39.9526, -75.1652], 8);

        L.tileLayer(
            `https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png32?access_token=${token}`
        ).addTo(map);

        const shapeLayer = new L.FeatureGroup();

        map.addLayer(shapeLayer);

        this.map = map;
        this.shapeLayer = shapeLayer;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.shape.title !== nextProps.shape.title) {
            this.shapeLayer.clearLayers();
            if (nextProps.shape.geojson) {
                this.shapeLayer.addLayer(new L.GeoJSON(nextProps.shape.geojson));
            }
        }
    }

    render() {
        return <div id="map" />;
    }
}
