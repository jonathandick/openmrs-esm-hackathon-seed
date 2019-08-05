import React, { useState } from "react";
import styles from "../order-entry.module.css";
import { getSession } from "../../resources/session.resource";
import { postTest } from "../../resources/order.resource";

export default function OrderBasket(props: OrderBasketProps) {
  const [drug, setDrug] = useState({});
  const abortController = new AbortController();

  function handleSubmit($event) {
    $event.preventDefault();

    postTest();
    const encounter = "f91093d0-2fdb-4d0c-95b9-7d28e26eddfe";
    let provider;

    function setProvider() {
      getSession(abortController.signal).then(
        x => (provider = x.results.user.uuid)
      );
    }

    props.orderBasket.map(x => {
      let payload = {
        type: "drugorder",
        orderer: "e89cae4a-3cb3-40a2-b964-8b20dda2c985",
        patient: "8673ee4f-e2ab-4077-ba55-4980f408773e",
        careSetting: "6f0c9a92-6f24-11e3-af88-005056821db0",
        encounter: "f91093d0-2fdb-4d0c-95b9-7d28e26eddfe",
        frequency: "160862OFAAAAAAAAAAAAAAA",
        drug: "18f43c99-2329-426e-97b5-c3356e6afe54",
        dosingType: "org.openmrs.SimpleDosingInstructions",
        dose: 1,
        doseUnits: "1513AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        quantity: 20,
        quantityUnits: "162396AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        duration: 7,
        durationUnits: "1072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        numRefills: 1,
        route: "160240AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      };
    });

    alert("Orders successfully submitted");
    props.setOrderBasket([]);
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
          onClick={$evt => 1 + 1} //console.log(props.orderBasket)}
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
};
