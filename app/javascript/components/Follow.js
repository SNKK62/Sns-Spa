import React, { useState, useEffect,useCallback } from "react";
import styled from 'styled-components'
import './App.css'
import axios from 'axios'

    


const Followbutton = styled.button`
  
  color: white;
  text-align: center;
  height: 30px;
  width: 100px;
  position: absolute;
  right: 0px;
  ${({ follow }) => 
    follow ? `background: red; border-color: red;`:
    `background: blue; border-color: blue;`
  }
`;


function Follow(props) {
    const [follow, setFollow] = useState(false)

    useEffect(() => {
        
        axios.get(`/api/v1/users/following/${props.id}`)
            .then(resp => {
            setFollow(resp.data.bool)
            })
            .catch(e => {
            console.log(e)
            })
       
        
    },[])

    function following() {
        axios.post(`/api/v1/relationships/${props.id}`)
            .then(resp => {
                setFollow(true)
              
            })
            .catch(e => {
            console.log(e)
        })
    }

    function unfollow() {
        axios.delete(`/api/v1/relationships/${props.id}`)
            .then(resp => {
                setFollow(false)
          
            })
            .catch(e => {
            console.log(e)
        })
    }



    return (<>
        { follow ? (
            <Followbutton follow={true} onClick={(e) => { e.stopPropagation(); unfollow(); }}>フォロー解除</Followbutton>
    ):(
                <Followbutton follow={false} onClick={(e) => { e.stopPropagation(); following() }}>フォロー</Followbutton>
    )}
    </>)
}

export default Follow
