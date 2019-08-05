import React, { useState } from "react";
import OrderBasket from "./order-basket/order-basket.component";
import DrugOrderForm from "./drug-order-form/drug-order-form.component";
import DrugSearch from "./drug-search/drug-search.component";
import ExistingPatientOrders from "../active-patient-orders/active-patient-drug-orders.component";
import { orderEntryConfig } from "../order-entry-config.js";

import styles from "./order-entry.module.css";
import { Recoverable } from "repl";

export default function OrderEntry(props: OrderEntryPropsType) {
  const [orderBasket, setOrderBasket] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [doCreateDrugOrderForm, setDoCreateDrugOrderForm] = useState(false);

  //console.log("Rendering OrderEntry component");

  React.useEffect(() => {
    //console.log("OrderEntry.useEffect: order data change");
    //console.log(orderData);
  }, [orderData]);

  return (
    <div>
      <div>
        <ExistingPatientOrders
          patientUuid={props.patientUuid}
          setDoCreateDrugOrderForm={setDoCreateDrugOrderForm}
          setOrderData={setOrderData}
        />
      </div>
      <div className={styles.container}>
        <div>
          <DrugSearch
            setOrderData={setOrderData}
            setDoCreateDrugOrderForm={setDoCreateDrugOrderForm}
          />
        </div>

        <div>
          {doCreateDrugOrderForm && (
            <DrugOrderForm
              doCreateDrugOrderForm={doCreateDrugOrderForm}
              setDoCreateDrugOrderForm={setDoCreateDrugOrderForm}
              orderData={orderData}
              setOrderData={setOrderData}
              orderBasket={orderBasket}
              setOrderBasket={setOrderBasket}
              patientUuid={props.patientUuid}
            />
          )}
        </div>

        <div className={styles.orderBasket}>
          <OrderBasket
            orderBasket={orderBasket}
            setOrderBasket={setOrderBasket}
            setOrderData={setOrderData}
            setDoCreateDrugOrderForm={setDoCreateDrugOrderForm}
          />
        </div>
      </div>
    </div>
  );
}

type OrderEntryPropsType = {
  patientUuid: string;
};
