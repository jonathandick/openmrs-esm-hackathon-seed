import React, { useState } from "react";
import { doSearch } from "../../resources/drug.resource";

export default function DrugSearch(props: DrugSearchProps) {
  const [doDrugSearch, setDoDrugSearch] = useState(false);
  const [drugSearchTerm, setDrugSearchTerm] = useState("");

  const [results, setResults] = useState([]);

  const abortController = new AbortController();

  React.useEffect(() => {
    if (doDrugSearch) {
      doSearch(drugSearchTerm, abortController.signal)
        .then(x => {
          setResults(x.results);
        })
        .finally(() => {
          setDoDrugSearch(false);
        });
    }
  }, [doDrugSearch]);

  function handleSubmit($event) {
    $event.preventDefault();
    setDoDrugSearch(true);
  }

  function handleChange($event) {
    setDrugSearchTerm($event.target.value);
  }

  function createDrugOrderForm(result) {
    props.setOrderData({ drug: result });
    props.setDoCreateDrugOrderForm(true);
    setResults([]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange}></input>
        <input type="submit" value="Search"></input>
      </form>
      {results.length > 0 && (
        <table>
          <tr>
            <th>#</th>
            <th>Drug</th>
            <th>Strength</th>
            <th></th>
          </tr>
          {results.length > 0 &&
            results.map((result, i) => [
              <tr>
                <td>{i + 1}</td>
                <td>{result.display}</td>
                <td>{result.strength}</td>
                <td>
                  <button onClick={evt => createDrugOrderForm(result)}>
                    Order
                  </button>
                </td>
              </tr>
            ])}
        </table>
      )}
    </div>
  );
}

type DrugSearchProps = {
  setOrderData(orderData: {}): void;
  setDoCreateDrugOrderForm(x: boolean): void;
};
