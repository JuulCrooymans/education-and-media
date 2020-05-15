<template>
  <div>
    <h1>Latest Posts</h1>
    <div>
      <label for="create-post">Say something...</label>
      <br>
      <br>
      <input type="text" v-model="text" placeholder="Create a post">
      <button @click="createPost">Post!</button>
    </div>
    <br>
    <p v-if="error">{{ error }}</p>
    <div>
      <div 
        v-for="post in posts"
        :key="post._id"
        @dblclick="deletePost(post._id)"
      >
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        <p>{{ post.text }}</p>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/api/PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>

<style scoped lang="scss">
</style>
