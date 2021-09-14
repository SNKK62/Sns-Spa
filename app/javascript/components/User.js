import React , {useState, useEffect} from 'react'
import { Link ,withRouter} from 'react-router-dom'
import styled from 'styled-components'
import UserPostlist from './UserPostlist'
import { AiFillEdit } from 'react-icons/ai'
import Profile from './Profile'

import './App.css'
import axios from 'axios'
import Modal from './Modal'

const Profiler = styled.div`
  text-align: center;
  grid-row: 1/2;
  grid-column: 2/3;
  padding-top: 32px;
  font-size: 20px
`;

const Edit = styled.span`
  color: blue;
  margin-bottom:15px;
  width: 35px;
  text-align: center;
  cursor: pointer;
  padding-left: 5px;
  ${({ishover}) => ishover && `color: red;`}
`;

const Userimage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 20px 10px 10px 20px;
  cursor: pointer;
  grid-row: 1/2;
  grid-column: 1/2;
`;
const Count = styled.div`
  grid-row: 2/3;
  grid-column: 1/3;
  padding: 10px 0 0 10px;
`;

const Followbutton = styled.button`
  grid-row:3/4;
  grid-column: 2/3;
  color: white;
  text-align: center;
  height: 30px;
  width: 150px;
  ${({ follow }) => 
    follow ? `background: red; border-color: red;`:
    `background: blue; border-color: blue;`
  }
`;





function  User(props) {
    const [modalshow, setModalshow] = useState(false)
    const [modaltype, setModaltype] = useState("")
    // const [user, setUser] = useState([])
    const [ishover, setIshover] = useState(false)
    // const [followcount, setFollowcount] = useState(0)
    // const [followedcount, setFollowedcount] = useState(0)
    const [current, setCurrent] = useState({id: 0})
    const [follow, setFollow] = useState(false)
    const [posts, setPosts] = useState([])
    const [ischa,setIscha] = useState(0)
    
    const id = props.match.params.id;
    useEffect(() => {
        axios.get(`/api/v1/users/${id}`)
            .then(resp => {
                props.setUser(resp.data.user);
                props.setFollowcount(resp.data.followcount)
                props.setFollowedcount(resp.data.followedcount)
                props.setUrl(resp.data.user.img.url)
                if (resp.data.logged_in) {
                    setCurrent(resp.data.current_user)
                }
                console.log(resp.data)
            }).catch(e => {
                console.log(e);
            });
        
        
        axios.get(`/api/v1/users/following/${id}`)
            .then(resp => {
                setFollow(resp.data.bool)
                console.log(resp.data)
            })
            .catch(e => {
                console.log(e)
            });
        
        
    }, [])

    useEffect(() => {
        axios.get(`/api/v1/users/${id}`)
            .then(resp => {
                props.setUser(resp.data.user);
                props.setFollowcount(resp.data.followcount)
                props.setFollowedcount(resp.data.followedcount)
                props.setUrl(resp.data.user.img.url)
                if (resp.data.logged_in) {
                    setCurrent(resp.data.current_user)
                }
                console.log(resp.data)
            }).catch(e => {
                console.log(e);
            });
        axios.get(`/api/v1/users/${id}/posts`)
        .then(resp => {
            setPosts(resp.data)
        })
            .catch(e => {
            console.log(e)
        })
    },[modalshow, ischa])

    

    function following() {
        axios.post(`/api/v1/relationships/${id}`)
            .then(resp => {
                setFollow(true)
                props.setFollowedcount(props.followedcount+1)                
            })
            .catch(e => {
            console.log(e)
        })
    }

    function unfollow() {
        axios.delete(`/api/v1/relationships/${id}`)
            .then(resp => {
                setFollow(false)
                props.setFollowedcount(props.followedcount-1)
                
            })
            .catch(e => {
            console.log(e)
        })
    }

    function reload() {
        axios.get(`/api/v1/users/${id}/posts.json`)
            .then(resp => {
                console.log(resp.data)
                setPosts(resp.data);
                console.log(props)
            })
            .catch(e => {
            console.log(e)
            })
            axios.get(`/api/v1/users/${id}`)
            .then(resp => {
                props.setUser(resp.data.user);
                props.setFollowcount(resp.data.followcount)
                props.setFollowedcount(resp.data.followedcount)
                props.setUrl(resp.data.user.img.url)
                if (resp.data.logged_in) {
                    setCurrent(resp.data.current_user)
                }
                console.log(resp.data)
            }).catch(e => {
                console.log(e);
            });
    }

    history.pushState(null, null, '/posts');


    return (
        <>
            <div className="parent ">
                <div className="child border-bottom"  >
                    <Profile id={id} current={current} setModalshow={setModalshow} setModaltype={setModaltype} url={props.url} setUrl={props.setUrl} />
                    <Profiler>{props.user.name}
                        {current.id === Number(id) && (
                            <Edit ishover={ishover} onClick={() => { setModalshow(true); setModaltype('edit') }} onMouseEnter={() => { setIshover(true) }} onMouseLeave={() => { setIshover(false) }}>
                            <AiFillEdit />
                        </Edit>
                            )}
                            
                    </Profiler>
                    <Count>
                        <Link to={"/users/" + id + "/followings"}>{props.followcount}フォロー　</Link>
                        <Link to={"/users/" + id + "/followers"}>{props.followedcount}フォロワー　　</Link>
                    </Count>
                        { (current.id!==0 && current.id !== Number(id)) && (<>
                            {
                                follow ? (
                            <Followbutton follow={follow} onClick={unfollow}>フォロー解除</Followbutton>
                        ):(
                            <Followbutton follow={follow} onClick={following}>フォロー</Followbutton>
                        )}
                        </>)}
                    
                </div>

                <UserPostlist reload={reload} posts={posts} setPosts={setPosts} setModalshow={setModalshow} setModaltype={setModaltype} current={current} className="child-two" user_id={id} setModalshow={setModalshow} setModaltype={setModaltype} name={props.user.name }/>
            </div>
            
            <Modal setIscha={setIscha} reloaduser={props.reloaduser} reload={reload} modalshow={modalshow} setModalshow={setModalshow} user={props.user} setUser={props.setUser} type={modaltype} />
            
        </>
    )
}


export default withRouter(User)