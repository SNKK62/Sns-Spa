import React, {useState, useEffect} from "react"
import styled from 'styled-components'
import axios from 'axios'
import { withRouter } from "react-router-dom"


const Nametug = styled.div`
  margin: 5px 0px 2px 3px;
  padding-left: 3px;
`;

const Inputname = styled.input`
  margin-top: 15px;
  width: 70%;
`;

const Submitbutton = styled.button`
  margin-top: 15px;
  width: 100px;
  text-align: center;
  ${({disabled}) =>  disabled && `opacity: 0.5;`}
`;

function Edituser(props) {

    const [newname, setNewname] = useState("")
    const id = props.match.params.id;
    // const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    // axios.defaults.headers.common['Authenticate'] = csrfToken;
    
    function sendname() {
        var data = {
            "user": {
                name: newname,
            }
        };
        axios.put(`/api/v1/users/${id}`, data)
        .then(resp => {
            props.setUser(resp.data)
        })
        .catch(e => {
            console.log(e)
            })
        console.log(data)
    }
    
    
    return (
        <>
            <Nametug>新しい名前</Nametug>
            <Inputname id="edit" type="text" onChange={(event) => { setNewname(event.target.value);} }/>
            <Submitbutton disabled={(!newname || /^\s*$/.test(newname))} onClick={() => { sendname(); props.setModalshow(false); document.getElementById('edit').value = "";}}>変更する</Submitbutton>
        </>
    )
}

export default withRouter(Edituser)
