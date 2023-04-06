import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./Signup.css";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

// const Signup = () => {
// const [values, setValues] = useState({
//   name: "",
//   email: "",
//   pass: "",
// });
// const [errorMsg, setErrorMsg] = useState("");
// const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
// const navigate = useNavigate();
// const handleSubmit = () => {
//   if (!values.name || !values.email || !values.pass) {
//     setErrorMsg("All fields are required");
//     return;
//   }
//   setErrorMsg("");
//   setSubmitButtonDisabled(true);
//   createUserWithEmailAndPassword(auth, values.email, values.pass)
//     .then(async(res) => {
//       toast("Signup Successfull")
//       setSubmitButtonDisabled(false);
//       const user = res.user
//       console.log(user)
//       await updateProfile(user,{
//         displayName:values.name
//       })
//       navigate('/login')
//     })
//     .catch((err) => {
//       setSubmitButtonDisabled(false)
//       setErrorMsg(err.message)
//     })
// };
//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <div className="cover">
//           <h1 className="log">Signup</h1>
//           <div className="ui divider"></div>
//           <div className="ui form">
//             <div className="field">
//               <label>Email<span className="required"> *</span></label>
//               <input
//               className="form-control"
//                 type="text"
//                 name="email"
//                 placeholder="Email"
//                 onChange={(event) =>
//                   setValues((prev) => ({ ...prev, email: event.target.value }))
//                 }
//               />
//             </div>
//             <div className="field">
//               <label>Username<span className="required"> *</span></label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 onChange={(event) =>
//                   setValues((prev) => ({ ...prev, name: event.target.value }))
//                 }
//               />
//             </div>
//             <div className="field">
//               <label>Password<span className="required"> *</span></label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={(event) =>
//                   setValues((prev) => ({ ...prev, pass: event.target.value }))
//                 }
//               />
//             </div>
//             <div className="err">
//               <b>{errorMsg}</b>
//             </div>
//             <button style={{backgroundColor:'#00ced1'}}
//               onClick={handleSubmit}
//               disabled={submitButtonDisabled}
//               className="fluid ui button blue"
//             >
//               Submit
//             </button>
//             <div className="forget">
//               <p>
//                 Already have an account?{" "}
//                 <span>
//                   <Link to="/login">Login</Link>
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Signup;

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("All fields are required");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        toast("Signup Successfull");
        setSubmitButtonDisabled(false);
        const user = res.user;
        console.log(user);
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/login");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <CssVarsProvider>
      <main>
        <ModeToggle />
        <Sheet
          sx={{
            width: 300,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign up to continue.</Typography>
          </div>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, pass: event.target.value }))
              }
            />
          </FormControl>
          <div className="err">
            <b>{errorMsg}</b>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={submitButtonDisabled}
            sx={{ mt: 1 /* margin top */ }}
          >
            Log in
          </Button>
          <Typography
            endDecorator={<Link href="/login">Login</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
