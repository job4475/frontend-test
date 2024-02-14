import { StateContext } from '@/context/Context';
import { useContext, useEffect } from 'react';

function DepartmentJobTitle() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    if (state.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/getDepartmentList`)
        .then(response => response.json())
        .then(result => {
          setState(prevState => ({ ...prevState, department: result }));
        })
        .catch(error => console.error('Error fetching department list:', error));
    }
  }, [state.email]);

  useEffect(() => {
    if (state.departmentid) {
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/getJobtitleList/${state.departmentid}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(result => {
          setState(prevState => ({ ...prevState, jobtitle: result }));
        })
        .catch(error => console.error('Error fetching job title list:', error));
    }
  }, [state.departmentid]);

  return null;
}

export default DepartmentJobTitle;
