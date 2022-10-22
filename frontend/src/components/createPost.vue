<template>
    <div class="post">
        <form>

            <div class="post-container">
                <label for="post-message"></label>
                <textarea type="textarea" name="post-message" id="post-message" wrap="soft" rows="5" cols="25" 
                    @input="resize()" ref="textarea" v-model="post.message" placeholder="Exprimez-vous !" ></textarea>

                <label for="post-file"></label>
                <input class="upload-file" type="file" name="post-file" id="post-file" 
                    accept="image/jpg , image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm" 
                    ref="file" @change="uploadFile" />   
            </div>

            <button type="submit" @click.prevent="createPost" class="btn-post">Envoyer</button>
        </form>
    </div>
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
                userId:'',
                message:''
            }
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
            servicePost.createPost(this.post)
            .then(() => {
                 this.$router.push("/home") 
            })
            .catch(err => console.log(err))
        },
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
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
}
.post-container {
    display: flex;
    flex-direction: column;
    width: 80%;
}
textarea {
    padding: 10px;
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
    height: 40px;
    margin: 5px 0;
    border: 1px solid #4E5166;
    border-radius: 10px;
    color: white;
    background: #FD2D01;
    font-size: 1.2rem;
    cursor: pointer;
}
</style>