import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateUser() {
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const router = useRouter();
    const { id } = router.query;
    const api = "https://66c5af77134eb8f434952e40.mockapi.io/api/v1/users";
    useEffect(() => {
        if (id !== undefined) {
            axios.get(`${api}/${id}`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    useEffect(() => {
        if (user.name) {
            setName(user.name);
        }
    }, [user.name]);

    function handleInputChange(e) {
        setName(e.target.value);
    }


    function handleUserChange() {
        axios.put(`${api}/${id}`, { name })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        router.push("/");
    }

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div id="card" className="w-96 mx-auto rounded-md shadow-xl drop-shadow-2xl p-2">
                    <h1 className="text-2xl underline underline-offset-2 text-center font-bold">
                        User: {user.name}
                    </h1>
                    <div className="mx-auto p-5">
                        <input value={name} onChange={handleInputChange} type="text" className="w-full mb-2 border-2 border-slate-400 rounded-md p-2" placeholder={user.name} />
                        <button className="w-full mt-5 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700" onClick={handleUserChange}>Update User</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
