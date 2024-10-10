
// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { LoginUser, LoginStudent, reset, getMe } from "../features/authSlice"; 

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const apiUrl = process.env.REACT_APP_API_BASE_URL

// //   const { user, isError, isSuccess, isLoading, message } = useSelector(
// //     (state) => state.auth
// //   );
  
// //   useEffect(() => {
// //     // console.log("useEffect triggered");
// //     // console.log("user:", user);
// //     // console.log("isSuccess:", isSuccess);
  
// //     if (user && isSuccess) {
// //       if (user.role === "student") {
// //         navigate("/studentdashboard");
// //       } else {
// //         navigate("/dashboard");
// //       }
// //       dispatch(reset());
// //     }
// //   }, [user, isSuccess, dispatch, navigate]);

// //   useEffect(() => {
// //     dispatch(getMe());
// //   }, [dispatch]);
  

// //   const Auth = (e) => {
// //     e.preventDefault();
// //     // console.log("user is "+ user);
// //         dispatch(LoginUser({ email, password }));
// //       // console.log("Calling LoginUser");

// //     // }
// //   };
  
 
// //   return (
// //     <section className="hero is-fullheight">
// //       <div className="hero-body">
// //         <div className="container" style={{ backgroundColor: "transparent" }}>
// //           <div className="columns is-centered">
// //             <div className="column is-half">
// //               <form
// //                 onSubmit={Auth}
// //                 className="box has-shadow"
// //                 style={{
// //                   boxShadow:
// //                     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
// //                 }}
// //               >
// //                 {isError && <p className="has-text-centered">{message}</p>}
// //                 <h1 className="title is-2 has-text-centered">Sign In</h1>
// //                 <div className="field">
// //                   <label className="label">Email</label>
// //                   <div className="control">
// //                     <input
// //                       type="text"
// //                       className="input"
// //                       value={email}
// //                       onChange={(e) => setEmail(e.target.value)}
// //                       placeholder="Email"
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="field">
// //                   <label className="label">Password</label>
// //                   <div className="control">
// //                     <input
// //                       type="password"
// //                       className="input"
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       placeholder="******"
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="field mt-5">
// //                   <button
// //                     type="submit"
// //                     className={`button is-success is-fullwidth ${isLoading ? "is-loading" : ""}`}
// //                     style={{ backgroundColor: "#0066b2" }}
// //                   >
// //                     {isLoading ? "Loading..." : "Login"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
  
  
// // };  

// // export default Login;

// // // import React, { useState, useEffect } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { useNavigate } from "react-router-dom";
// // // import { LoginUser, reset, getMe } from "../features/authSlice";

// // // import styles from "./Login.module.css"; // Import your CSS module

// // // const Login = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const { user, isError, isSuccess, isLoading, message } = useSelector(
// // //     (state) => state.auth
// // //   );

// // //   useEffect(() => {
// // //     if (user && isSuccess) {
// // //       navigate(user.role === "student" ? "/studentdashboard" : "/dashboard");
// // //       dispatch(reset());
// // //     }
// // //   }, [user, isSuccess, dispatch, navigate]);

// // //   useEffect(() => {
// // //     dispatch(getMe());
// // //   }, [dispatch]);

// // //   const Auth = (e) => {
// // //     e.preventDefault();
// // //     dispatch(LoginUser({ email, password }));
// // //   };

// // //   return (
// // //     <section className={`hero ${styles.hero}`}>
// // //         <div className="container">
// // //           <div className={`columns is-centered ${styles.centered}`}>
// // //             <div className={`column is-half ${styles.formContainer}`}>
// // //               <form onSubmit={Auth} className={`box ${styles.box}`}>
// // //                 {isError && <p className="has-text-centered">{message}</p>}
// // //                 <h1 className={`title is-2 has-text-centered ${styles.title}`}>
// // //                   Sign In
// // //                 </h1>
// // //                 <div className="field">
// // //                   <label className="label">Email</label>
// // //                   <div className="control">
// // //                     <input
// // //                       type="text"
// // //                       className="input"
// // //                       value={email}
// // //                       onChange={(e) => setEmail(e.target.value)}
// // //                       placeholder="Email"
// // //                     />
// // //                   </div>
// // //                 </div>
// // //                 <div className="field">
// // //                   <label className="label">Password</label>
// // //                   <div className="control">
// // //                     <input
// // //                       type="password"
// // //                       className="input"
// // //                       value={password}
// // //                       onChange={(e) => setPassword(e.target.value)}
// // //                       placeholder="******"
// // //                     />
// // //                   </div>
// // //                 </div>
// // //                 <div className="field mt-5">
// // //                   <button
// // //                     type="submit"
// // //                     className={`button is-success is-fullwidth ${
// // //                       isLoading ? "is-loading" : ""
// // //                     }`}
// // //                   >
// // //                     {isLoading ? "Loading..." : "Login"}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             </div>
// // //           </div>
// // //         </div>
// // //     </section>
// // //   );
// // // };

