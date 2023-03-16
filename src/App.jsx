import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const REACT_APP_API_URL = "https://api.openweathermap.org/data/2.5";
const REACT_APP_API_KEY = "94206a83f36ffc61f8f7380f30c9a8e2";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongtitude] = useState(0);
  const [whetherData, setData] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongtitude(position.coords.longitude);
    });
  }, []);

  // @ts-ignore
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_API_KEY}`
      );
      setData(res.data);
      console.log(res.data);
    };
    if (latitude === 0 && longitude === 0) return () => {};
    fetchData();
  }, [latitude, longitude]);

  return (
    <div className="grid-container">
      <div className="grid-item">
        {whetherData && (
          <>
            <span>{whetherData.name}</span>
            <h2>{whetherData.main.temp} &#xb0;F</h2>
            <h2>
              {whetherData.main.humidity}
              <span>% humid</span>
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
