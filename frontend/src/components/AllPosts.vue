<template>
    <div class="post">
        <div v-for="post in posts" :key="post" class="post-container">
            <div class="no-posts" v-if="posts.length === 0">
                <h1> C'est très calme par ici...</h1>
                <img class="no-posts-img" src="../assets/tumbleweed.gif">
            </div>
        </div>
    <Post />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { serviceAccount } from '../services/serviceAccount';
    import { serviceUser } from '../services/serviceUser';
    import { servicePost } from "../services/servicePost"
    import Post from '../components/Post.vue';

    export default defineComponent( {
        name: 'Home',
        components: { 
            Post
        },
        data() {
            return {
                posts: []
            }
        },
        methods: {
            getAllPosts(post) {
                servicePost.getAllPosts(this.post)
                .then(() => {
                    this.$router.push("/AllPosts", post) 
                })
                .catch(err => console.log(err))
            }
        }
      }
    );
</script>