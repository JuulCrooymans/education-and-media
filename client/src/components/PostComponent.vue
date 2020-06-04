<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h1 class="h3">Dashboard</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <label for="create-post">Say something...</label>
        <br>
        <br>
        <input type="text" v-model="text" placeholder="Create a post ...">
        <a href="#" @click="createPost">Post!</a>

        <br>
        <br>
        <input type="text" v-model="updateText" placeholder="update a post ...">
      </div>
    </div>
    <br>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="row">
      <div class="col-12 col-md-8 post"
        v-for="post in posts"
        :key="post._id"
      >
        <img class="post__picture" :src="post.user.picture" alt="profile picture">
        <div class="post__body">
          <div class="post__user">
            <router-link class="post__name" :to="`/users/${post.user.sub.replace('auth0|', '')}`">{{ post.user.name }}</router-link>
            <p class="post__date">{{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}</p>
              
          </div>
          <p class="post__body">{{ post.text }}</p>
          <a class="post__delete" href="#" v-if="post.user.sub === $auth.user.sub || $store.state.userRoles.includes('admin')" @click="deletePost($event, post._id)">delete</a>
          <a class="post__update" href="#" v-if="post.user.sub === $auth.user.sub || $store.state.userRoles.includes('admin')" @click="updatePost($event, post._id)">update</a>
        </div>
        
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
      text: '',
      updateText: ''
    }
  },
  methods: {
    async createPost(e) {
      e.preventDefault();
      const accessToken = await this.$auth.getTokenSilently();
      await PostService.insertPost(this.text, this.$auth.user, accessToken);
      this.posts = await PostService.getPosts(accessToken);
    },
    async deletePost(event, id) {
      event.preventDefault();
      const accessToken = await this.$auth.getTokenSilently();
      await PostService.deletePost(id, accessToken);
      this.posts = await PostService.getPosts(accessToken);
    },
    async updatePost(event, id) {
      event.preventDefault();
      if (this.updateText) {
        const accessToken = await this.$auth.getTokenSilently();
        await PostService.updatePost(id, this.updateText, accessToken);
        this.posts = await PostService.getPosts(accessToken);
        this.error = ''
      } else {
        this.error = 'fill in updated'
      }
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
.error {
  margin: 20px 0;
  background: red;
  padding: 10px;
  color: white;
}

.post {
  $self: &;
  display: flex;
  margin-bottom: 30px;

  &__picture {
      height: 50px;
      margin-right: 20px;
      border-radius: 50%;
  }

  &__body {
    #{ $self }__user {
      display: flex;
      align-items: center;

      #{ $self }__name {
        font-weight: bold;
        margin: 5px 20px 10px 0;
        text-decoration: none;
        color: black;
      }

      #{ $self }__date {
        opacity: .6;
      }
    }

    #{ $self }__body {
      margin-bottom: 10px;
      opacity: .87;
    }

    #{ $self }__delete {
      color: red;
      font-weight: bold;
      text-decoration: none;
    }

    #{ $self }__update {
      color: blue;
      font-weight: bold;
      text-decoration: none;
      margin-left: 20px;
    }

    #{ $self }__update-text {
      text-decoration: none;
      margin-bottom: 10px;
    }
  }
}
</style>
