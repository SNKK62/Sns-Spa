import React , {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'

import '../../assets/stylesheets/App.css'
import axios from 'axios'
import Edituser from './Edituser'
import Userimage from './Userimage'
import Newpost from './Newpost'
import { withRouter } from 'react-router-dom'
const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0,0,0,0.7);
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: 0.5s;
  ${({ isshow }) => isshow ? `
    visibility: visible;
  ` : `
    visibility: hidden;
  `}
`;

const Modalform = styled.div`
  width: 70%;
  height: 70%;
  z-index: 2;
  background: white;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0,0,0,0.3);
  transition: 0.7s;
  display: flex;
  position: relative;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  ${({ isshow }) => isshow ? `
   transform: translateY(0);
  ` : `
   transform: translateY(-200%);
   `}
`;


const Closebutton = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em 1em 0 0;
  cursor: pointer;
`;


function Modal(props) {


    return (
        <Overlay onClick = {() => { props.setModalshow(false) }} isshow={props.modalshow}>
            <Modalform onClick={(e) => { e.stopPropagation(); }} isshow={props.modalshow}>
                <Closebutton onClick={() => { props.setModalshow(false) }}>
                    <AiOutlineClose />
                </Closebutton>
                    {props.type === "edit" && (
            <Edituser setModalshow={props.setModalshow } user={props.user} setUser={props.setUser}/>
                )}
                {props.type === 'image' && (
                    <Userimage setIscha={props.setIscha} reload={props.reload} setModalshow={props.setModalshow} user={props.user} setUser={props.setUser} />
          )}
          {props.type === 'add' && (
            <Newpost  reload={props.reload} setModalshow={props.setModalshow} setIscha={props.setIscha} />
          )}
            </Modalform>
        </Overlay>
    )

}


export  default withRouter(Modal)