import React from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {
  componentWillUpdate() {
    console.log("[Order Summary] Will Update");
  }

  render() {
    const IngredientsSummary = Object.keys(this.props.ingredients).map(
      (igkey) => {
        return (
          <li key={igkey}>
            <span style={{ textTransform: "capitalize" }}>{igkey} : </span>
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );

    return (
      <div>
        <h3>Your Order</h3>
        <p>A delicious Burger with the following ingredients:</p>
        <ul>{IngredientsSummary}</ul>
        <p>
          <b>Total Price : {this.props.totalPrice.toFixed(2)}</b>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          Continue
        </Button>
      </div>
    );
  }
}

export default OrderSummary;
