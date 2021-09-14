import React, {useState, useEffect} from "react"
import styled from 'styled-components'
import axios from 'axios'
import { withRouter } from "react-router-dom"


const Nametug = styled.div`
  margin: 5px 0px 2px 3px;
  padding-left: 3px;
`;

const Inputname = styled.textarea`
  margin-top: 15px;
  width: 70%;
  height: 50%;
`;

const Submitbutton = styled.button`
  margin-top: 15px;
  width: 100px;
  text-align: center;
  ${({disabled}) =>  disabled && `opacity: 0.5;`}
`;

function Newpost(props) {

    const [content, setContent] = useState("")
    const id = props.match.params.id;
    
    function addpost() {
        var data = {
            "post": {
                content: content,
            }
        };
        axios.post(`/api/v1/posts`, data)
        .then(resp => {
            
        })
        .catch(e => {
            console.log(e)
            })
        console.log(data)
    }
    
    
    return (
        <>
            <Nametug>新規投稿</Nametug>
            <Inputname id="new" type="text" onChange={(event) => { setContent(event.target.value);} }/>
            <Submitbutton disabled={(!content || /^\s*$/.test(content))} onClick={() => { addpost(); props.setModalshow(false); document.getElementById('new').value = ""; setTimeout(() => { for (var i = 0; i < 10; i++) { props.setIscha(i) } },1100) }}>投稿する</Submitbutton>
        </>
    )
}

export default withRouter(Newpost)
