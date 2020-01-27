import React from "react";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";

class RestaurantList extends React.Component {
  getNewReviewProps = newData => {
    this.props.sendPropsToMapContainer(newData);
  };

  render() {
    return (
      <div className="restaurant-block">
        <h3 className="header">{this.props.restaurantTitle} </h3>
        <div className="sidebar-address">
          <StarRating
            rating={this.props.rating.reduce((sum, star) => {
              //  calc sum of stars
              return Math.round(sum + star / this.props.rating.length);
            }, 0)}
          />
          ({this.props.rating.length} reviews)
        </div>
        <p className="sidebar-address">{this.props.address}</p>
        <br />
        <div>
          <ReviewForm
            restaurantKey={this.props.restaurantKey}
            restaurantName={this.props.restaurantTitle}
            getNewReviewProps={this.getNewReviewProps} // onSubmit={this.props.onSubmit}
          />
        </div>
      </div>
    );
  }
}

export default RestaurantList;
