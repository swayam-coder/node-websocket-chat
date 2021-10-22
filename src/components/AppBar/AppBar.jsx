import React from 'react'
import "./AppBar.css"

export default function AppBar({ roominfo }) {
    const members = roominfo.users
    console.log(members);
    return (
        <>
            <nav class="navbar navbar-expand-lg" style={{backgroundColor: "#0069D9"}}>
  <div class="container-fluid">
    <a class="navbar-brand brand" href="#">{roominfo.room}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" style={{justifyContent: "flex-end"}}>
      <ul class="navbar-nav">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#" style={{color: "white"}}>Room Id: {roominfo.id}</a>
        </li> */}
        <div class="dropdown">
          <button class="btn btn-outline-primary dropdown-toggle memberbtn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Members
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{height: 50}}>
            {members?.map(m => (
              <li><p class="dropdown-item">{m.name}</p></li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  </div>
</nav>

        </>
    )
}
