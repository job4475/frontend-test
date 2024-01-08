'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function otpvelify() {
    
    const VerificationCodeInput = ({ length = 6, onChange }) => {
        const [codes, setCodes] = useState([]);
        useEffect(() => {
          setCodes(Array(length).fill(''));
        }, [length]);
      
        const handleChange = (index, value) => {
          const newCodes = [...codes];
          newCodes[index] = value;
          setCodes(newCodes);
          onChange(newCodes.join(''));
        };
      
        const handleKeyDown = (e, index) => {
          if (e.key === 'Backspace' && index === codes.length - 1) {
            codes[index] = '';
            document.getElementById(`code-input-${index - 1}`).focus(); 
          } else if (e.key === 'Backspace' && index > 0) {
            codes[index] = '';
            document.getElementById(`code-input-${index - 1}`).focus();
          } else if (e.key !== 'Backspace' && e.key !== 'Delete' && codes[index].length === 1) {
            const nextIndex = index + 1;
            const nextElement = document.getElementById(`code-input-${nextIndex}`);
            if (nextElement) {
              nextElement.focus();
            }
          }
        };
   

  return {VerificationCodeInput,handleChange,handleKeyDown,}
    }
}

export default otpvelify

