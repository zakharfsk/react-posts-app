import React from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = React.useState({title: '', body: ''});

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''});
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder="Назва поста"
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
            />
            <MyInput
                type="text"
                placeholder="Опис поста"
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Створити пост</MyButton>
        </form>
    );
};

export default PostForm;