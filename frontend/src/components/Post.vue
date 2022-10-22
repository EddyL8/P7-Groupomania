<template>
    <div class="post">
        <div class="post-container">
            <p class="post-user">{{ user.firstname }} {{ user.lastname }}</p>
            <p class="post-message">{{ post.message }}</p>
            <img class="post-file" v-if="post.file" :src="post.file" alt="Média du post">

            <div class="btn-post-container">
                <button @click="modifyPost(post)"  class="btn-modify" aria-label="Modifier ce post">
                    <i class="fas fa-edit"></i>
                </button>
                <button @click="deletePost(post)"  class="btn-delete" aria-label="Supprimer ce post">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { servicePost } from "../services/servicePost"

export default defineComponent( {
    name: "Post",
    data() {
        return {
            user: {
                lastname: '',
                firstname: ''
            },
            post: {
                message: '',
                file: ''  
            },
        }
    },
    methods: {
        getOnePost(id) {
            servicePost.getOnePost(this.post)
            .then(() => {
                 this.$router.push("/Post", id) 
            })
            .catch(err => console.log(err))
        },
        modifyPost(post) {
            servicePost.modifyPost(this.post)
            .then(() => {
                 this.$router.push("/Post", post) 
            })
            .catch(err => console.log(err))
        },
        deletePost(post) {
            servicePost.deletePost(this.post)
            .then(() => {
                 this.$router.push("/Post", post) 
            })
            .catch(err => console.log(err))
        }
    }
})
</script>

<style lang="scss">
.post {
    display: flex;
    justify-content: center;
    width: 50%;
    padding: 75px 0;
    background-color: #FFD7D7;
}
.post-container {
    display: flex;
    flex-direction: column;
    width: 80%;
}
.post-message {
    display: flex;
    color: black;
}
</style>