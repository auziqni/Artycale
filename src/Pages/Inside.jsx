import { useParams } from "react-router-dom";
import Graph from "../Component/Gpraph";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../Component/TestGraph";

function Inside() {
  // const navigate = useNavigate();
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
        <h1>{dataAnak.Child} </h1>
        <h2>{dataAnak.Parent} </h2>
      </div>

      <Graph child={data} />
      {/* <Chart /> */}
    </div>
  );
}

export default Inside;
