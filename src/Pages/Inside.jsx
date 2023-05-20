import { useNavigate, useParams } from "react-router-dom";

function Inside() {
  const navigate = useNavigate();
  const { data } = useParams();
  return (
    <div>
      <h1>hello {data}</h1>
    </div>
  );
}

export default Inside;
