const url = 'api/posts/';

class PostService {
    // get post
    static async getPosts(accessToken) {
        try {
            const res = await fetch(url, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
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
    static insertPost(text, accessToken) {
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({text})
        })
    }

    // Delete post
    static deletePost(id, accessToken) {
        
        return fetch(`${url}${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}

export default PostService