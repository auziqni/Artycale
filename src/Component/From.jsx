import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const MyForm = (params) => {
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        "https://auziqni.com/Update.php",
        {
          Parent: parentName,
          Child: childName,
          IdTele: address,
          IdPel: params.idpel,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data);

      navigate("/home");

      setParentName("");
      setChildName("");
      setAddress("");
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Parent's Name:
        <input
          type="text"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Child's Name:
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Tele Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
