import React , {useState, useEffect} from 'react'
import { Link ,withRouter} from 'react-router-dom'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import {AiOutlineMenu} from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {FiDelete} from 'react-icons/fi'
import Drop from './Drop'
import './App.css'
import axios from 'axios'

const Headerstyle = styled.div`
  background: rgb(153,204,255);
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  ${({ serchshow }) => 
    serchshow ? `box-shadow: 0 -1px 1px rgb(0,0,0,0.3) inset;` :
        `box-shadow: 0 3px 10px rgb(0,0,0,0.3);`
  }

`;

const Title = styled.div`
  margin: auto;
  width: 50%;
  text-align: center;
  font-size: 20px;
`;

const Serch = styled.input`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 5px;
  padding: 0;
  width: 85%;
  background-color: rgb(153,204,255);
  height: 80%;
  border: 0;
  paddign: 10px;
  &:focus{
      border: 0;
      outline-style: none;
  }
`;

const Serchbutton = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 1em;
`;

const Backbutton = styled.span`
  margin-left: 1em;
  margin-top: auto;
  margin-bottom: auto;
`;



const Serchback = styled.div`
  top: 100px;
  width: 100%;
  left:0;
  display: flex;
  flex-flow: column;
  align-items: center;
  background: white;
  box-shadow: 0 5px 10px rgb(0,0,0,0.3) inset;
  z-index: 99;
  margin-top: 50px;
  
  
`;

const Selectbar = styled.div`
  height: 50px;
  width:100%;
  position: absolute;
  top: 50px;
  display: flex;
  background: white;
  text-align: center;
  justify-content:right;
  align-items: center;
  box-shadow: 0 5px 10px rgb(0,0,0,0.3) inset;
`;

const Tabuser = styled.div`
  width: 50%;
  background: rgb(76,76,76);
  color: white;
  height: 50px;
  ${({ isuser }) =>
    isuser && `opacity: 0.5;`
  }
`;

const Tabpost = styled.div`
  width: 50%;
  background: rgb(76,76,76);
  color: white;
  height: 50px;
  ${({ isuser }) => 
    !isuser && `opacity: 0.5;`
  }
`;

const Row = styled.div`
  
  width: 60%;
  margin: 10px 20px 0 20px;
  z-index: 100;
  background: rgb(204,204,255);
  padding: 7px 5px 7px 5px;
  border-top: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Namediv = styled.div`
  margin-top: 10px;
  backgrond: transparent;
`;



function Header(props) {
    const [dropshow, setDropshow] = useState(false);
    // const [serchshow, setSerchshow] = useState(false);
    const [word, setWord] = useState("");
    const [isuser, setIsuser] = useState(true)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [current,setCurrent] = useState({id: 0})

    useEffect(() => {
        axios.get('/api/v1/users')
            .then(resp => {
                setUsers(resp.data)
                console.log(resp.data)
            }).catch(e => {
                console.log(e)
            });
        axios.get('/api/v1/posts')
            .then(resp => {
                console.log(resp.data)
                setPosts(resp.data)
            }).catch(e => {
                console.log(e)
            });
        axios.get(`/api/v1/logged_in`)
            .then(resp => {
                console.log(resp.data)
                if (resp.data.bool) {
                setCurrent(resp.data.user)
            }
            })
            .catch(e => {
            console.log(e)
        })
    }, []);

    const reloaddata = () => {
        axios.get('/api/v1/users')
            .then(resp => {
                setUsers(resp.data)
                console.log(resp.data)
            }).catch(e => {
                console.log(e)
            });
        axios.get('/api/v1/posts')
            .then(resp => {
                console.log(resp.data)
                setPosts(resp.data)
            }).catch(e => {
                console.log(e)
            });
    }

    function reloadall() {
        axios.get('/api/v1/users')
            .then(resp => {
                setUsers(resp.data)
                console.log(resp.data)
            }).catch(e => {
                console.log(e)
            });
        axios.get('/api/v1/posts')
            .then(resp => {
                console.log(resp.data)
                setPosts(resp.data)
            }).catch(e => {
                console.log(e)
            });
        axios.get(`/api/v1/logged_in`)
            .then(resp => {
                console.log(resp.data)
                if (resp.data.bool) {
                setCurrent(resp.data.user)
            }
            })
            .catch(e => {
            console.log(e)
        })
    }
    

    return (
        <>
            <Headerstyle serchshow={props.serchshow}>
                {props.serchshow ? (
                    <>
                        <Backbutton>
                            <AiOutlineArrowLeft onClick={() => { props.setSerchshow(false); setDropshow(false)} }/>
                        </Backbutton>
                        <Serch type="text" id="serch" placeholder="検索" onChange={(event) => {
                            setWord(event.target.value)
                        } }/>
                        <Serchbutton>
                            <FiDelete onClick={() => { setWord(""); document.getElementById('serch').value = ""; document.getElementById('serch').focus();}} />
                        </Serchbutton>
                            <Selectbar>
                                <Tabuser isuser={isuser} onClick = {() => {setIsuser(true)}}><Namediv>User</Namediv></Tabuser>
                                <Tabpost isuser={isuser} onClick = {() => {setIsuser(false)}}><Namediv>Post</Namediv></Tabpost>
                            </Selectbar>
                        
                    </>
                    ) : (
                    <>
                        <Title>Sns-Spa</Title>
                        <Serchbutton >
                                <AiOutlineSearch onClick={() => { reloaddata(); props.setSerchshow(true); setDropshow(false); setTimeout(() => { document.getElementById('serch').focus(); }, 100);} }/>
                        </Serchbutton>
                        <Serchbutton>
                                <AiOutlineMenu onClick={() => { reloadall(); setDropshow(!dropshow) }} />
                        </Serchbutton> 
                            
                    </>
                )}
            </Headerstyle>
            {props.serchshow && (
                <Serchback>
                    {isuser ? (
                        users.filter((val) => {
                            if (word === "") {
                                return val;
                            } else if (val.name.includes(word)) {
                                return val;
                            }
                        }).map((val, key) => {
                            return (
                                <Row onClick={() => { props.setSerchshow(false); props.history.push(`/users/${val.id}`);}} key={key}>
                                    {val.name}
                                </Row>
                            )
                        })
                    ) : (
                        posts.filter((val) => {
                            if (word === "") {
                                return val;
                            } else if (val.content.includes(word)) {
                                return val;
                            }
                        }).map((val, key) => {
                            return (
                                <Row key={key} onClick={() => { props.setSerchshow(false); props.history.push(`/users/${val.user_id}`)}} >
                                    {val.content}
                                </Row>
                            )
                        })
                    )}
                </Serchback>
            )}
                            


            <Drop reloaduser={props.reloaduser} dropshow={dropshow} setDropshow={setDropshow} current={current} setCurrent={setCurrent }/>
        </>
    )
}

export default withRouter(Header )