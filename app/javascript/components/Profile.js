import React , {useState, useEffect} from 'react'
import { Link ,withRouter} from 'react-router-dom'
import styled from 'styled-components'
import './App.css'
import axios from 'axios'


const Userimage = styled.img`
border-radius: 50%;
width: 50px;
height: 50px;
margin: 20px 10px 10px 20px;
cursor: pointer;
grid-row: 1/2;
grid-column: 1/2;
`;

function Profile(props) {
    return (<>
        { props.url ? (
            <Userimage id="img" src={props.url} onClick={() => { if (props.current.id === Number(props.id)) { props.setModalshow(true); props.setModaltype("image") }}} />
        ) : (
                <Userimage src='/user_icon_sample.png' onClick={() => { if(props.current.id === Number(props.id)){props.setModalshow(true); props.setModaltype("image") }}} />
        )}
    </>)
}

export default Profile
