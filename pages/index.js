import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);

  const api = "https://66c5af77134eb8f434952e40.mockapi.io/api/v1/users";
  useEffect(() => {
    axios.get(api)
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
  }, []);

  return (
    <div className="p-10">
      <div className="grid sm:grid-cols-2">
        <h1 className="grid max-sm:text-center col-span-1 text-4xl font-bold underline underline-offset-2 mb-10">
          Business Operations
        </h1>
        <button className="grid col-span-1 sm:max-w-52 sm:justify-self-end bg-blue-600 self-center text-white p-5 rounded-md shadow-md drop-shadow-2xl hover:bg-blue-700 hover:cursor-pointer">
          <Link href="/add-user">
            <p className="text-md font-bold">Add New User</p>
          </Link>
        </button>
      </div>
      {users.map((user) => (
        <div key={user.id}>
          <div className="grid grid-rows-1 my-5">
            <div
              id="card"
              className={` rounded-md shadow-md drop-shadow-2xl p-2 bg-slate-400 text-teal-900 ${toggle === user.id ? "h-20" : "h-10"}`}
              onClick={() => setToggle(toggle === user.id ? null : user.id)}
            >
              <h1 className="text-md font-bold underline underline-offset-2 ml-5">
                {user.name}
              </h1>
              <div className={`${toggle === user.id ? "block" : "hidden"}`}>
                <p className="text-sm text-slate-900 mt-3 ml-5 self-center">
                  Created at: {user.createdAt.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}