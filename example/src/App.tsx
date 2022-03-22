import React, { useState } from 'react';
import axios from 'axios';

const FILES_SERVICE_URI = 'http://localhost:3200';

function App() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [avatar, setAvatar] = useState('');

  const fileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        const result = await axios({
          method: "post",
          url: FILES_SERVICE_URI,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (result.data?.uri) {
          setAvatar(result.data.uri);
        }
      } catch {
        //should handle error here
      }
    }
  }

  const sendForm = () => {

  }

  return (
    <div className="App">
      <input type="file" onChange={fileSelected} />
      {avatar && <img src={`${FILES_SERVICE_URI}${avatar}`} />}
      <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="Firstname" />
      <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Lastname" />
      <button onClick={sendForm}>Send!</button>
    </div>
  );
}

export default App;
