import { useState, useEffect, useMemo } from "react";

function PostsPanel() {
    const [postCount, setPostCount] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const url = "https://jsonplaceholder.typicode.com/posts";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setPosts(result);
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
