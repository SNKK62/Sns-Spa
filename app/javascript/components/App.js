import React, {useState,useEffect} from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import './App.css'
import Header from './Header'
import Postlist from './Postlist'
import Userlist from './Userlist'
import Modal from './Modal'
import User from './User'
import Signup from './Signup'
import Login from './Login'
import Followlist from './Followlist'
import Followedlist from './Followedlist'


function App(props) {
    const [serchshow, setSerchshow] = useState(false)
    const [user, setUser] = useState([])
    const [followcount, setFollowcount] = useState(0)
    const [followedcount, setFollowedcount] = useState(0)
    const [url, setUrl] = useState('')
    console.log(props)
    function reloaduser(uid) {
        axios.get(`/api/v1/users/${uid}`)
            .then(resp => {
                setUser(resp.data.user);
                setFollowcount(resp.data.followcount)
                setFollowedcount(resp.data.followedcount)
                setUrl(resp.data.user.img.url)
            })
        .catch(e => {console.log(e)})
    }

    
    

    return (
        <>
            <Header reloaduser={reloaduser} serchshow={serchshow} setSerchshow={ setSerchshow} />
            {!serchshow && (
                <Switch>
                    {/* <Route exact path="/users" component={Userlist}/> */}
                    <Route exact path="/posts" component={Postlist} />
                    <Route exact path="/users/:id" render={() => < User url={url} setUrl={setUrl} user={user} setUser={setUser} followcount={followcount} setFollowcount={setFollowcount} followedcount={followedcount} setFollowedcount={setFollowedcount} reloaduser={reloaduser} />}/>
                    <Route exact path="/signup" component={ Signup }/>
                    <Route exact path="/login" component={ Login }/>
                    <Route exact path="/users/:id/followings" component={ Followlist }/>
                    <Route exact path="/users/:id/followers" component={ Followedlist }/>
                </Switch>
            )}
        </>
    )
}

export default App