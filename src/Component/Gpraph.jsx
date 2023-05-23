import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

function Graph(params) {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const getuser = async () => {
    setIsLoading(true);

    try {
      let response = await axios.post(
        "https://auziqni.com/ReadOne.php",
        {
          child: params.child,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
      setItem(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (counter < 2) {
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
    },
    {
      field: "SensWeight",
      headerName: "berat",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "SensLenght",
      headerName: "panjang",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "SensTemp",
      headerName: "suhu",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <div>
      <h1>Data MySQL</h1>
      <button onClick={getuser} disabled={isLoading}>
        {isLoading ? "Memuat..." : "Ambil Data"}
      </button>
      <Box>
        <DataGrid
          //   checkboxSelection
          rows={item}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.No}
        />
      </Box>
    </div>
  );
}

export default Graph;
