import React, { useState } from "react";
import { orderEntryConfig } from "../../demo.order-entry-config";

export default function DrugOrderForm(props: DrugOrderPropsType) {
  //console.log("creating drug order form");
  const orderData = props.orderData;

  const orderId = Math.random();

  const [drug, setDrug] = useState(orderData.drug || {});
  const [quantityOrdered, setQuantityOrdered] = useState(
    orderData.quantityOrdered || 0
  );
  const [dosage, setDosage] = useState(orderData.dosage || "");
  const [dosageIndex, setDosageIndex] = useState(orderData.dosageIndex || 0);
  const [frequency, setFrequency] = useState(orderData.frequency || {});
  const [route, setRoute] = useState(orderData.route || "");
  const [asNeeded, setAsNeeded] = useState(orderData.asNeeded || false);
  const [asNeededReason, setAsNeededReason] = useState(
    orderData.asNeededReason || ""
  );
  const [duration, setDuration] = useState(orderData.duration || "");
  const [durationUnits, setDurationUnits] = useState(
    orderData.durationUnits || ""
  );
  const [instructions, setInstructions] = useState(
    orderData.instructions || ""
  );
  const [numRefills, setNumRefills] = useState(orderData.numRefills || 0);

  let isComplete = false;

  React.useEffect(() => {
    calculateQuantity();
  }, [dosage, frequency, duration]);

  function handleSubmit($event) {
    $event.preventDefault();
    isComplete = $event.target.checkValidity();
    addToOrdersBasket();

    props.setDoCreateDrugOrderForm(false);
  }

  function isCompleteOrder(order) {
    return false;
  }

  function addToOrdersBasket() {
    if (isValidOrder().isValid) {
      const order = createDrugOrder();
      let newOrderBasket = [];
      if (props.orderData.orderId) {
        props.orderBasket.map(x => {
          // @ts-ignore
          if (x.orderId === props.orderData.orderId) {
            newOrderBasket.push(order);
          } else {
            newOrderBasket.push(x);
          }
        });
      } else {
        newOrderBasket = [...props.orderBasket, order];
      }
      props.setOrderBasket(newOrderBasket);
      props.setOrderData({});
      return true;
    }
    return false;
  }

  function isValidOrder() {
    let errors = [];
    if (hasAllergyTo()) {
      errors.push("Has allergy");
    }

    if (hasInteractionWithExistingDrug()) {
      errors.push("Has interaction with existing drug");
    }

    if (duplicatesActiveOrder()) {
      errors.push("Duplicates active order");
    }
    return { errors: errors, isValid: errors.length === 0 };
  }

  function hasAllergyTo() {
    return false;
  }

  function hasInteractionWithExistingDrug() {
    return false;
  }

  function duplicatesActiveOrder() {
    return false;
  }

  function overMaximumDailyAmount() {
    return false;
  }

  //FOR NOW, HARD CODING outpatient caresetting.
  function createDrugOrder() {
    let drugOrder = {
      orderId: props.orderData.orderId || orderId,
      type: "drugorder",
      display: drug.display + " " + drug.strength,
      patient: props.patientUuid,
      careSetting: "6f0c9a92-6f24-11e3-af88-005056821db0",
      orderer: "",
      encounter: "",
      drug: drug,
      dose: dosage,
      doseUnits: drug.dosageForm.uuid,
      route: route,
      frequency: frequency,
      asNeeded: asNeeded,
      duration: duration,
      durationUnits: durationUnits,
      asNeededCondition: asNeededReason,
      instructions: instructions,
      numRefills: numRefills,
      quantity: "",
      quantityUnits: "",
      action: "",
      isComplete: isComplete
    };
    return drugOrder;
  }

  //DOES NOT HANDLE STRENGTHS WITH COMBINED UNITS, E.G. 5/125 ml/g, as used in suspensions
  function getStrengthParts(strength) {
    if (strength) {
      var i = /[a-z]/.exec(strength);
      return [
        strength.substring(0, i.index).trim(),
        strength.substring(i.index).trim()
      ];
    }
    return;
  }

  function calculateCommonDosages() {
    const [strength, unit] = getStrengthParts(drug.strength);
    return [strength, strength * 2, strength * 3, strength * 4];
  }

  function calculateQuantity() {
    try {
      const q =
        +dosage *
        +frequency.frequency_per_day *
        (+duration < 7 ? +duration : 7);
      setQuantityOrdered(q);
    } catch (err) {
      setQuantityOrdered(0);
    }
  }

  function getQuantityUnit() {
    return "Tablet";
  }

  return (
    <div>
      {props.doCreateDrugOrderForm && (
        <form onSubmit={handleSubmit} noValidate>
          <table>
            <tr>
              <td>Drug:</td>
              <td>
                {drug.display}: {drug.strength}
              </td>
            </tr>
            <tr>
              <td>Dosage:</td>
              <td>
                <option />
                <select
                  required
                  onChange={$evt => setDosageIndex(+$evt.target.value)}
                  value={dosageIndex}
                >
                  <option />
                  {calculateCommonDosages().map((x, i) => [
                    <option value={i}>{x}</option>
                  ])}
                </select>
              </td>
            </tr>
            <tr>
              <td>Route:</td>
              <td>
                <select
                  required
                  onChange={$evt => setRoute($evt.target.value)}
                  value={route}
                >
                  <option />
                  {orderEntryConfig.drugRoutes.options.map(x => [
                    <option value={x.conceptUuid}>{x.conceptLabel}</option>
                  ])}
                </select>
              </td>
            </tr>
            <tr>
              <td>Frequency:</td>
              <td>
                <select
                  required
                  onChange={$evt => setFrequency($evt.target.value)}
                >
                  <option />
                  {orderEntryConfig.frequencies.map(x => [
                    <option value={x.uuid}>{x.conceptLabel}</option>
                  ])}
                </select>
              </td>
            </tr>

            <tr>
              <td>As needed:</td>
              <td>
                <input
                  type="checkbox"
                  onChange={$evt => setAsNeeded($evt.target.checked)}
                ></input>
              </td>
            </tr>

            {asNeeded && (
              <tr>
                <td>As needed reason:</td>
                <td>
                  <textarea
                    required
                    onChange={$evt => {
                      setAsNeededReason($evt.target.value);
                    }}
                    value={asNeededReason}
                  >
                    {" "}
                  </textarea>
                </td>
              </tr>
            )}

            <tr>
              <td>Duration:</td>
              <td>
                <input
                  required
                  type="text"
                  onChange={$evt => setDuration($evt.target.value)}
                  value={duration}
                />
              </td>
            </tr>

            <tr>
              <td>Duration Units:</td>
              <td>
                <select
                  required
                  onChange={$evt => setDurationUnits($evt.target.value)}
                  value={durationUnits}
                >
                  <option />
                  {orderEntryConfig.durationUnits.options.map(x => [
                    <option value={x.conceptUuid}>{x.conceptLabel}</option>
                  ])}
                </select>
              </td>
            </tr>

            <tr>
              <td>Refills:</td>
              <td>
                <input
                  required
                  type="text"
                  onChange={$evt => setNumRefills($evt.target.value)}
                  value={numRefills}
                />
              </td>
            </tr>

            <tr>
              <td>Dosing Instructions:</td>
              <td>
                <textarea
                  value={instructions}
                  onChange={$evt => {
                    setInstructions($evt.target.value);
                  }}
                />
              </td>
            </tr>

            <tr>
              <td>Quantity Ordered</td>
              <td>
                {quantityOrdered > 0
                  ? "" + quantityOrdered + " " + drug.dosageForm.display
                  : ""}
              </td>
            </tr>
          </table>
          <input type="submit" value="Save" />
          <input
            type="button"
            value="Cancel"
            onClick={$evt => props.setDoCreateDrugOrderForm(false)}
          />
        </form>
      )}
    </div>
  );
}

type DrugOrderPropsType = {
  doCreateDrugOrderForm: boolean;
  setDoCreateDrugOrderForm(x: boolean): void;
  orderData: any;
  setOrderData({}): void;
  orderBasket: {}[];
  setOrderBasket(orderBasket: {}[]): void;
  patientUuid: string;
};
