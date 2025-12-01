import { useState, useEffect, useMemo } from "react";
import axios from "axios";

function PostsPanel() {
    const [postCount, setPostCount] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const url = "/api/posts";
            try {
                const response = await axios.get(url);
                setPosts(response.data);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchPosts();
    }, []);

    const displayedPosts = useMemo(() => {
        return posts.slice(0, postCount);
    }, [posts, postCount]);

    const handleChange = (event) => {
        setPostCount(event.target.value);
    };

    return (
        <div className="content">
            <h1>Посты</h1>
            <h2>Количество постов: {postCount}</h2>
            <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={postCount}
                onChange={handleChange}
            />
            <ul>
                {displayedPosts.map((post) => (
                    <li className={"content-list"} key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostsPanel;
