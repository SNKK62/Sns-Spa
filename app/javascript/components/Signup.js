import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Div = styled.div`
  display:flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.div`
  text-align: center;
  margin: 20px 0 30px 0;
`;

const Input = styled.input`
  width: 60%;
`;

const Error = styled.div`
  margin: 10px 0 20px 0;
  
  ${({ len }) => (len < 6 && len > 0) ? `color:red;` :
    `display: none;`
}
`;

const NameError = styled.div`
  text-align: center;
  color:red;
`;

const Button = styled.button`
  width: 40%;
  margin-top: 50px;
  background: skyblue;
  cursor: pointer;
  ${({disabled}) =>
        disabled && `cursor: default; opacity: 0.5; background: red;`}
`;


function Signup(props) {
    const [len, setLen] = useState("")
    const [namelen, setNamelen] = useState("")
    const [namerror, setNamerror] = useState(false)
    const [passempty, setPassempty] = useState(false)
    const [passconf, setPassconf] = useState("")
    const [passcorrect, setPasscorrect] = useState("none")
    const [namealready, setNamealready] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('api/v1/users')
            .then(resp => {
                setUsers(resp.data)
                console.log(resp.data)
            })
            .catch(e => {
            console.log(e)
        })
    },[])

    const initialuser = {
        id: null,
        name: "",
        img: null,
        password: "",
        password_confirmation: "",
    };
    const [user, setUser] = useState(initialuser)

    function inputname(event) {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }

    function saveUser() {
        var data = {
            "user":{
                name: user.name,
                password: user.password,
                password_confirmation: user.password_confirmation,
            }
        };

        axios.post('/api/v1/users', data)
            .then(resp => {
                console.log(data)
                props.history.push(`/users/${resp.data.id}`)
            })
            .catch(e => {
            console.log(e)
        })
    };
    
    function zerolenname(len1) {
        if (!len1 || /^\s*$/.test(len1)) {
            setNamerror(true)
        }
        else {
            setNamerror(false)
        }
    }

    function already(name) {
        var bool = false
        users.map((val, key) => {
            if (val.name === name) {
                bool = true
            }
        })
        return bool
    }

    function zerolenpass(len2) {
        if (!len2 || /^\s*$/.test(len2)) {
            setPassempty(true)
        }
        else {
            setPassempty(false)
        }
    }

    function authpass(str, len) {
        if (!str || /^\s*$/.test(str)) {
            setPasscorrect("emp");
        }
        else if (str !== len) {
            setPasscorrect("inc");
        }
        else {
            setPasscorrect("none");
        }
    }

    function resetall() {
        setLen("")
        setNamelen("")
        setPassconf('')
        // setNamerror(false)
        // setPassempty(false)
        setPasscorrect("none")
    }

    
    return (
        <Div>
            <Name>名前</Name>
            <Input name="name" type="text" id="name" onChange={(event) => { setNamelen(event.target.value); zerolenname(event.target.value); inputname(event); setNamealready(already(event.target.value));}} />
            {namerror &&  (
                <NameError>名前を入力してください</NameError>
            )}
            {namealready && (
                <NameError>その名前はすでに存在します</NameError>
            )}
            <Name>パスワード</Name>
            <Input name="password" type="text" id="name" onChange={(event) => { setLen(event.target.value); zerolenpass(event.target.value); inputname(event)}}/>
            {passempty && (
                <NameError>パスワードを入力してください</NameError>
            )}
            <Error len={len.length}>パスワードは6文字以上です</Error>
            <Name>パスワードの確認</Name>
            <Input name="password_confirmation" type="text" id="name" onChange={(event) => { setPassconf(event.target.value); authpass(event.target.value, len);inputname(event)}} />
            {passcorrect === "emp" && (
                <NameError>パスワードの確認を入力してください</NameError>
            )}
            {passcorrect === "inc" && (
                <NameError>パスワードと一致していません</NameError>
            )}
            <Button disabled={namealready || namerror || passempty || passcorrect !== "none" || len.length === 0 || namelen.length === 0 || passconf.length === 0} onClick={() => { document.querySelectorAll('#name').forEach(element => element.value = ''); resetall(); saveUser(); }}>登録</Button>
            
        </Div>
    )
}

export default Signup
