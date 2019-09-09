import React from "react";
import "./App.css";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Star from "../star-icon.png";
import StarRating from "./StarRating";
import RestaurantList from "./RestaurantList";
import axios from "axios";
import RestaurantFilter from "./RestaurantFilter";

let markers;
//come back to this array and make it dependent on what is in view  / maps bounds
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      errorMessage: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      title: "",
      onClick: false,
      restaurantData: [],
      ref: {},
      markers: {},
      value: 0,
      markerVisibility: true
    };
    this.handleChange = this.handleChange.bind(this);

    axios.get("../RestaurantDetails.json").then(response => {
      this.setState(() => {
        return {
          restaurantData: response.data
        };
      });
    });
  }
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
      err => this.setState({ errorMessage: err.message })
    );

    this.setState({
      markers: markers
    });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  handleChange = event => {
    markers.map(marker => {
      if (marker.props.averageRating > 3) {
        this.setState({
          markerVisibility: false
        });
      }
      return this;
    });
  };

  render() {
    const mapStyles = {
      styles: [
        { elementType: "geometry", stylers: [{ color: "#C18B84" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#18160B" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#EBD762" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#E0E2E5" }]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#E0E2E5" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#315225" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#E0E2E5" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#C18B84" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#E0E2E5" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#E0E2E5" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#8B8994" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#18160B" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#E0E2E5" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }]
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#EBD762" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#8BADD5" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }]
        }
      ]
    };
    let bounds = new this.props.google.maps.LatLngBounds();
    this.state.restaurantData.map(restaurant => {
      return bounds.extend({
        lat: restaurant.position.lat,
        lng: restaurant.position.lng
      });
    });

    markers = this.state.restaurantData.map(restaurant => {
      return (
        <Marker
          visible={this.state.markerVisibility}
          ref={"marker" + restaurant.id}
          key={restaurant.id}
          title={restaurant.restaurantName}
          address={restaurant.address}
          position={restaurant.position}
          icon={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
          starIcon={<img alt="star" src={Star} />}
          onClick={this.onMarkerClick}
          ratings={restaurant.ratings}
          ratingsLength={restaurant.ratings.length}
          averageRating={restaurant.ratings
            .map(rating => rating.stars)
            .reduce((sum, star) => {
              //  calc sum of stars
              return Math.round(sum + star / restaurant.ratings.length);
            }, 0)}
          starRatings={restaurant.ratings.map(rating => {
            return (
              <div className="info-window-box">
                <p>
                  {<StarRating rating={rating.stars} />} <br />
                  <b>User:</b> {rating.username} <br />
                  <b>Review: </b>
                  <em>{rating.comment}</em> <br />
                </p>
              </div>
            );
          })}
          streetView={
            <img
              alt="Restaurant"
              src={`https://maps.googleapis.com/maps/api/streetview?size=300x200&location=${restaurant.position.lat},${restaurant.position.lng}&heading=151.78&pitch=-0.76&key=AIzaSyACzqQ9vj4BR5yzHbWsZi5oTcIAmZ8mKcE`}
            />
          }
        />
      );
    });

    console.log(markers);
    return (
      <div className="container">
        <div className="map-container">
          <Map
            google={this.props.google}
            onClick={this.onMapClicked} // on click windows etc close
            styles={mapStyles.styles}
            //initialCenter={{ lat: 51.5074, lng: -0.1278 }} // intial center set to London
            center={this.state} //get user location
            zoom={14}
            bounds={bounds}
            onDragend={this.centerMoved}
          >
            <Marker
              onClick={this.onMarkerClick}
              ref={"me"}
              title={"You are here"}
              position={this.state}
              draggable={true}
            />

            {markers}

            <InfoWindow
              className="info-window"
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <div className="info-window-main">
                  <div className="info-window-title">
                    <h2>{this.state.selectedPlace.title} </h2>
                    <p>
                      {
                        <StarRating
                          rating={this.state.selectedPlace.averageRating}
                        />
                      }
                      ({this.state.selectedPlace.ratingsLength} reviews)
                    </p>
                  </div>
                  <p className=".info-window-box">
                    {this.state.selectedPlace.starRatings}
                  </p>
                  <p className="info-window-image">
                    {this.state.selectedPlace.streetView}
                  </p>
                </div>
              </div>
            </InfoWindow>
          </Map>
        </div>

        <div className="restaurant-side-panel">
          <RestaurantFilter
            value={this.state.value}
            onChange={this.handleChange}
          />
          <div className="restaurant-list">
            {markers.map(marker => {
              return (
                <RestaurantList
                  key={marker.props.key}
                  position={marker.props.position}
                  title={marker.props.title}
                  address={marker.props.address}
                  rating={marker.props.ratings.map(rating => rating.stars)}
                ></RestaurantList>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "***"
})(MapContainer);
