import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import './App.css'
import axios from 'axios'


const Row = styled.div`
  dispalay: flex;
  
  width: 70%;
  
  margin-top: 15px;
  margin-bottom:  5px;
  padding-left: 1em;
  z-index: 2;
  padding: 5px 5px 5px 5px;
  border-top: 1px solid black;
`;

function Userlist() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('/api/v1/users.json')
            .then(resp => {
                console.log(resp.data)
                setUsers(resp.data);
            })
            .catch(e => {
            console.log(e)
        })
        
    }, [])

    return (
        <>
            <div>
                {users.map((val, key) => {
                    return (
                        <Row key={key}>
                            {val.name}
                        </Row>
                    )
                })}
            </div>
        </>
    )

}

export default Userlist