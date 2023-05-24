import { useParams } from "react-router-dom";
import Graph from "../Component/Gpraph";
import { useEffect, useState } from "react";
import axios from "axios";

function Inside() {
  const { data } = useParams();
  const [dataAnak, setDataAnak] = useState({});
  const [counter, setCounter] = useState(0);

  const getuser = async () => {
    try {
      let response = await axios.post(
        "https://auziqni.com/ReadOneDetiled.php",
        {
          child: data,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
      if (response.data.length > 0) {
        setDataAnak(response.data[0]);
      }
    } catch (e) {
      console.log(e);
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

  return (
    <div>
      <div>
        <h1>Orang Tua: {dataAnak.Parent} </h1>
        <h2>Anak: {dataAnak.Child}</h2>
        <h2>Telegram: {dataAnak.IdTele} </h2>

        <Graph child={data} />
      </div>
    </div>
  );
}

export default Inside;
