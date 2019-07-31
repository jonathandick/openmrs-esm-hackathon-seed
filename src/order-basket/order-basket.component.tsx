import React, { useState } from "react";

export default function OrderBasket(props: OrderBasketProps) {
  function handleSubmit($event) {
    $event.preventDefault();
    alert("Orders successfully submitted");
    props.setOrderBasket([]);
  }

  function clearOrders($event) {
    props.setOrderBasket([]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Pending Orders:
        <table>
          <tr>
            <th>Order</th>
          </tr>
          {props.orderBasket.map(x => (
            <tr>
              <td>{x.display}</td>
            </tr>
          ))}
        </table>
        <input type="button" value="Clear Orders" onClick={clearOrders} />
        <input type="submit" value="Submit Order(s)" />
      </form>
    </div>
  );
}

type OrderBasketProps = {
  orderBasket: any[];
  setOrderBasket(orders: []): void;
};
