import React from "react";
import Ratings from "react-ratings-declarative";

class StarRating extends React.Component {
  render() {
    return (
      <Ratings
        rating={this.props.rating}
        widgetRatedColors="#315225"
        widgetSpacings="5px"
      >
        <Ratings.Widget widgetDimension="20px" />
        <Ratings.Widget widgetDimension="20px" />
        <Ratings.Widget widgetDimension="20px" />
        <Ratings.Widget widgetDimension="20px" />
        <Ratings.Widget widgetDimension="20px" />
      </Ratings>
    );
  }
}

export default StarRating;
