import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [userNameInfo, setUserNameInfo] = useState(null);
  const [users, setUsers] = useState([]);
  {
    /* Name, Thumbnail and location  */
  }
  const [userLocationInfo, setUserLocationInfo] = useState(null);
  const [userThumbnail, setUserThumbNail] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const userData = await axios.get(`https://randomuser.me/api?page={page}`);
    const result = userData.data.results[0];
    setData(result);

    setUsers((prevUsers) => [...prevUsers, result]);
    setUserNameInfo(result?.name);
    setUserLocationInfo(result.location);
    setUserThumbNail(result.picture.thumbnail);
    // console.log(data, "data");
    // setUserData();
  };

  const handleNextPage = () => {
    // if (page > 0) {
    const nextPage = page + 1;
    setPage(nextPage + 1);
    fetchData();
    // }
  };
  return (
    <div className="App">
      <button onClick={fetchData}>Fetch</button>
      <button onClick={handleNextPage}>Next user</button>
      {/* {data && <pre>{JSON.stringify(data)}</pre>} */}

      {users.map((user, idx) => (
        <div key={idx}>
          {
            <pre>
              {user.name.title} {user.name.first} {user.name.last}
            </pre>
          }
          {<pre>{user.location.street.name}</pre>}
          {/* {userThumbnail && <pre>{userThumbnail}</pre>} */}

          <img src={user.picture.thumbnail} />
        </div>
      ))}
      {/* <div>{JSON.stringify(userNameInfo)}</div> */}
    </div>
  );
}

export default App;
