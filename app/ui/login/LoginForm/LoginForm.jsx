// "use client"
// import { Box, Button, Skeleton, TextField } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { StateContext } from '@/context/Context';
// import handlelogin from '@/handle/login'
// import Loading from '@/components/loading'
// import Backdrop from '@/components/backdrop/backdrop'
// import Dialog from '@/components/dialog/dialog'
// import React, { useContext, useEffect, useState } from 'react';
// import CustomBackground from '@/components/Background/page'


// function Index() {
//     const { state, setState } = useContext(StateContext);
//     const [showContent, setShowContent] = useState(false);
//     const HandleLogin = handlelogin();
//     const handleEnterKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             state.info === 0 ? HandleLogin.handleSignInClick() : HandleLogin.handleSignUpClick();
//         }
//     };
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setShowContent(true);
//         }, 1000);
//         return () => clearTimeout(timer);
//     }, []);

//     const onClickHandler = state.info === 0 ? HandleLogin.handleSignInClick : HandleLogin.handleSignUpClick;
//     const buttonText = state.loading ? <Loading /> : state.info === 0 ? 'Sign In' : 'Next';

//     return (
//         <CustomBackground>
//             {showContent ? (
//                 <Box ml={2} sx={{
//                     display: 'flex', flexDirection: 'row', width: '190px', height: '43px', borderRadius: '50px',
//                     background: '#DAEBE3', alignItems: 'center', justifyContent: 'space-between', py: '3px', px: '4px'
//                 }}>

//                     <Box onClick={() => { setState({ ...state, info: 0 }) }} sx={{
//                         cursor: "pointer", width: "90px", height: "100%", flexShrink: 0,
//                         background: state.info === 0 ? "#84BAA1" : "", color: state.info === 0 ? "#fff" : "#3d4d69", borderRadius: "40px", display: "flex",
//                         justifyContent: "center", alignItems: "center", fontSize: '15px', fontWeight: '500'
//                     }}>
//                         <Box>Sign In</Box>
//                     </Box>
//                     <Box onClick={() => { setState({ ...state, info: 1 }) }} sx={{
//                         cursor: "pointer", ml: -2, width: "90px", height: "100%", flexShrink: 0,
//                         background: state.info === 1 ? "#84BAA1" : "", color: state.info === 1 ? "#fff" : "#3d4d69", borderRadius: "40px", display: "flex",
//                         justifyContent: "center", alignItems: "center", fontSize: '15px', fontWeight: '500'
//                     }}>
//                         <Box>Sign Up</Box>
//                     </Box>
//                 </Box>
//             ) : (
//                 <Skeleton variant="rectangular" width={210} height={45} style={{ borderRadius: '50px' }} />
//             )}
//             {showContent ? (<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                 <TextField id="standard-basic" label="Email" variant="standard" value={state.email} onChange={HandleLogin.Email} onKeyDown={handleEnterKeyPress} sx={{ width: '90%', '& label': { color: '#828895', fontWeight: '500' } }} />
//                 {state.info === 0 && (
//                     <TextField label="Password" variant="standard" value={state.password} onChange={HandleLogin.Password} onKeyDown={handleEnterKeyPress} type={state.showPassword ? 'text' : 'password'} sx={{ width: '90%', mt: '15px', '& label': { color: '#828895', fontWeight: '500' } }}
//                         InputProps={{
//                             endAdornment: (
//                                 <IconButton onClick={HandleLogin.handleTogglePassword} edge="end">
//                                     {state.showPassword ? <VisibilityIcon sx={{ color: '#c1c7cd', mr: '5px' }} /> : <VisibilityOffIcon sx={{ color: '#c1c7cd', mr: '5px' }} />}
//                                 </IconButton>
//                             ),
//                         }}
//                     />
//                 )}
//                 {state.info === 0 && (
//                     <Box sx={{ background: '', width: '95%', display: 'flex', justifyContent: 'end', mt: '5px' }}>
//                         <Button variant="text" onClick={HandleLogin.ForgotPassword} sx={{ color: '#828895', textTransform: 'capitalize', '&:hover': { background: 'none', color: '#1F2939' }, '&:active': { background: 'none' } }}>Forgot Password?</Button>
//                         {state.backdrop ? <Backdrop /> : ""}
//                     </Box>
//                 )}
//             </Box>) :
//                 (<Box sx={{ width: 350 }}>
//                     <Skeleton variant="rectangular" width={350} height={45} style={{ borderRadius: '10px', marginBottom: '10px' }} />
//                     <Skeleton variant="rectangular" width={350} height={45} style={{ borderRadius: '10px', marginBottom: '10px' }} />
//                     <Box sx={{}}>
//                         <Skeleton variant="rectangular" width={150} height={25} style={{ borderRadius: '5px', marginLeft: 'auto' }} />
//                     </Box>
//                 </Box>
//                 )
//             }
//             {showContent ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button variant="contained" onClick={onClickHandler} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', }, }} style={{ background: state.loading ? '#e5e5e5' : '#84BAA1', width: '90%', height: '44px', textTransform: 'capitalize', marginTop: 10, boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600', cursor: state.loading ? 'not-allowed' : 'pointer', }} disabled={state.loading}>
//                         {buttonText}
//                     </Button>
//                     {state.open ? <Dialog /> : ""}
//                 </Box>
//             ) : (
//                 <Skeleton variant="rectangular" width={350} height={45} style={{ borderRadius: '10px' }} />
//             )}
//         </CustomBackground>
//     );
// }

// export default Index;