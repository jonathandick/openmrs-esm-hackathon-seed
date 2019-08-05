import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import OrderEntry from "./order-entry/order-entry.component";

export default function Root(props: RootProps) {
  return (
    <div>
      <OrderEntry patientUuid={props.patientUuid} />
    </div>
    /*
    <BrowserRouter basename="/openmrs/spa/patient">
      <Route exact path="/" component={OrderEntry} />
    </BrowserRouter>
*/
  );
}

type RootProps = {
  patientUuid: string;
};
