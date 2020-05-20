<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h1>Latest Posts</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <label for="create-post">Say something...</label>
        <br>
        <br>
        <input type="text" v-model="text" placeholder="Create a post">
        <button @click="createPost">Post!</button>
      </div>
    </div>
    <br>
    <p v-if="error">{{ error }}</p>
    <div class="row">
      <div class="col-12"
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
      const accessToken = await this.$auth.getTokenSilently();
      await PostService.insertPost(this.text, accessToken);
      this.posts = await PostService.getPosts(accessToken);
    },
    async deletePost(id) {
      const accessToken = await this.$auth.getTokenSilently();
      await PostService.deletePost(id, accessToken);
      this.posts = await PostService.getPosts(accessToken);
    }
  },
  async created() {
    try {
      const accessToken = await this.$auth.getTokenSilently();
      this.posts = await PostService.getPosts(accessToken);
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>

<style scoped lang="scss">
</style>
