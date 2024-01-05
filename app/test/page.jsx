import { Button, Typography } from '@mui/material';
import styles from './test.module.css'
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
 return (
   <div className={styles.container}>
     <div>
       <Button sx={{color:"white.main"}}>With default Theme:</Button>
     </div>
     <Switch color='secondary' {...label} defaultChecked />
     <Switch {...label} />
     <Switch {...label} disabled defaultChecked />
   </div>
 );
}
