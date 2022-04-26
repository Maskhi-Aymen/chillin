import { useState } from "react";
import React from "react";
import "../assets/styles/formInput.css";
import FormInput from "../components/registration/FormInput";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import Slide from '@mui/material/Slide';
import SelectAvatar from "../components/registration/SelectAvatar";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import dayjs from "dayjs";

export default function Registration() {
  const [values, setValues] = useState({
    name: "",
    last_name: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const [photo, setphoto] = useState()
  const [obj, setobj] = useState("")
  const History = useHistory();
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character!",
      label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last_Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

  };
  const PostData = () => {
    fetch(`http://127.0.0.1:8000/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_mail": values["email"],
        "user_password": values["password"],
        "user_name": values["name"],
        "user_Lastname": values["last_name"],
        "user_date_birth": dayjs(values["birthday"]).format('YYYY-MM-DD'),
        "user_objectifs":document.getElementById("objectif").value,
        "user_avatar":photo,
        'user_dateOfJoin':dayjs().format('YYYY-MM-DD')
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "added succefully") {
          alert("Your account has been successfully created")
          History.push('/')
        }
        else {
          alert('operation failed ! check your email or password !')
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const info = (
    <div className="registration">
      <form onSubmit={handleSubmit}>
        <LooksOneIcon sx={{ color: '#9D8189' }} />
        <h1>Get Started</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button onClick={() => handleChange()}>Next Step </button>
      </form>
    </div> 
  )
  const objectif = (
    <div className="registration2">
      <form className="formInput">
        <KeyboardReturnIcon sx={{ color: '#9D8189' }} onClick={() => handleChange()} />
        <LooksTwoIcon sx={{ color: '#9D8189', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }} />
        <SelectAvatar setavatar={e=>setphoto(e)}/>
        <Typography variant="subtitle1" component="div">objectif </Typography>
        <textarea id="objectif" name="objectif" rows="10" cols="55"></textarea>
        <button onClick={() => PostData()}>Submit</button></form>
    </div>
  )
  return (
    <div className="registration-fond" >
      <Slide direction="right" in={!checked} unmountOnExit >
        {info}
      </Slide>
      <Slide direction="left" in={checked} unmountOnExit >
        {objectif}</Slide>
    </div>
  );
}

//