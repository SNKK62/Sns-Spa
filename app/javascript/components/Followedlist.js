import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import axios from 'axios'
import '../../assets/stylesheets/App.css'

import Follow from './Follow'
import { withRouter} from 'react-router-dom'

const Logo = styled.div`
  text-align: center;
  width: 100%;
  
`;

const Row = styled.div`
  dispalay: flex;
  
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom:  5px;
  padding-left: 1em;
  z-index: 2;
  border-top: 1px solid black;
  padding: 5px 5px 5px 10px;
  text-align: left;
  position: relative;
  
  ${({current,id}) => (current.id === id) && `color: red;`}
`;


function Followedlist(props) {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [current, setCurrent] = useState({id: 0})
    const id = props.match.params.id 
    useEffect(() => {
        axios.get(`/api/v1/users/${id}/followers.json`)
            .then(resp => {
                console.log(resp.data)
                setUsers(resp.data);
            })
            .catch(e => {
                console.log(e)
            })
        axios.get(`/api/v1/users/${id}`)
            .then(resp => {
                setUser(resp.data.user)
                setCurrent(resp.data.current_user)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])
    
    history.pushState(null, null, '/users/'+id);
    
    

    return (
        <>
            <div>
                <Logo>{user.name}をフォローしているユーザー</Logo>
                {users.map((val, key) => {
                    return (
                        <Row key={key} current={current} id={val.id} onClick={() => {props.history.push(`/users/${val.id}`)}}>
                            {val.name}
                            { (current && current.id !== Number(val.id)) && (<>
                            <Follow nid={id} id={val.id}/>
                        </>)}
                        </Row>
                    )
                })}
            </div>
        </>
    )

}

export default withRouter(Followedlist)