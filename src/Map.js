import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, DrawingManager, Rectangle, Circle} from "react-google-maps";

export default function Map (props) {
    let shapes = props.shapes.map(function(shape, idx) {
        if (shape instanceof google.maps.Circle) {
            return <Circle key={idx} center={shape.getCenter()} radius={shape.getRadius()} />
        } else if (shape instanceof google.maps.Rectangle)  {
            return <Rectangle key={idx} bounds={shape.getBounds()} />
        }
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
                    google.maps.drawing.OverlayType.CIRCLE,
                  ],
                },
                rectangleOptions: {
                  fillOpacity: 0.5,
                  clickable: false,
                  editable: false
                },
                circleOptions: {
                  fillOpacity: 0.5,
                  clickable: false,
                  editable: false
                },
              }}
              onRectanglecomplete={props.onShapeComplete}
              onCirclecomplete={props.onShapeComplete}
            />
          {shapes}
          </GoogleMap>
        }
      />
    </section>
    );
}
