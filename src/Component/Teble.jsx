import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";

function Table() {
  const [item, setItem] = useState([]);
  const [counter, setCounter] = useState(0);
  const getuser = async () => {
    try {
      let response = await axios.get("https://auziqni.com/ReadAll.php");
      console.log(response.data);
      setItem(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (counter < 100) {
      getuser();
      const timer = setTimeout(() => {
        setCounter(counter + 1);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [counter]);

  const columns = [
    {
      field: "IdPel",
      headerName: "ID",
      flex: 0.5,
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
      renderCell: (params) => (
        <Link to={`/detail/${params.row.Child}`}>{params.row.Child}</Link>
      ),
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
        getRowId={(row) => row.IdPel}
      />
    </Box>
  );
}

export default Table;
