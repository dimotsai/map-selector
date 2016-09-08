import React from 'react';
import ReactDOM from 'react-dom';

import Map from './Map';
import Panel from './Panel';
import update from "react-addons-update";

class App extends React.Component {
    state = {
        markers: [{
            position: {
                lat: 25.0112183,
                lng: 121.52067570000001,
            },
            key: 'Taiwan',
            defaultAnimation: 2,
        }],
        rectangles: []
    };

    handleMapClick = this.handleMapClick.bind(this);
    handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
    handleRectanglecomplete = this.handleRectanglecomplete.bind(this);

    componentDidMount() {
        setTimeout(() => {
            let { markers } = this.state;
            markers = update(markers, {
                $push: [
                    {
                        position: {
                            lat: 25.99,
                            lng: 122.9,
                        },
                        defaultAnimation: 2,
                        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
                    },
                ],
            });
            this.setState({ markers });
        }, 2000);
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        let { markers } = this.state;
        markers = update(markers, {
            $push: [
                {
                    position: event.latLng,
                    defaultAnimation: 2,
                    key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
                },
            ],
        });
        this.setState({ markers });
    }

    handleMarkerRightclick(index, event) {
        /*
         * All you modify is data, and the view is driven by data.
         * This is so called data-driven-development. (And yes, it's now in
         * web front end and even with google maps API.)
         */
        let { markers } = this.state;
        markers = update(markers, {
            $splice: [
                [index, 1],
            ],
        });
        this.setState({ markers });
    }

    handleRectanglecomplete(rect) {
        google.maps.event.clearInstanceListeners(rect);
        rect.setMap(null);
        let { rectangles } = this.state;
        rectangles = update(rectangles, {
            $push: [rect]
        });
        this.setState({ rectangles })
    }

    handleRectangleDelete(index) {
        let { rectangles } = this.state;
        rectangles = update(rectangles, {
            $splice: [
                [index, 1],
            ],
        });
        this.setState({ rectangles });
    }

    render() {
        return (<div id="app">
            <Map
                markers={this.state.markers}
                rectangles={this.state.rectangles}
                onMapClick={this.handleMapClick}
                onMarkerRightclick={this.handleMarkerRightclick}
                onRectanglecomplete={this.handleRectanglecomplete}
                />
            <Panel rectangles={this.state.rectangles} onRectangleDelete={::this.handleRectangleDelete} />
        </div>);
    }
}

export default App;
