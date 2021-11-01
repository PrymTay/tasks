import axios from "axios";
import { useState, useEffect } from "react";
// import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../ui/card/card";
import styles from "../ui/card/table.module.css";

import "jquery/dist/jquery.min.js";

//Datatable Modules

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

function Food() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setloadedData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios("https://api.fda.gov/food/enforcement.json?limit=10")
      .then((Response) => {
        //saving data to state
        setloadedData(Response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return "Error!";

  $(document).ready(function () {
    $("#dtHorizontal").DataTable({
      scrollX: true,
    });
    $(".dataTables_length").addClass("bs-select");
  });

  return (
    <Card>
      <div className={styles.dtHorizontalWrapper}>
        <table
          id="dtHorizontal"
          className="table table-bordered table-striped table-sm"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              {/* setting keys as the colunms of the table */}
              {Object.keys(Object.assign({}, ...loadedData)).map((val) => (
                <th>{val}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loadedData.map((loadedData, index) => {
              return (
                <tr key={index}>
                  <td> {loadedData.country}</td>
                  <td>{loadedData.city}</td>
                  <td>{loadedData.address_1}</td>
                  <td>{loadedData.reason_for_recall}</td>
                  <td>{loadedData.address_2}</td>
                  <td> {loadedData.product_quantity}</td>
                  <td>{loadedData.code_info}</td>
                  <td>{loadedData.center_classification_date}</td>
                  <td>{loadedData.distribution_pattern}</td>
                  <td>{loadedData.state}</td>
                  <td> {loadedData.product_description}</td>
                  <td> {loadedData.report_date}</td>
                  <td>{loadedData.classification}</td>
                  <td></td>
                  <td>{loadedData.recalling_firm}</td>
                  <td> {loadedData.recall_number}</td>
                  <td>{loadedData.initial_firm_notification}</td>
                  <td>{loadedData.product_type}</td>

                  <td>{loadedData.event_id}</td>

                  <td>{loadedData.more_code_info}</td>
                  <td>{loadedData.recall_initiation_date}</td>
                  <td>{loadedData.postal_code}</td>
                  <td>{loadedData.voluntary_mandated}</td>

                  <td>{loadedData.status}</td>

                  <td>{loadedData.termination_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default Food;
