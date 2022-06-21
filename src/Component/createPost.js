import React , { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { create_post, update_post } from "../Redux/Action/action";

const user_id = localStorage.getItem("userid");

const CreatePost = () =>{
    const id = useParams();
    console.log("id",id);
    const[ title , setTitle ] = useState();
    const[ description , setDescription ] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const create_res = useSelector((state)=>state?.userReducer?.createpost);
    const res = useSelector((state)=>state?.userReducer?.editdata?.data?.post)
    console.log("get single post",res);

    const createPost = (e) =>{
        e.preventDefault();
        let create_post_object = {title,description,user_id}
        if(id){
            let update_post_obj = {title,description,id:id,user_id}
            dispatch(update_post(update_post_obj));
        }else{
            dispatch(create_post(create_post_object));
        if(create_res?.status === 200){
            alert(`${create_res?.data?.message[0]}`);
            navigate("../show-post");
        }
        }
        
    }
    useEffect(()=>{
        if(res){
            setTitle(res?.title)
            setDescription(res?.description)
        }
       
    },[res])
    return(
        <div>
            <h3>
                {
                    id ? "Update Post" : "Create Post"
                }
                </h3>
            <div className="create-post">
                <div className="create-post-form">
                    <form>
                        <fieldset>
                        <legend>
                            {
                                id ? "Update Post" : "Create post"
                            }
                            </legend>
                        <div className="form-field">
                            <input type="text"
                             placeholder="Title"
                             onChange={(e)=>setTitle(e.target.value)}
                             value={title ? title : ""}
                             />
                        </div>
                        <div className="form-field">
                            <input type="text"
                             placeholder="Discription"
                             onChange={(e)=>setDescription(e.target.value)}
                             value={description ? description : ""}
                             />
                        </div>
                        <div className="form-field">
                            {
                                id ? 
                                <button className="create-btn" onClick={(e)=>createPost(e)}>Update Post</button>
                                :
                                <button className="create-btn" onClick={(e)=>createPost(e)}>Create Post</button>
                            }
                            
                        </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;