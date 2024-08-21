import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();
    const api = "https://66c5af77134eb8f434952e40.mockapi.io/api/v1/users";

    function addUser() {
        axios.post(api, {
            name: name,
            email: email
        })
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.error("There was an error adding the user:", error.response.data);
                alert(`ERROR: ${error.response.data}`);
            });
    }


    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div id="card" className="w-96 mx-auto rounded-md shadow-xl drop-shadow-2xl p-2">
                    <h1 className="text-2xl underline underline-offset-2 text-center font-bold">
                        Add user
                    </h1>
                    <div className="mx-auto p-5">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-2 border-2 border-slate-400 rounded-md p-2" placeholder="Name" />
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-slate-400 rounded-md p-2" placeholder="Email" />
                        <button className="w-full mt-5 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700" onClick={addUser}>Add user</button>
                    </div>
                </div>
            </div>
        </div>
    )
}