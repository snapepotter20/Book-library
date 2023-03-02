import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const Searchbar = (props) => {
    const [user, setUser] = useState([]);

    const fetchData = () => {
        return fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUser(data));
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (

        <>

            <form>
                <TextField
                    id="search-bar"
                    className="text"

                    variant="outlined"
                    placeholder="Search fav subjects"
                    size="small"
                    value={props.term}
                    onChange={(e) => props.onChange(e.target.value)}
                />


                <IconButton type="submit" aria-label="search">
                    <SearchIcon style={{ fill: 'black' }}/>
                </IconButton>
            </form>

            <div className="para">
                <p>
                    ReactJS
                </p>

                <p>
                    C++
                </p>

                <p>
                    Human Anatomy
                </p>
                <p>
                    Current Affairs
                </p>
                <p>
                    Economics
                </p>
                <p>
                    Sports
                </p>
            </div>

            <main>
                <h2>Subjects Authors</h2>
                <ul>
                    {user && user.length > 0 && user.map((userObj, index) => (
                        <li key={userObj.id}>{userObj.name}</li>
                    ))}
                </ul>
            </main>
        </>

    )
}

export default Searchbar;