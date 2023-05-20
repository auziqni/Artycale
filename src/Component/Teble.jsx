import { useEffect, useState } from "react";
import { Box, dividerClasses } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Table() {
  const [item, setItem] = useState([]);
  const getuser = async () => {
    try {
      let response = await axios.get(
        "http://51.79.147.119/api/artycale/ReadAll.php",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setItem(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getuser();
  });

  const columns = [
    {
      field: "IdPel",
      headerName: "ID",
      flex: 1,
    },
    { field: "Date", headerName: "Tanggal" },
    {
      field: "Parent",
      headerName: "Nama Orang Tua",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Child",
      headerName: "Nama Orang Anak",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "IdTele",
      headerName: "Id Telegram",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  return (
    <Box>
      <DataGrid
        //   checkboxSelection
        rows={item}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default Table;
