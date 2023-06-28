import React, { useEffect ,useState} from "react";
import Row from "../components/Row";
import style from "./dashboard.module.css"

const Dashboard = () => {

  const [data,setData] = useState([]);
  useEffect(() => {
   fetch (`http://localhost:${process.env.REACT_APP_BACKEND_SERVER_PORT}/tours`)
   .then((res)=>res.json())
   .then((res)=>{
    console.log(res)
    setData(res)
   })

  }, []);

  return (
    <div id={style.Conatiner}>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>tour location</th>
            <th>no of traveller</th>
            <th>budget per head</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((elem)=>{
            return <Row key={elem.id} {...elem}/>
          })}
            
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
