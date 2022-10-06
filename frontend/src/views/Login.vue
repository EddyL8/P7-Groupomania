<template>
    <div class="homepage">
        <Header />
        <img src="../assets/icon-left-font.png" alt="Logo de l'entreprise groupomania" title="logo groupomania" />
        <div class="homepage-bloc">
            <div class='signup-login'>
                <h1>Connexion</h1>
                <form class="form-box">
                    <label for="email">
                        <h3>Email</h3>
                    </label>
                    <input type="email" v-model="user.email" placeholder="Adresse email" required>

                    <div class="btn-show-text">
                        <label for="password">
                            <h3> Mot de passe</h3>
                        </label>
                        <input v-if="showPassword" type="text" class="input" v-model="user.password" placeholder="Mot de passe" required>
                        <input v-else type="password" class="input" v-model="user.password" placeholder="Mot de passe" required>

                        <button class="show-text" @click="toggleShow">
                            <span class="icon is-small is-right">
                                <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                            </span>
                        </button>
                    </div>

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
    import serviceAuth from '../services/serviceAuth.js';
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
            serviceAuth.login(this.user)
                .then(() => {
                    this.$router.push('/home')
                })
                .catch((error: any) => { console.log(error)})
            }
        },
    });
</script>

<style lang="scss">
    body {
        display: block;
        min-width: 320px;
        max-width: 1920px;
        margin: 0 auto;
    }
    header {
        padding: 25px 20px;
        background-color: #FD2D01;
    }
    .header-logo {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .header-logo img {
        width: 20%;
        height: 50px;
        object-fit: cover;
    }
    .homepage {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
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
    .btn-show-text {
        position: relative;
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
    .show-text {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 0px;
        height: 45px;
        right: 6%;
        bottom: 16px;
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
        font-size: 1.1rem;
        text-align: center;
        background: #4E5166;
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
    footer {
        background-color: #FD2D01;
    }
    .footer {
        color: white;
        font-weight: 500;
    }
    .footer ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        padding: 10px 20px;
    }
    .footer li {
        list-style: none;
    }
    </style>