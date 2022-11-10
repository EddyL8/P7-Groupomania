<template>
    <p class="post-user">{{ user.firstname }} {{ user.lastname }}</p>

    <div v-if="!isEdit" class="post-content">
        <p class="post-message">{{ post.message }}</p>
        <div class="post-file">
            <img v-if="post.mediaUrl" :src="post.mediaUrl" alt="Média du post">
        </div>

        <div class="btn-post-container">
            <div class="post-like">
                <button @click="likePost()" name="like" class="btn-like">
                    <i class="fa-solid fa-face-smile"></i>
                </button>
                <p>{{ post.likes }}</p>

                <button @click="likePost()" name="dislike" class="btn-like">
                    <i class="fa-solid fa-face-meh-blank"></i>
                </button>
                <p>{{ post.dislikes }}</p>
            </div>

            <div class="post-modify-delete">
                <button v-if="userId === post.userId || isAdmin" @click="toggleToEdit()" 
                    class="btn-modify-delete" aria-label="Modifier ce post">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button v-if="userId === post.userId || isAdmin" @click="deletePost()" 
                    class="btn-modify-delete" aria-label="Supprimer ce post">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    </div>

    <div v-else>
        <form @submit.prevent="modifyPost()" class="post-modify">
            <label for="post-message"></label>
            <textarea @click="resetErrorMessage" type="textarea" name="post-message" id="post-message" wrap="soft" rows="5" cols="25" 
            @input="resize()" ref="textarea" v-model="post.message"></textarea>

            <label for="media"></label>
            <input @click="resetErrorMessage" class="upload-file" type="file" name="media" id="media" 
                accept="image/jpg , image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm" 
                ref="file" @change="uploadFile" />

            <div class="btn-modify">
                <button type="submit" class="btn-post-modify">Enregistrer les modifications</button>

                <button type="button" class="btn-cancel" @click="cancelEdit">Annuler</button>

                <div v-if="!valid" class="error-message-post">{{ errorMessage }}</div>
            </div>
        </form>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { serviceUser } from '../services/serviceUser';
import { servicePost } from "../services/servicePost"
import { serviceAccount } from '../services/serviceAccount';

export default defineComponent( {
    name: "Post",
    props: ['post', 'user'],
    data() {
        return {
            isEdit: false,
            valid: true,
            errorMessage: '',
        }
    },
    computed: {
        userId() {
            return serviceAccount.getId();
        },
        isAdmin() {
            return serviceAccount.getAdminStatus();
        }
    },
    methods: {
        getOnePost(id) {
            servicePost.getOnePost(this.post)
            .then(() => {
                this.$router.push("/Home", id) 
            })
            .catch(err => console.log(err))
        },
        toggleToEdit() {
            this.isEdit= true;
        },
        cancelEdit() {
            this.isEdit= false;
        },
        deletePost() {
            servicePost.deletePost(this.post._id)
            .then(() => {
                this.$emit('remove');
                window.location.reload();
            })
            .catch(err => console.log(err))
        },
        resize() {
            let text = this.$refs["textarea"];

            text.style.height = "95px";
            text.style.height = text.scrollHeight + "px";
        },
        uploadFile(event) {
            this.file = event.target.files[0]
        },
        modifyPost() {
            console.log('modifyPost')
            servicePost.modifyPost(this.post, this.file)
            .then(() => {
            //    this.$router.push("/Home")
                window.location.reload();
            })
            .catch(err => console.log(err));
            this.valid = false;
            this.errorMessage = "Veuillez ajouter un message et une image pour envoyer une publication !";
        },
        resetErrorMessage() {
            this.valid = true;
        },
        likePost() {

        }
    }
})
</script>

<style lang="scss">
.post-user {
    color: black;
}
.post-modify {
    display: flex;
    flex-direction: column;
    max-width: 500px;
}
.post-content {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.post-message {
    display: flex;
    margin: 15px 0 0 0;
    padding: 10px 15px;
    border: 1px solid #4E5166;
    border-bottom: transparent;
    border-radius: 10px 10px 0 0;
    font-size: 1.2rem;
    text-align: justify;
    color: black;
    background-color: white;
    white-space: pre-line;
}
.post-file {
    padding: 0 10px;
    border: 1px solid #4E5166;
    border-top: transparent;
    border-bottom: transparent;
    background-color: white;
}
.post-file img {
    width: 100%;
    cursor: pointer;
}
.btn-post-container {
    display: flex;
    justify-content: space-between;
    border: 1px solid #4E5166;
    border-top: transparent;
    border-radius: 0 0 10px 10px;
    background-color: white;
}
.post-like {
    display: flex;
}
.btn-like {
    margin: 0 10px;
    font-size: 1rem;
    border: transparent;
    color: #4E5166;
    background-color: transparent;
    cursor: pointer;
}
.btn-like:hover {
    color: #FD2D01;
    transition: 0.2s;
}
.post-modify-delete {
    display: flex;
    justify-content: flex-end;
}
.btn-modify-delete {
    margin: 0 10px;
    font-size: 1rem;
    border: transparent;
    color: #4E5166;
    background-color: transparent;
    cursor: pointer;
}
.btn-modify-delete:hover {
    color: #FD2D01;
    transition: 0.2s;
}
.btn-modify {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.btn-post-modify {
    width: 70%;
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
.btn-cancel {
    width: 25%;
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
.btn-post-modify:hover, .btn-cancel:hover {
    color: #FFF;
    background: #FD2D01;
    transition: 0.2s;
}
</style>