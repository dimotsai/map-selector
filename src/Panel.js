import React from 'react';
import ReactDOM from 'react-dom';
import numeral from 'numeral';

export default class Panel extends React.Component {

    constructor(props) {
        super(props);
    }

    formatBounds(bounds) {
        let format = '0.000000';
        let ne = bounds.getNorthEast();
        let sw = bounds.getSouthWest();
        let neLat = numeral(ne.lat()).format(format);
        let neLng = numeral(ne.lng()).format(format);
        let swLat = numeral(sw.lat()).format(format);
        let swLng = numeral(sw.lng()).format(format);
        return `(${neLat},${neLng}),(${swLat},${swLng})`;
    }

    render() {
        return <div id="panel">
                <ol>
                    {this.props.rectangles.map( (r, index) => <li key={index}>{this.formatBounds(r.getBounds())}</li> )}
                </ol>
            </div>
    }
}
