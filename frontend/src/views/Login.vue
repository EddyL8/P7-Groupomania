<template>
    <Header />
    <div class="homepage">
        
        <img src="../assets/icon-left-font.png" alt="Logo de l'entreprise groupomania" title="logo groupomania" />
        <div class="homepage-bloc">
            <div class='signup-login'>
                <h1>Connexion</h1>
                <form @submit.prevent="submit" class="form-box">
                    <label for="email">
                        <h3>Email</h3>
                    </label>
                    <input @click="resetErrorMessage" type="email" class="input" 
                        v-model="user.email" placeholder="Adresse email" required>

                    <div class="btn-show-text">
                        <label for="password">
                            <h3> Mot de passe</h3>
                        </label>
                        <input @click="resetErrorMessage" v-if="showPassword" type="text" class="input" 
                            v-model="user.password" placeholder="Mot de passe" required>
                        <input @click="resetErrorMessage" v-else type="password" class="input" 
                            v-model="user.password" placeholder="Mot de passe" required>

                        <button class="show-text" @click="toggleShow">
                            <span class="icon is-small is-right">
                                <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                            </span>
                        </button>
                    </div>

                    <div v-if="!valid" class="error-message">{{ errorMessage }}</div>

                    <input type="submit" @click.prevent="submit" class="btn-homepage" value="Se connecter">
                </form>
                <div class="redirect">
                    <div class="text-redirect">Pas encore inscrit ?</div>
                    <router-link class="redirect-to-signup-login" to="/SignUp">S'inscrire</router-link>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { serviceUser } from '../services/serviceUser';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';

    export default defineComponent( {
        name: 'Login',
        components: { 
            Header,
            Footer 
        },
        data() {
            return {
                user : {
                    email: '',
                    password: '',
                },
                valid: true,
                errorMessage: '',
                showPassword: false
            }
        },
        computed: {
            buttonLabel() {
                return (this.showPassword) ? "Hide" : "Show";
            }
        },
        methods: {
            toggleShow() {
            this.showPassword = !this.showPassword ;
            },
            submit() {
            serviceUser.loginUser(this.user)
                .then(() => {
                    this.$router.push('/Home')
                })
                .catch((error: any) => { console.log(error)});
                this.valid = false;
                this.errorMessage = "Informations invalides ou manquantes !";
            },
            resetErrorMessage() {
                this.valid = true;
            }
        },
    });
</script>

<style lang="scss">
    .homepage {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1280px;
        margin: 30px;
    }
    .homepage img {
        width: 50%;
    }
    .homepage-bloc {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40%;
        background-color: #FFD7D7;
    }
    .signup-login {
        display:flex;
        flex-direction: column;
        align-items: center;
        margin: 15px;
    }
    .signup-login h1 {
        padding: 10px;
        margin: 15px;
        font-size: 2rem;
        color: #FD2D01;
    }
    .form-box {
        width:90%;
    }
    .form-box h3 {
        margin: 5px 0;
        text-align: left;
    }
    form input {
        width: 100%;
        margin-bottom: 15px;
        padding: 15px;
        border: 1px solid #4E5166;
        border-radius: 10px;
        text-align: left;
        outline: none;
        box-sizing: border-box;
    }
    .btn-show-text {
        position: relative;
    }
    .show-text {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 0px;
        height: 45px;
        right: 6%;
        bottom: 16px;
        padding: 10px 20px;
        border-radius: 8px;
        border: 1px solid transparent;
        transition: border-color 0.25s ;
        font-size: 1em;
        font-weight: 500;
        cursor: pointer;
    }
    .show-text:hover {
        border-color: #FD2D01;
    }
    .btn-homepage {
        width: 80%;
        height: 40px;
        margin: 20px;
        margin-top: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 12px;
        border: none;
        border-color: none;
        color: white;
        background: #4E5166;
        font-size: 1.1rem;
        text-align: center;
        cursor: pointer;
    }
    .btn-homepage:hover {
        color: #FFF;
        background: #FD2D01;
        transition: 0.2s;
    }
    .btn-homepage a {
        color: #FFF;
    }
    .redirect {
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
    }
    .text-redirect {
        padding-right: 6px;
        color: black;
        font-weight: 500;
    }
    .redirect-to-signup-login {
        color: #FD2D01;
        font-weight: bold;
        cursor: pointer;
    }
    </style>