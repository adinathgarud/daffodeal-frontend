import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  //const [avatar, setAvatar] = useState(null);

  // const handleFileInputChange = (e) => {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setAvatar(reader.result);
  //     }
  //   };

  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/user/create-user`, { name, email, password, mobile })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message); // ✅ Show success message
          
          // ✅ Store token in localStorage
          localStorage.setItem("token", res.data.token);

          // ✅ Redirect to dashboard/homepage
          navigate("/");
        } else {
          toast.error("Something went wrong!");
        }

        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="mobile"
                  autoComplete="mobile"
                  required
                  value={email}
                  onChange={(e) => setMobile(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            {/* <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;





// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1); // Track the current step
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Step 1: Send OTP
//   const sendOtp = () => {
//     axios
//       .post(`${server}/user/send-otp`, { mobile })
//       .then((res) => {
//         toast.success(res.data.message);
//         setStep(2); // Move to OTP verification step
//       })
//       .catch((error) => {
//         toast.error(error.response?.data?.message || "Failed to send OTP.");
//       });
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = () => {
//     axios
//       .post(`${server}/user/verify-otp`, { mobile, otp })
//       .then((res) => {
//         toast.success(res.data.message);
//         setStep(3); // Move to registration step
//       })
//       .catch((error) => {
//         toast.error(error.response?.data?.message || "Invalid OTP.");
//       });
//   };

//   // Step 3: Complete Registration
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post(`${server}/user/create-user`, { name, email, password, mobile })
//       .then((res) => {
//         if (res.data.success) {
//           toast.success(res.data.message);
//           localStorage.setItem("token", res.data.token);
//           navigate("/"); // Redirect to dashboard
//         } else {
//           toast.error("Something went wrong!");
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response?.data?.message || "Something went wrong!");
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           {step === 1 ? "Verify Mobile Number" : step === 2 ? "Enter OTP" : "Complete Registration"}
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {step === 1 && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//               <input
//                 type="number"
//                 name="mobile"
//                 autoComplete="mobile"
//                 required
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//               <button
//                 onClick={sendOtp}
//                 className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//               >
//                 Send OTP
//               </button>
//             </div>
//           )}

//           {step === 2 && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
//               <input
//                 type="number"
//                 name="otp"
//                 required
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//               <button
//                 onClick={verifyOtp}
//                 className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
//               >
//                 Verify OTP
//               </button>
//             </div>
//           )}

//           {step === 3 && (
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//               <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
//                 Register
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

