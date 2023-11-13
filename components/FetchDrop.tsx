'use client';


import {useEffect, useState} from 'react'

const FetchDrop = () => {
  const [temp, setTemp] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null)
  const [region, setRegion] = useState<string | null>(null)
  const [country,setCountry] = useState<string | null>(null)


    useEffect(() => {
            fetch(`https://www.mechanicalturk.one/api/get-coords`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('N/A');
          })
          .then(data => {
            console.log(data)
            setTemp(data.temp);
            setCity(data.city);
            setRegion(data.region);
            setCountry(data.country);
          } )
          .catch(error => console.error('Error:', error));
      }, []);

    return (<>{temp !== null ?   <div className='text-[0.4em] w-full justify-center items-center hidden min-[560px]:flex '>
      <pre>{city}, {region}  {temp}°F</pre>
    </div> : <></>}
  
    </>);
}

export default FetchDrop;