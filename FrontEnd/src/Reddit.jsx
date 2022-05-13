import React, {useEffect, useState} from 'react'
import superagent from 'superagent'

const Reddit = () =>{

    const [posts, setPosts] = useState([])
    const titleRef = React.createRef();
    const bodyRef = React.createRef();
    const idRef = React.createRef();
    

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
        var id = idRef.current.value
        await superagent.post(`http://localhost:3001/delete?id=` + id)
        getPosts()
    }

    const editPost = async() => {
        var id = idRef.current.value
        var body = bodyRef.current.value
        var title = titleRef.current.value
        await superagent.post(`http://localhost:3001/edit?id=` + id + `&body=` + body + `&title=` + title)
        getPosts()
    }

    useEffect(() => {
        getPosts()
        
    }, [])


    return (
        <div>
            {
                <table border = '1'>
                    <tbody>
                        {
                            posts.map(post => {
                                return (
                                    <tr>
                                        <td>{post._id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.body}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
            <table>
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
                    <tr>
                        <td>
                            <label>
                                ID:
                                <input type="text" ref={idRef} />
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={createPost}>Post</button>
            <button onClick={deletePost}>Delete</button>
            <button onClick={editPost}>Edit</button>
        </div>
    )
}

export default Reddit