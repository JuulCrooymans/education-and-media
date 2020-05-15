const url = 'api/posts/';

class PostService {
    // get post
    static async getPosts() {
        try {
            const res = await fetch(url);
            const data = await res.json();
                
            return data.map( post => ({
                ...post,
                createdAt: new Date(post.createdAt)
            }));
        } catch (err) {
            throw err;
        }
    }

    // Create Post
    static insertPost(text) {
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text})
        })
    }

    // Delete post
    static deletePost(id) {
        return fetch(`${url}${id}`, {
            method: 'DELETE'
        });
    }
}

export default PostService