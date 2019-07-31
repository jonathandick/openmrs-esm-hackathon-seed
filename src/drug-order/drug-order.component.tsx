import React, { useState } from "react";
import styles from "../order-entry/order-entry.module.css";
import DrugSearch from "../drug-search/drug-search.component";

export default function DrugOrder(props: DrugOrderPropsType) {
  const [drugOrder, setDrugOrder] = useState({});

  function handleSubmit($event) {
    $event.preventDefault();
    addToOrders();
  }

  function addToOrders() {
    const order = createDrugOrder();
    props.setOrderBasket([...props.orderBasket, order]);
  }

  function createDrugOrder() {
    var drugOrder = {
      drug: props.drug,
      display: props.drug.display + " " + props.drug.strength
    };
    return drugOrder;
  }

  return (
    <div>
      <div className={styles.drugSearch}>
        <DrugSearch drug={props.drug} setDrug={props.setDrug} />
      </div>

      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>Drug</td>
            <td>{props.drug.display}</td>
          </tr>
          <tr>
            <td>Strength</td>
            <td>{props.drug.strength}</td>
          </tr>
          <tr>
            <td>Dosage</td>
            <td></td>
          </tr>
          <tr>
            <td>Dose Units</td>
            <td></td>
          </tr>
          <tr>
            <td>Frequency</td>
            <td></td>
          </tr>
          <tr>
            <td>Route</td>
            <td></td>
          </tr>
          <tr>
            <td>Duration</td>
            <td></td>
          </tr>
        </table>
        <input type="submit" value="Add to Order(s)" />
      </form>
    </div>
  );
}

type DrugOrderPropsType = {
  drug: any;
  setDrug(drug: {}): void;
  orderBasket: string[];
  setOrderBasket(orderBasket: {}[]): void;
};
