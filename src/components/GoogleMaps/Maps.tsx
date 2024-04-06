/* eslint-disable no-shadow */
import React, {useState} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";
import Spinner from "react-bootstrap/Spinner";
import "./Maps.scss";

export const LoadingContainer = () => <Spinner className="google-maps-loader" animation="border" variant="info" />;

// coordinates should be an object and render an marker for each
export function Maps(props: any) {
  const {coordinates} = props;
  const [selectedCenter, setSelectedCenter] = useState<any>();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState<any>({});

  let {branches} = props;
  branches = branches || [];
  const latitude = coordinates.split(",")[0];
  const longitude = coordinates.split(",")[1];
  
  const onMarkerClick = (props: any, marker: any, e: any) => {
    setSelectedCenter(props.branch);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };
  const {google} = props;
  const onInfoWindowClose = () => {};
  return (
    <Map
      google={google}
      zoom={10}
      initialCenter={{
        lat: latitude,
        lng: longitude,
      }}
      center={{
        lat: latitude,
        lng: longitude,
      }}
    >
      <Marker onClick={onMarkerClick} position={{lat: latitude, lng: longitude}} />
      {branches.map((branch: any, index: any) => (
        <Marker
          onClick={onMarkerClick}
          key={index.toString()}
          branch={branch}
          position={{
            lat: branch.coordinates ? branch.coordinates.split(",")[0] : "",
            lng: branch.coordinates ? branch.coordinates.split(",")[1] : "",
          }}
        />
      ))}
      {selectedCenter && (
        <InfoWindow marker={activeMarker} visible={showingInfoWindow} onClose={onInfoWindowClose}>
          <div>
            <strong>{selectedCenter.name ? selectedCenter.name : ""}</strong>
            <br />
            <span>{selectedCenter.address1 ? selectedCenter.address1 : ""}</span>
            <br />
            <span>
              {selectedCenter.city ? selectedCenter.city : ""}, {selectedCenter.state ? selectedCenter.state : ""}
            </span>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB5jCGq0kSpxlaqAeMIJeFczLTKLfid1f4",
  LoadingContainer,
})(Maps);
