import React from "react";
import style from "./row.module.css"
const Row = ({
  id,
  name,
  email,
  tourLocation,
  noOfTraveller,
  budgetPerHead,
}) => {
  return <tr style={{border:"1px solid"}}>
    <td>{id}</td>
    <td>{name}</td>
    <td>{email}</td>
    <td>{tourLocation}</td>
    <td>{noOfTraveller}</td>
    <td>{budgetPerHead}</td>
  </tr>;
};

export default Row;
