import React , {useState, useEffect} from 'react'
import { Link,withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import {AiOutlineMenu} from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {FiDelete} from 'react-icons/fi'

import './App.css'
import axios from 'axios'

const Menues = styled.ul`
  
  right: 5%;
  top: 50px;
  position: absolute;
  width: 200px;
  height: 100px;
  list-style: none;
  z-index: 200;
  background: white;
  padding-left: 0px;
  margin-top: 0;
  float: right;
  box-shadow: 5px 5px 1px rgb(0,0,0,0.5);
`;



const Dmenu = styled.li`
  border-top: 1px solid black;
  height: 33%;
  list-style: none;
`;

const Overlay = styled.div`
  background: rgb(0,0,0,0);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 199;
`;

function Drop(props) {
    function logout() {
        axios.delete(`/api/v1/logout`)
            .then(resp => {
            props.setCurrent({id: 0})
            })
            .catch(e => {
            console.log(e)
        })
    }
    return (
        <>
           {props.dropshow && (
                <>
                <Overlay onClick={()=>{props.setDropshow(false)}}/>
                
                    <Menues onClick={(e) => { e.stopPropagation() }}>
                        {props.current.id === 0 ? (
                        <>
                                <Dmenu onClick={() => { props.setDropshow(false); props.history.push('/signup')}}>登録</Dmenu>
                                <Dmenu onClick={() => { props.setDropshow(false); props.history.push('/login')}}>ログイン</Dmenu>
                                <Dmenu onClick={() => { props.setDropshow(false); props.history.push('/posts')}}>投稿一覧</Dmenu>
                        </>) :(
                        <>
                                    <Dmenu onClick={() => { props.setDropshow(false); props.history.push(`/users/${props.current.id}`); props.reloaduser(props.current.id)}}>プロフィール</Dmenu>
                                    <Dmenu onClick={() => { logout(); props.setDropshow(false); props.history.push('/login')}}>ログアウト</Dmenu>
                                    <Dmenu onClick={() => { props.setDropshow(false); props.history.push('/posts')}}>投稿一覧</Dmenu>
                        </>   
                        )}
                    </Menues></>    
            )}    
        </>
    )
}





export default withRouter(Drop)
