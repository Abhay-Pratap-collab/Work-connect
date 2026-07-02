"use client"
import Paper from '@mui/material/Paper';
import styles from "./check.module.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';
export default function Check() {
  return (

    <div>


      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "10px",}}>


        <div style={{ width: '50%', height: '500px', background: '#fff', border: '1px solid black', borderRadius: '10px', padding: '10px', gap: '20px',flexDirection:'column' ,display:'flex' }}>
          <div>
            <img src="phone.png" width={50} height={50} ></img>

          </div>
          <div>
            <h3 className={styles.title}>Enter your phone number</h3>
          </div>
          <div>
            <p className={styles.description}>
              We’ll send you a text with a verification code. Standard tariff may apply.
            </p>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '10%', height: '50px', border: '1px solid #e8e8e8', background: '#D3D3D3', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <p className={styles.subText} aria-label='+91'>+91<KeyboardArrowDownIcon style={{ paddingTop: '10px' }} /></p>

            </div>
            <div className={styles.container}>
              <input placeholder=' Enter your mobile number' className={styles.input} maxLength={10} autoCapitalize='sentences' autoComplete='on' autoCorrect='on' spellCheck="true" type='tel' ></input>

            </div>
            

          </div>
          <div>
            <Button style={{width:'100%'}} variant='contained' disabled>continue

            </Button>
          </div>
            <p className={styles.smallText}>By continuing, you agree to our T&C and Privacy policy.</p>
        </div>


      </div>

    </div>
  )
}