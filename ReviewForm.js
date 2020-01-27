import React from "react";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      thankyou: "thank-you",
      starRating: 1,
      newData: { key: null, username: "", stars: null, comment: "" }
    };
  }

  onChange = event => {
    this.setState({
      starRating: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();

    !event.target.review.value || !event.target.username.value
      ? alert("Field empty!")
      : this.setState({
          newData: {
            key: this.props.restaurantKey,
            username: event.target.username.value,
            stars: parseInt(this.state.starRating),
            comment: event.target.review.value
          }
        });
    this.thankyou();
  };

  componentDidUpdate(e) {
    if (this.state.newData.stars !== null) {
      this.props.getNewReviewProps(this.state.newData);
      this.setState({
        open: !this.state.open
      });
    }
    if (this.state.newData.stars !== null) {
      this.setState({ newData: { stars: null } });
    }
  }

  toggleList = e => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  };

  thankyou = e => {
    this.setState({
      thankyou: "thank-you-show"
    });
    setTimeout(() => {
      this.setState({
        thankyou: "thank-you"
      });
    }, 3000);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div thankyou={this.state.thankyou} className={this.state.thankyou}>
          Thank you! Your review has been submitted
        </div>
        <input
          type="submit"
          name={"restaurant"}
          value={"Add review: " + this.props.restaurantName}
          className="review-restaurant-button"
          onSubmit={this.onSubmit}
          onClick={e => this.toggleList(e)}
        />

        {this.state.open ? (
          <div className="review-section">
            <div className="review-text-box-headings">Name</div>
            <input
              type="text"
              name="username"
              placeholder="Name"
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />

            <br />
            <div>
              <div className="review-text-box-headings">Review </div>
              <textarea
                type="text"
                name="review"
                maxLength="250"
                placeholder="Review it! Max 250 words"
                onChange={this.onChange}
                onSubmit={this.onSubmit}
              />
            </div>

            <br />
            <div className="ratings">
              <div className="rating-header">Rating</div>
              <select
                value={this.state.value}
                onChange={this.onChange}
                name={"starRating"}
              >
                {" "}
                <option value={null}>Select a rating</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button
              onClick={this.props.onSubmit}
              className="submit-review-button"
            >
              Submit your review
            </button>
          </div>
        ) : null}
      </form>
    );
  }
}

export default ReviewForm;
