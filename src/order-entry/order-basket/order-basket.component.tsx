import React, { useState } from "react";
import styles from "../order-entry.module.css";
import { getSession } from "../../resources/session.resource";
import { jsxAttribute } from "@babel/types";
import { createOrder } from "../../resources/order.resource";

export default function OrderBasket(props: OrderBasketProps) {
  const [drug, setDrug] = useState({});
  const abortController = new AbortController();

  let provider;
  /*
  getSession(abortController.signal).then(
      x => (provider = x.results.user.uuid)
  );
  */

  function handleSubmit($event) {
    $event.preventDefault();

    const encounter = "f91093d0-2fdb-4d0c-95b9-7d28e26eddfe";

    props.orderBasket.map(x => {
      let payload = {
        type: "drugorder",
        orderer: "e89cae4a-3cb3-40a2-b964-8b20dda2c985",
        patient: x.patient,
        careSetting: "6f0c9a92-6f24-11e3-af88-005056821db0",
        encounter: "f91093d0-2fdb-4d0c-95b9-7d28e26eddfe",
        frequency: x.frequency,
        drug: x.drug.uuid,
        dosingType: "org.openmrs.SimpleDosingInstructions",
        dose: x.dose,
        doseUnits: x.doseUnits,
        quantity: 1,
        quantityUnits: "162396AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        duration: x.duration,
        durationUnits: x.durationUnits,
        numRefills: x.numRefills,
        route: x.route
      };

      //console.log(payload);
      createOrder(payload, abortController.signal).then(x =>
        props.setDoGetExistingPatientOrders(true)
      );
    });

    //props.setOrderBasket([]);
  }

  function clearOrders($event) {
    props.setOrderBasket([]);
  }

  function handleEditPendingOrder(order) {
    //NEED TO HANDLE: (1) warning user if another order being currently edited that it will overwrite that.
    props.setOrderData(order);
    props.setDoCreateDrugOrderForm(true);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        Pending Orders:
        <table>
          <tr>
            <th>Order</th>
            <th />
          </tr>
          {props.orderBasket.map(x => (
            <tr>
              <td className={x.isComplete ? styles.valid : styles.invalid}>
                {x.display}
              </td>
              <td>
                <input
                  type="button"
                  value="Edit"
                  onClick={$evt => handleEditPendingOrder(x)}
                ></input>
              </td>
            </tr>
          ))}
        </table>
        <input type="button" value="Clear Orders" onClick={clearOrders} />
        <input type="submit" value="Submit Order(s)" />
        <br />
        <input
          type="button"
          value="view order basket"
          onClick={
            $evt => 1 + 1
            //console.log(props.orderBasket)
          }
        />
      </form>
    </div>
  );
}

type OrderBasketProps = {
  orderBasket: any[];
  setOrderBasket(orders: []): void;
  setOrderData({}): void;
  setDoCreateDrugOrderForm(x: boolean): void;
  setDoGetExistingPatientOrders(x: boolean): void;
};
