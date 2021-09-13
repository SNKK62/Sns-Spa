import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import './App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Row = styled.div`
  dispalay: flex;
  text-align: center;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom:  5px;
  padding: 50px 0 20px 20px;
  z-index: 2;
  border-radius: 5px;
  position: relative;
  box-shadow: 5px 5px 10px rgb(0,0,0,0.3)
`;

const Username = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 70vw;
  border-bottom: 1px solid black;
`;

function Postlist() {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [length, setLength] = useState(0)
    var names = []
    useEffect(() => {
        axios.get('/api/v1/posts.json')
            .then(resp => {
                console.log(resp.data)
                setPosts(resp.data);
            })
            .catch(e => {
            console.log(e)
        })
        axios.get(`/api/v1/usernames`)
                        .then(resp => {
                            setUsers(resp.data)
                            setLength(resp.data.length)
                            
                        })
                        .catch(e => {
                        console.log(e)
                        })
        users.forEach(val => {
            names.push(val.name)
        })
    }, [])

    return (
        <>
            <div>
                {posts.map((val, key) => {
                    var id = length - val.user_id
                    var curuser = users[id]
                    
                    return (
                        <Row key={key}>
                            <Link to={'/users/' + val.user_id}>
                            <Username >
                                {curuser}
                            </Username>
                            </Link>
                            {val.content}
                        </Row>
                    )
                })}
            </div>
        </>
    )

}

export default Postlist