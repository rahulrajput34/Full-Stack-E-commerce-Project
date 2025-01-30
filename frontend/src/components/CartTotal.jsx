import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, deliveryFees, getCartAmount } = useContext(ShopContext);

  const totalAmountWithTax = getCartAmount();
  const subtotal = totalAmountWithTax;
  const taxAmount = subtotal * 0.13;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TO" />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Tax (13%)</p>
          <p>
            {currency}
            {taxAmount.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {deliveryFees}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {(subtotal + taxAmount + deliveryFees).toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
