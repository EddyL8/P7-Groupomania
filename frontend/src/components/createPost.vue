<template>
    <form class="post-create">
        <label for="post-message"></label>
        <textarea @click="resetErrorMessage" type="textarea" name="post-message" id="post-message" 
            wrap="soft" rows="5" cols="25" @input="resize()" ref="textarea" 
            v-model="post.message" placeholder="Exprimez-vous !" ></textarea>

        <label for="media"></label>
        <input @click="resetErrorMessage" class="upload-file" type="file" name="media" id="media" 
            accept="image/jpg , image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm" 
            ref="file" @change="uploadFile" />   
    </form>

    <button type="submit" @click.prevent="createPost" class="btn-post">Envoyer</button>
    
    <div v-if="!valid" class="error-message-post">{{ errorMessage }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { serviceAccount } from '../services/serviceAccount'
import { servicePost } from "../services/servicePost"

export default defineComponent( {
    name: "createPost",
    data() {
        return {
            file: '',
            post: {
                message:''
            },
            valid: true,
            errorMessage: '',
        }
    },
    methods: {
        resize() {
            let text = this.$refs["textarea"];

            text.style.height = "95px";
            text.style.height = text.scrollHeight + "px";
        },
        uploadFile(event) {
            this.file = event.target.files[0]
        },
        createPost() {
            servicePost.createPost(this.post, this.file)
            .then(() => {
                //this.$router.push("/Home");
                window.location.reload(); 
            })
            .catch(err => console.log(err));
            this.valid = false;
            this.errorMessage = "Veuillez ajouter un message et une image pour envoyer une publication !";
        },
        resetErrorMessage() {
            this.valid = true;
        }
    }
})
</script>

<style lang="scss">
.post-create {
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 500px;
}
textarea {
    padding: 10px;
    border: 1px solid #4E5166;
    border-bottom: transparent;
    border-radius: 10px 10px 0 0;
    font-size: 1.2rem;
    overflow: hidden;
    resize: none;
}
.upload-file {
    display: flex;
    margin: 0 0 10px 0;
    padding: 15px 25px;
    border: 1px solid #4E5166;
    border-top: transparent;
    border-radius: 0 0 10px 10px;
    background: white;
}
.btn-post {
    width: 80%;
    max-width: 500px;
    height: 40px;
    margin: 5px 0;
    border: 1px solid #4E5166;
    border-radius: 10px;
    color: white;
    background: #4E5166;
    font-size: 1.1rem;
    cursor: pointer;
}
.btn-post:hover {
    color: #FFF;
    background: #FD2D01;
    transition: 0.2s;
}
</style>