import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import './App.css'
import axios from 'axios'
import { AiFillEdit,AiFillDelete } from 'react-icons/ai'


const Row = styled.div`
  dispalay: flex;
  padding-left: 20px;
  padding-top: 20px;
  width: 80%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 15px;
  margin-bottom:  5px;
  border-top: 1px solid black;
  padding-bottom: 25px;
  padding-right: 5px;
  position: relative;
  background: rgb(229,229,229);
`;

const Logo = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Editbutton = styled.span`
  font-size: 20px;
  color: blue;
  margin-left: 7px;
  padding-top: 5px;
  &:hover {
      color:red;
  }
`;

const Deletebutton = styled.span`
  color: red;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

function Userpostlist(props) {
    useEffect(() => {
        axios.get(`/api/v1/users/${props.user_id}/posts.json`)
            .then(resp => {
                console.log(resp.data)
                props.setPosts(resp.data);
                console.log(props)
            })
            .catch(e => {
            console.log(e)
        })
        
    }, [props.user_id])

    const deletepost = (pid) => {
        const how=window.confirm("本当に消しますか？")
        if (how) {
            axios.delete(`/api/v1/posts/${pid}`)
                .then(() => {
                    props.reload()
                })
                .catch(e => {
                console.log(e)
            })
        }
    }   
    
    return (
        <>
            <div className={props.className}>
                <Logo >{props.name} の投稿
                    {props.current.id === Number(props.user_id) && (<Editbutton onClick={() => { props.setModaltype('add'); props.setModalshow(true) }} ><AiFillEdit /></Editbutton>)}
                </Logo>
                {props.posts.map((val, key) => {
                    return (
                        <Row key={key}>
                            {val.content}
                            {props.current.id === Number(props.user_id) && (
                                <Deletebutton onClick={() => { deletepost(val.id) }}><AiFillDelete /></Deletebutton>
                            )}</Row>
                    )
                })}
            </div>
        </>
    )

}

export default Userpostlist