import React, {useState, useEffect }from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 5%
`;

const Input = styled.input`
  width: 70%;
  margin: 10px 0 20px 0;
`;

const Tag = styled.div`
  text-align: center;
  width: 100%;
  margin: 5px 0 15px 0;
`;

const Logo = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin: 20px 0 40px 0;
`;

const Button = styled.button`
  width: 80px;
  background-color: gray;
  margin: 10px 0 0 0;
  cursor: pointer;
  ${({disabled}) => disabled && `opacity: 0.5; cursor: default;`}
`;

function Login(props) {
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")

    // useEffect(() => {
    //     const defname = document.getElementById('name').value;
    //     const defpass = document.getElementById('pass').value;
    //     setName(defname)
    //     setPass(defpass)
    // },[])


    function login() {
        var data = {
            "session": {
                name: name,
                password: pass,
            }
        }
        axios.post('/api/v1/login',data)
            .then(resp => {
                if (resp.data.success) {
                props.history.push(`/users/${resp.data.user.id}`)
                }
            })
            .catch(e => {
            console.log(e)
        })
    }

    return (
        <Div>
            <Logo>ログイン</Logo> 
            <Tag>名前</Tag>
            <Input id="name" type="text" onChange={event => {setName(event.target.value)} }/>
            <Tag>パスワード</Tag>
            <Input id="pass" type="password" onChange={event => { setPass(event.target.value) }} />
            <Button disabled={!name || !pass} onClick={() => { document.querySelectorAll('input').forEach(val => { val.value = "" }); login(); setName(""); setPass("");}}>ログイン</Button>
        </Div>
    )
}

export default Login