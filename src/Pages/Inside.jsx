import { useNavigate, useParams } from "react-router-dom";
import Graph from "../Component/Gpraph";

function Inside() {
  const navigate = useNavigate();
  const { data } = useParams();

  return (
    <div>
      <h1>dibawah ini adalah grpah</h1>
      <Graph name={data} />
    </div>
  );
}

export default Inside;
