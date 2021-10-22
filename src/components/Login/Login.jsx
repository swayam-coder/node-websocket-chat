import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { User } from '../../contexts/UserContext';
import "./Login.css"

export default function Login() {
    const [name, setname] = useState();
    const [room, setroom] = useState();
    const [id, setid] = useState();
    const history = useHistory();
    const { setUserCurrent } = User();

    const handleSubmit = () => {
        if(!name || !room || !id) {
            return
        } 
        setUserCurrent(name);
        history.push(`/chat?name=${name}&room=${room}&roomid=${id}`)
    }

    return (
        <>
            <div className="formDiv">
        <div>
        <h3 style={{textAlign: "center", padding: 10, color: "white"}}>Join</h3>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter Name</label>
                    <input value={name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setname(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Enter Room Name</label>
                    <input value={room} type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setroom(e.target.value)}/>
                </div>
                <div>
                    <label for="exampleInputPassword1" class="form-label">Enter Room Id</label>
                    <input value={id} type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setid(e.target.value)}/>
                </div>
                <div className="btn-container">
                    <button type="submit" className="btn btn-outline-primary button">Enter Room</button> {/* in a form if you dont specify type="" of the button then it by default take its type as submit */}
                </div>
            </form>
        </div>
        </div>
        </>
    )
}
