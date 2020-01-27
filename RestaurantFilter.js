import React from "react";

class RestaurantFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "All" };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.value);
    //call back function
  };

  onFilterClick = event => {
    this.props.onFilterClick();
  };

  onNearMeClick = event => {
    this.props.onNearMeClick();
  };

  render() {
    return (
      <div className="average-rating">
        <button
          className="view-restaurants-button"
          onClick={this.onNearMeClick}
        >
          Find restaurants near me
        </button>
        <form onSubmit={this.onSubmit}>
          <label>
            {" "}
            Filter by average rating:
            <select
              value={this.state.value}
              onChange={this.onChange}
              onClick={this.onFilterClick}
            >
              <option value="All">All</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <input type="submit" value="Submit" className="submit-button" />
        </form>
      </div>
    );
  }
}

export default RestaurantFilter;
