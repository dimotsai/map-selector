import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, DrawingManager, Rectangle} from "react-google-maps";

export default function Map (props) {
    let rectangles = props.rectangles.map(function(rect) {
        return <Rectangle bounds={rect.getBounds()} />
    });
    return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 23.747379, lng: 120.920539 }}
            onClick={props.onMapClick}
          >
            <DrawingManager
              defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
              defaultOptions={{
                drawingControl: true,
                drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                    google.maps.drawing.OverlayType.RECTANGLE,
                  ],
                },
                rectangleOptions: {
                  fillOpacity: 0.5,
                  clickable: false,
                  editable: false
                },
                circleOptions: {
                  fillOpacity: 0.5,
                  strokeWeight: 5,
                  clickable: false,
                  editable: false
                },
              }}
              onRectanglecomplete={props.onRectanglecomplete}
            />
          {rectangles}
          </GoogleMap>
        }
      />
    </section>
    );
}
