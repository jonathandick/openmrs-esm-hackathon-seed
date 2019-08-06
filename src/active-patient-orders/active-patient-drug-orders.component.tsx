import React, { useState } from "react";
import {
  getActivePatientOrders,
  createOrder,
  postTest
} from "../resources/order.resource";

export default function PatientOrders(props: PatientOrdersProps) {
  const mockActiveOrder1 = {};

  const [existingPatientOrders, setExistingPatientOrders] = useState([]);

  const abortController = new AbortController();

  React.useEffect(() => {
    if (props.doGetExistingPatientOrders) {
      getActivePatientOrders(props.patientUuid, abortController.signal)
        .then(x => {
          setExistingPatientOrders(x.results);
          //console.log(x.results);
        })
        .finally(() => {
          props.setDoGetExistingPatientOrders(false);
        });
    }
  }, [props.doGetExistingPatientOrders]);

  function handleRenewOrder(order: {}) {
    props.setOrderData({}); //need way to get order data
    props.setDoCreateDrugOrderForm(true);
  }

  function handleDiscontinueOrder(order) {
    //TO DO: encouter will need to be switched as it shouldn't be the encounter (necessarily) in which the orginal order was created
    const payload = {
      type: "drugorder",
      action: "DISCONTINUE",
      previousOrder: order.uuid,
      patient: order.patient.uuid,
      careSetting: order.careSetting.uuid,
      encounter: order.encounter.uuid,
      drug: order.drug.uuid,
      orderer: "e89cae4a-3cb3-40a2-b964-8b20dda2c985"
    };

    createOrder(payload, abortController.signal).then(x => {
      //console.log(x);
      props.setDoGetExistingPatientOrders(true);
    });
  }

  return (
    <div>
      <input
        type="button"
        value="Test Posting an Order"
        onClick={$evt => {
          postTest().then(x => props.setDoGetExistingPatientOrders(true));
        }}
      ></input>
      Existing Orders:
      <table>
        {existingPatientOrders.length > 0 &&
          existingPatientOrders.map(order => [
            <tr>
              <td>
                <button onClick={$evt => handleRenewOrder(order)}>Renew</button>
              </td>
              <td>
                <button onClick={$evt => handleDiscontinueOrder(order)}>
                  Discontinue
                </button>
              </td>

              <td>
                {
                  // @ts-ignore
                  order.display
                }
              </td>
            </tr>
          ])}
      </table>
    </div>
  );
}

type PatientOrdersProps = {
  patientUuid: string;
  setDoCreateDrugOrderForm(x: boolean): void;
  setOrderData({}): void;
  setDoGetExistingPatientOrders(boolean): void;
  doGetExistingPatientOrders: boolean;
};
