// "use client"
// import React, { useContext, useEffect, useState } from "react";
// import { Box, Button, Skeleton, TextField } from "@mui/material";
// import handleforget from "@/handle/forgetpassword";
// import Loading from "@/components/loading";
// import { StateContext } from "@/context/Context";

// function Index() {
//   const { state } = useContext(StateContext);
//   const HandleForget = handleforget();
//   const [showContent, setShowContent] = useState(false);
//   const [showButton, setShowButton] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowContent(true);
//       setShowButton(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleBackClick = () => {
//     setShowButton(false);
//     HandleForget.back();
//   };

//   return (
//     <Box>
//       <Box className="forgot" sx={{
//         display: "flex", flexDirection: "column", background: "#fff", width: "440px", height: "430px",
//         borderRadius: "15px", marginLeft: "auto", mr: 7, mt: 1, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", justifyContent: "space-between",
//         py: "35px", px: "25px",
//       }}>
//         <Box sx={{ background: "", width: "90%", mx: "auto" }}>
//           {showContent ? (
//             <Box sx={{ background: '', width: '100%', mx: 'auto' }}>
//               <Box sx={{ textAlign: 'left', color: '#1F2939', fontSize: 20, fontWeight: '700', mt: 1 }}>Forgot your password?</Box>
//               <Box sx={{ textAlign: 'left', color: '#778296', fontSize: 15, mt: '8px' }}>We need your email to reset your password</Box>
//             </Box>
//           ) : (
//             <>
//               <Box sx={{ textAlign: "left", color: "#1F2939", fontSize: 20, fontWeight: "700", mt: 1 }}>
//                 <Skeleton variant="text" width="80%" />
//               </Box>
//               <Box sx={{ textAlign: "left", color: "#778296", fontSize: 15, mt: "8px" }}>
//                 <Skeleton variant="text" width="60%" />
//               </Box>
//             </>
//           )}
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "center", mt: "60px", mb: "60px" }}>
//           {showContent ? (

//             <TextField id="standard-basic" label="Email" variant="standard" value={state.email} onChange={HandleForget.Email} sx={{ width: '90%' }} />
//           ) : (
//             <Skeleton variant="rectangular" width="90%" height={40} animation={false} />
//           )}
//         </Box>
//         <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: 11 }}>
//           {showContent ? (
//             <>
//               <Button variant="text" onClick={HandleForget.back} sx={{ color: '#828895', textTransform: 'capitalize', fontSize: 14, fontWeight: '', '&:hover': { background: 'none', color: '#1F2939' }, '&:active': { background: 'none' } }} >Back to sign in</Button>
//               <Button variant="contained" onClick={HandleForget.workspace} sx={{ mt: '5px', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', }, }} style={{ background: '#84BAA1', width: '90%', height: '44px', textTransform: 'capitalize', boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }}>{state.loading ? <Loading /> : "Get recovery link"}</Button>
//             </>
//           ) : (
//             <>
//               <Skeleton variant="text" width="60%" height={40}>
//                 {showButton && (
//                   <Button variant="text" onClick={handleBackClick} sx={{
//                     color: "#828895", textTransform: "capitalize", fontSize: 14,
//                     fontWeight: "", "&:hover": { background: "none", color: "#1F2939" }, "&:active": { background: "none" },
//                   }}>
//                     Back to sign in
//                   </Button>
//                 )}
//               </Skeleton>
//               <Skeleton variant="text" width="80%" height={44}>
//                 {showButton && (
//                   <Button variant="contained" onClick={HandleForget.workspace} sx={{
//                     mt: "5px", transition: "transform 0.3s ease",
//                     "&:hover": { transform: "scale(1.03)" },
//                   }}
//                     style={{
//                       background: "#84BAA1", width: "90%", height: "44px", textTransform: "capitalize", boxShadow: "0px 0px 0px",
//                       borderRadius: "8px", fontWeight: "600",
//                     }}>
//                     {state.loading ? <Loading /> : "Get recovery link"}
//                   </Button>
//                 )}
//               </Skeleton></>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Index;