// // // export default Login;
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { LoginUser, reset } from "../features/authSlice"; // Update with correct path

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isError, isSuccess, isLoading, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/dashboard");
//       dispatch(reset());
//     }
//   }, [isSuccess, dispatch, navigate]);

//   const Auth = (e) => {
//     e.preventDefault();
//     dispatch(LoginUser({ email, password }));
//   };

//   return (
//     <div className="login-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <form onSubmit={Auth} className="box" style={{ width: '100%', padding: '2rem', background: '#FFFFFF', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', height: '100%' }}>
//         {isError && <p style={{ color: '#FF0000', textAlign: 'center' }}>{message}</p>}
//         <h1 className="title is-2 has-text-centered" style={{ fontFamily: 'Segoe UI', fontSize: '35px', marginBottom: '2rem' }}>Sign In</h1>
//         <div className="field">
//           <label className="label" style={{ textAlign: 'center' }}>Email</label>
//           <div className="control">
//             <input
//               type="text"
//               className="input"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               style={{ width: '100%' }}
//             />
//           </div>
//         </div>
//         <div className="field">
//           <label className="label" style={{ textAlign: 'center' }}>Password</label>
//           <div className="control">
//             <input
//               type="password"
//               className="input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="******"
//               style={{ width: '100%' }}
//             />
//           </div>
//         </div>
//         <div className="field mt-5">
//           <button
//             type="submit"
//             className={`button is-success is-fullwidth ${isLoading ? "is-loading" : ""}`}
//             style={{ height: '60px', fontFamily: 'Montserrat', fontSize: '20px', boxShadow: '0 4px 8px 0 rgba(181, 141, 237, 0.7), 0 6px 20px 0 rgba(181, 141, 237, 0.9)', cursor: 'pointer', background: '#B58DED', color: '#FFFFFF', border: 'none' }}
//             disabled={isLoading}
//           >
//             {isLoading ? "Loading..." : "Login"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice"; // Update with correct path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user,isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && isSuccess) {
      if (user.role === "student") {
        navigate("/studentdashboard");
      } else {
        navigate("/dashboard");
      }
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="login-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #1B8AF1, #B58DED)' }}>
      <form onSubmit={Auth} className="box" style={{ width: '100%', padding: '2rem', background: '#FFFFFF', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isError && <p style={{ color: '#FF0000', textAlign: 'center', marginBottom: '1rem' }}>{message}</p>}
        <h1 className="title is-2" style={{ fontFamily: 'Segoe UI', fontSize: '35px', marginBottom: '2rem', textAlign: 'center' }}>Sign In</h1>
        <div className="field" style={{ width: '100%', marginBottom: '1rem' }}>
          <label className="label" style={{ textAlign: 'left', width: '100%', maxWidth: '300px' }}>Email</label>
          <div className="control" style={{ width: '100%', maxWidth: '300px' }}>
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="field" style={{ width: '100%', marginBottom: '1rem' }}>
          <label className="label" style={{ textAlign: 'left', width: '100%', maxWidth: '300px' }}>Password</label>
          <div className="control" style={{ width: '100%', maxWidth: '300px' }}>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>
        </div>
        <div className="field" style={{ width: '100%', marginBottom: '1rem' }}>
          <button
            type="submit"
            className={`button is-success ${isLoading ? "is-loading" : ""}`}
            style={{ height: '60px', fontFamily: 'Montserrat', fontSize: '20px', boxShadow: '0 4px 8px 0 rgba(181, 141, 237, 0.7), 0 6px 20px 0 rgba(181, 141, 237, 0.9)', cursor: 'pointer', background: '#B58DED', color: '#FFFFFF', border: 'none', width: '100%', maxWidth: '300px' }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
