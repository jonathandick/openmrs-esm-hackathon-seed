export function getSession(signal: any) {
  return fetch(`/openmrs/ws/rest/v1/session`, {
    method: "GET",
    signal: signal,
    headers: {
      Accept: "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`Error. Server responded with ${res.status}`);
    }
  });
}
