import React, {useEffect, useState} from 'react'
import superagent from 'superagent'

const Reddit = () =>{

    const [posts, setPosts] = useState([])
    const titleRef = React.createRef();
    const bodyRef = React.createRef();
    var inputID;
    

    const getPosts = async () => {
        const response = await superagent.get('http://localhost:3001/posts')
        const resObject = JSON.parse(response.text)
        //.body accesses all the posts
        //console.log(resObject.map(i=>i.title))
        //console.log(resObject.body.map(i=>i.title))
        //console.log(resObject.body.map(i=>i.body))
        setPosts(resObject)
    }

    const createPost = async () => {
        var title = titleRef.current.value
        var body = bodyRef.current.value
        //const response = await superagent.post(`http://localhost:3001/create=${title}&${body}`)
       await superagent.post(`http://localhost:3001/create?title=` + title + `&body=` + body)
        console.log('http://localhost:3001/create?title=' + title + '&body=' + body)
        getPosts()

    }

    const deletePost = async() => {
        var id = inputID;
        await superagent.post(`http://localhost:3001/delete?id=` + id)
        getPosts()
    }

    const editPost = async() => {
        var id = inputID;
        var body = bodyRef.current.value
        var title = titleRef.current.value

        if(body === "" && title !== ""){
            await superagent.post(`http://localhost:3001/edit?id=` + id + `&title=` + title)
        }else if(body !== "" && title === ""){
            await superagent.post(`http://localhost:3001/edit?id=` + id + `&body=` + body)
        }else if(body !== "" && title !== ""){
            await superagent.post(`http://localhost:3001/edit?id=` + id + `&body=` + body + `&title=` + title)
        }
        getPosts()
    }

    function loadID(id) {
        console.log(id);
        inputID = id;
    }


    useEffect(() => {
        getPosts()
        
    }, [])


    return (
        <div
        style ={{
            backgroundColor: "white",
            border: "5px solid",
            margin: "0px 500px 0px 500px"

        }}>
            {
                <table border = ".5" align = "center" width = "700px" display = "flex">
                    <thead>
                        <tr>
                            <th>Posts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map(post => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td width = "20%" align = "center"> 
                                                <button onClick={() => {
                                                    loadID(post._id);
                                                    }}>{post.title}
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width = "20%" align = "center">
                                                {post.body}
                                            </td>
                                        </tr>
                                        <br></br>
                                        <br></br>
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
            
            <table align = "center">
                <tbody>
                    <tr>
                        <td>
                            <label>
                                Title:
                                <input type="text" ref={titleRef}/>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>
                                Body:
                                <input type="text" ref={bodyRef}/>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div align = "center">
                <button onClick={createPost}>Post</button>
                <button onClick={deletePost}>Delete</button>
                <button onClick={editPost}>Edit</button>
            </div>
            
        </div>
    )
}

export default Reddit