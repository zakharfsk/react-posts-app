import React from 'react';
import '../styles/App.css';
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import {usePosts} from "../hooks/usePost";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import PostForm from "../components/PostForm";
import Loader from "../components/UI/Loader/Loader";
import {useObserver} from "../hooks/useObsorver";

function Posts() {
    const [posts, setPosts] = React.useState([]);
    const [filter, setFilter] = React.useState({sort: '', query: ''});
    const [modal, setModal] = React.useState(false);
    const [totalPages, setTotalPages] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const lastElement = React.useRef();
    console.log(lastElement);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    React.useEffect(() => {
        fetchPosts(limit, page);
    }, [page])

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {});

    React.useEffect(() => {
        if (isPostsLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting && page < totalPages) {
                setPage(page + 1);
                console.log(page);
            }
        });

        observer.current.observe(lastElement.current);
    }, [isPostsLoading])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const changePage = (page) => {
        setPage(page);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Створити пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError &&
                <h1>Відбулася помилка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постів"/>
            <div style={{height: 20, background: 'red'}} ref={lastElement}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
        </div>
    );
}

export default Posts;
