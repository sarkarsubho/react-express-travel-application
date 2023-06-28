import React, { useState } from "react";
import style from "./form.module.css";

const Form = () => {
  const [form, setForm] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg,setSuccessMsg] =useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (email) => {
    email.preventDefault();
    console.log(form);
    fetch(
      `https://weary-wasp-clothes.cyclic.app/tours`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setErrorMsg(res.message);
        } else {
          setErrorMsg("");
          setForm({
            name: "",
            email: "",
            tourLocation: "",
            noOfTraveller: "",
            budgetPerHead: "",
          });
          setSuccessMsg("Successfully Submitted !!!")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    <h1 id="formTitle">Travel Booking Form</h1>
    <div id={style.FormContainer}>
    
      

      <div id="error">{errorMsg && <div id={style.errorMsg}>{errorMsg} </div>}</div>
      <form onSubmit={handleSubmit}>
        <lable>Name</lable>
        <br />
        <input
          type="text"
          placeholder="Enter Name"
          onChange={handleChange}
          value={form.name || ""}
          name="name"
          id="name"
        />
        <br />

        <lable>Email</lable>
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          onChange={handleChange}
          value={form.email || ""}
          name="email"
          id="email"
        />
        <br />
        <lable>Tour location</lable>
        <br />
        <select onChange={handleChange} name="tourLocation" id="tourLocation">
          <option value="">Choose location</option>
          <option value="India">India</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
        </select>
        <br />
        <lable>No of travellers</lable>
        <br />
        <input
          type="number"
          onChange={handleChange}
          value={form.noOfTraveller || ""}
          name="noOfTraveller"
          placeholder="Enter No of travellers"
          id="noOfTraveller"
        />
        <br />
        <lable>budget per head</lable>
        <br />
        <input
          type="number"
          onChange={handleChange}
          value={form.budgetPerHead || ""}
          name="budgetPerHead"
          placeholder="Enter budget per head"
          id="budgetPerHead"
        />
        <br />
        {/* 
        <lable >Currency in dollars</lable>
        <br/>
        <input type="number"/> */}
        <input id="submit" text="submit" type="submit" />
      </form>
      <div id="success">{successMsg && <div id={style.successMsg}>{successMsg} </div>}</div>
    </div></>
  );
};

export default Form;
