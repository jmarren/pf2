'use client';


import {useEffect} from 'react'

const FetchDrop = () => {
    useEffect(() => {
        const dropletIP = '146.190.170.211';
        const dropletPort = '3001';
    
        // Use the `fetch` API with template literals
        fetch(`http://${dropletIP}:${dropletPort}/`)
          .then(response => {
            if (response.ok) {
              return response.text();
            }
            throw new Error('N/A');
          })
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
      }, []);

    return (<></>);
}

export default FetchDrop;