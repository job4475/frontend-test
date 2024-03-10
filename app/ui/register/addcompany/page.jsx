'use client'
import { Box, Button, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import Subtract from '@/assets/assets/images/Subtract.png'
import Arrow from '@mui/icons-material/NorthRounded';
import { StateContext } from '@/context/Context';
import handlecompany from "@/handle/addcompany"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useRouter, useSearchParams } from 'next/navigation'

function Page() {
  const { state, setState } = useContext(StateContext);
  const Handlecompany = handlecompany();
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if(emailParam){
      setState({ ...state, email: emailParam });
    }
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setState({ ...state, selectedImage: e.target.result, selectedFile: file });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', p: 1, }}>
      <Box >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={Subtract} alt="logo" style={{ width: "80px" }} />
          <Box sx={{ pl: 3 }}>
            <Box sx={{ fontSize: '15px' }}>Hello good morning <b>{state.emailconfirm?state.emailconfirm: state.email}</b> <br></br>Welcome to ChicCRM registration process now you are in</Box>
            <Box sx={{ fontSize: '10px' }}>After complete all infomation you will received email your password</Box>
          </Box>
        </Box>
      </Box>
      <Box >
        <Box sx={{ mt: 5}}>
          <Typography variant="h7">Create Company</Typography>
        </Box>
        <Box sx={{ display: 'flex', ml: 5 }}>
          <Box sx={{ mt: '2%', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ mt: '2%', width: '100px', height: '100px', background: '#D9D9D9', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
              <input accept='image/*' style={{ display: 'none' }} id='raised-button-file' type='file' onChange={handleFileChange} />
              <label htmlFor='raised-button-file'>
                {state.logoImage ? (
                  <img src={state.logoImage} alt='Selected' style={{ width: '100px', height: '100px', borderRadius: '100%' }} />
                ) : (<IconButton sx={{ color: '#1F2939' }} component='span'>
                    <AddAPhotoIcon />
                  </IconButton>
                )}
              </label>
            </Box>
          </Box>
          <Box sx={{ ml: 5, display: 'flex' }}>
            <Grid container rowGap={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mr: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center'  }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Alias</Box>
                  <TextField id="standard-basic" variant="standard"  value={state.alias} onChange={Handlecompany.Alias} sx={{ width: "200px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Company name</Box>
                  <TextField id="standard-basic" variant="standard" value={state.companyname} onChange={Handlecompany.Companyname} sx={{ width: "200px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>No</Box>
                  <TextField id="standard-basic" variant="standard" value={state.no} onChange={Handlecompany.No} sx={{ width: "200px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Street</Box>
                  <TextField id="standard-basic" variant="standard" value={state.street} onChange={Handlecompany.Street} sx={{ width: "200px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Country</Box>
                  <Select id="standard-basic" variant="standard" value={state.country} onChange={Handlecompany.Country} sx={{ width: "200px" }}>
                    {state.countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Province</Box>
                  <Select labelId="province-select" variant="standard" id="province-select" value={state.selectedProvince} label="Province" onChange={Handlecompany.handleProvinceChange}
                    sx={{ width: "200px" }} size='small'>
                    {state.provinces?.map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>District</Box>
                  <Select labelId="amphoe-select-label" variant="standard" id="amphoe-select" value={state.selectedAmphoe} label="Amphoe" onChange={Handlecompany.handleAmphoeChange}
                    sx={{ width: "250px" }} size='small'>
                    {state.selectedProvince && state.amphures?.map((amphoe) => (
                      <MenuItem key={amphoe} value={amphoe}>
                        {amphoe}
                      </MenuItem>
                    ))}
                  </Select></Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Sub-Distric</Box>
                  <Select labelId="tambon-select-label" variant="standard" id="tambon-select" value={state.selectedTambon} label="Tambon"
                    onChange={Handlecompany.handleTambonChange} sx={{ width: "250px" }} size='small'>
                    {state.selectedAmphoe && state.tambons?.map((tambon) => (
                      <MenuItem key={tambon} value={tambon}>
                        {tambon}
                      </MenuItem>
                    ))}
                  </Select></Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>ZIP Code</Box>
                  <TextField variant="standard" size='small' value={state.zipcode} InputProps={{ readOnly: true, }} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Phone Number</Box>
                  <TextField id="standard-basic" variant="standard" inputProps={{ maxLength: 10, inputMode: 'numeric' }} value={state.phoneNumber} onChange={Handlecompany.phoneNumber} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Google Maps</Box>
                  <TextField id="standard-basic" variant="standard" value={state.googlemaps} onChange={Handlecompany.GoogleMaps} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500',fontSize:"13px"  }}>Website</Box>
                  <TextField id="standard-basic" variant="standard" value={state.webSite} onChange={Handlecompany.webSite} sx={{ width: "250px" }} />
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box sx={{ ml: '45px', mt: '40px', display:'flex',gap:'12px' }}>
      {!emailParam && (<Button variant="outlined"color="success"onClick={Handlecompany.Selectcompany}sx={{transition: 'transform 0.3s ease','&:hover': { transform: 'scale(1.03)'},}}style={{
      textTransform: 'capitalize',width: '100px',height: '50px',color: '#84BAA1',borderRadius: '8px',}}>Back</Button>)}
        <Button variant='contained' onClick={Handlecompany.Register} disabled={!state.alias || !state.googlemaps || !state.webSite || !state.phoneNumber || !state.companyname || !state.street || !state.no || !state.country || !state.selectedProvince || !state.selectedAmphoe || !state.selectedTambon || !state.logoImage} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', background: '#84BAA1', boxShadow: '0px 0px 0px' }, gap: '8px', background: '#84BAA1', color: 'white', width: '150px', height: '48px', textTransform: 'capitalize', boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }}>Next
          <Arrow style={{ transform: 'rotate(90deg)' }} />
        </Button>
      </Box>
    </Box>
  )
}

export default Page