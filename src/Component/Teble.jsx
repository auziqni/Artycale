function Table() {
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
  return <div>sdfsdfsdf</div>;
}

export default Table;
