const drugOrderTypeUuid = "53eb466e-1359-11df-a1f1-0026b9348838";
const testOrderTypeUuid = "53eb4768-1359-11df-a1f1-0026b9348838";

export function getActivePatientOrders(patientUuid: string, signal: any) {
  return fetch(
    `/openmrs/ws/rest/v1/order?patient=${patientUuid}&ordertype=${drugOrderTypeUuid}&v=full`,
    {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json"
      }
    }
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`Error. Server responded with ${res.status}`);
    }
  });
}

export function createOrder(data, signal) {
  return fetch(`/openmrs/ws/rest/v1/order`, {
    method: "POST",
    signal: signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json "
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`Error. Server responded with ${res.status}`);
    }
  });
}

const data = {
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

export function postTest() {
  return fetch(`/openmrs/ws/rest/v1/order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json "
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`Error. Server responded with ${res.status}`);
    }
  });
}
