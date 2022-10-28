<template>
    <div class="post-container">
        <Post v-for="(post, user, idx) in posts.slice().reverse()" :post="post" :user="user" @remove="deletePost(idx)" />
    </div>
    <div class="no-posts" v-if="posts.length === 0">
        <h1> C'est très calme par ici...</h1>
        <img class="no-posts-img" src="../assets/tumbleweed.gif">
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
        mounted() {
            servicePost.getAllPosts(this.post)
            .then((res) => {
                this.posts = res.data
                console.log(res.data)
            }),
            serviceUser.getUser(this.post)
            .then((res) => {
                this.posts = res.data
                console.log(res.data)
            })
        },
        methods: {
            getAllPosts(post) {
                servicePost.getAllPosts(this.post)
                .then(() => {
                    this.$router.push("/AllPosts", post) 
                })
                .catch(err => console.log(err))
            },
            getUser(post) {
                serviceUser.getUser(this.post)
                .then(() => {
                     
                })
                .catch(err => console.log(err))
            },
            deletePost(index) {
                this.posts.splice(index, 1)
            }
        }
    });
</script>

<style lang="scss">
.post-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 500px;
}
</style>