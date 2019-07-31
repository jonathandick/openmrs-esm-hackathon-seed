import React, { useState } from "react";
import OrderBasket from "../order-basket/order-basket.component";
import DrugOrder from "../drug-order/drug-order.component";

import styles from "./order-entry.module.css";

export default function OrderEntry() {
  const [orderBasket, setOrderBasket] = useState([]);
  const [drug, setDrug] = useState({});

  return (
    <div>
      <div className={styles.container}>
        <div>
          <DrugOrder
            drug={drug}
            setDrug={setDrug}
            orderBasket={orderBasket}
            setOrderBasket={setOrderBasket}
          />
        </div>
        <div className={styles.orderBasket}>
          <OrderBasket
            orderBasket={orderBasket}
            setOrderBasket={setOrderBasket}
          />
        </div>
      </div>
    </div>
  );
}
