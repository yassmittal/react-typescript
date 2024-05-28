import { FC, useEffect, useState } from "react";
import axios from "axios";
import User from "./components/User";
import { AppProps, Users } from "./App.types";

const App: FC<AppProps> = ({ title }) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const handleClick = async () => {
    try {
      setisLoading(true);
      const { data } = await axios.get("https://randomuser.me/api/?results=10");
      console.log(data);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="">
      <div></div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Show Users</button>
      {isLoading && <p>Loading...</p>}\
      <ul>
        {users.map(({ login, name, email }) => {
          return <User name={name} email={email} key={login.uuid} />;
        })}
      </ul>
    </div>
  );
};

export default App;
