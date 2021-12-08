import React, { useEffect, useState } from 'react';
import './App.css';

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const App = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTime = localStorage.getItem('startTime');
    if (startTime) {
      const nowTime = Date.now(); // 一個代表由經 UNIX 紀元起經過的毫秒數
      setElapsedTime(nowTime - startTime);
      localStorage.removeItem('startTime');
      deleteAllCookies();
    }
  }, []);

  return (
    <div>
      <h1>B 網站</h1>
      <div>{document.URL}</div>
      <div>{`Elapsed Time: ${elapsedTime} ms`}</div>
      <button onClick={() => {
        window.location.reload();
      }}>Refresh</button>
    </div>
  )
}

export default App;
