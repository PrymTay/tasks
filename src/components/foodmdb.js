import axios from "axios";
import { useState, useEffect } from "react";
// import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../ui/card/card";
import styles from '../ui/card/table.module.css'

// import 'jquery/dist/jquery.min.js';

// //Datatable Modules

// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import $ from 'jquery'; 

//mdb
import {MDBDataTableV5, MDBDataTable} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

function FoodMdb(){
   
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
      })
  },[])
//   var result = Object.keys(loadedData).map((key) => [loadedData[key]]);
   console.log(loadedData)
 const obj = {columns: [
   
    {
      label: 'Country',
      field: 'country',
      width: 150,
     
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },
    {
      label: 'city',
      field: 'city',
      width: 10,
    },
    {
      label: 'address 1',
      field: 'address_1',
      width: 200,
    },
    {
      label: 'Reason',
      field: 'reason_for_recall',
      autowidth:false,
      maxwidth: 200,
  
        overflow: 'hidden',
        textoverflow: 'ellipsis',
        whitespace: 'nowrap',
      
     
      
    },
    {
      label: ' Address 2',
      field: 'address_2',
     
      width: 150,
    },
    {
      label: 'Product Quantity',
      field: 'product_quantity',
    
      width: 250,
    },
    {
        label: 'Code Info',
        field: 'code_info',
      
        width: 200,
      },
      {
        label: 'Center Classification Date',
        field: 'center_classification_date',
 
        width: 200,
      },
      {
        label: 'Distribution Pattern',
        field: 'distribution_pattern',
 
        width: 200,
      },
      {
        label: 'State',
        field: 'state',
 
        width: 200,
      },
      {
        label: 'Product Destribution',
        field: 'product_description',
 
        width: 200,
      },
      {
        label: 'report date',
        field: 'report_date',
 
        width: 200,
      },
      {
        label: 'classification',
        field: 'classification',
 
        width: 200,
      },
      {
        label: 'Recalling Firm',
        field: 'recalling_firm',
 
        width: 200,
      },
    
      {
        label: 'Recall Number',
        field: 'recall_number',
 
        width: 200,
      },
      {
        label: 'Product Type',
        field: 'product_type',
 
        width: 200,
      },
      {
        label: 'Event ID',
        field: 'event_id',
 
        width: 200,
      },
      {
        label: 'More Code Info',
        field: 'more_code_info',
 
        width: 200,
      },
     
      {
        label: 'Recall Initiation Date',
        field: 'recall_initiation_date',
 
        width: 200,
      },
      {
        label: 'Postal Code',
        field: 'postal_code',
 
        width: 200,
      },
      {
        label: 'Voluntary Mandated',
        field: 'voluntary_mandated',
 
        width: 200,
      },
      {
        label: 'Status',
        field: 'status',
 
        width: 200,
      },
      {
        label: 'Termination Date',
        field: 'termination_date',
 
        width: 200,
      },
  ],
  
  rows:loadedData
}
const widerData = {
    columns: [
      ...obj.columns.map((col) => {
        col.width = 200;
        return col;
      }),
    ],
    rows: [...obj.rows],
  };

      if (isLoading) return (
        <div >
           Loading...
        </div>
        );
      if (error) return "Error!";
    
  

  return <Card >
  <div ><MDBDataTable className={styles.dtHorizontalWrapper} hover bordered entriesOptions={[5, 20, 25]} entries={5} scrollX data={widerData} fullpagination searchtop searchbottom={false}/></div>
  </Card>


  }


export default FoodMdb;

