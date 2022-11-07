<template>
    <header>
        <div class="header-logo">
            <img src="/src/assets/icon-left-font-monochrome-white.png" alt="Logo de l'entreprise groupomania" />
        </div>
        <div class="nav">
            <router-link to="/profile">
                <button class="button-nav" type="button" title="Profil" alt="Page du profil utilisateur">
                    <i class="fa-solid fa-user"></i>
                </button>
            </router-link>
            <router-link to="/settings">
                <button class="button-nav" type="button" title="Paramètres" alt="Réglages du profil">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </router-link>
            <router-link to="/" @click="logout" >
                <button class="button-nav" type="button" title="Déconnexion" alt="Déconnexion du profil">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </router-link>  
        </div>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { serviceAccount } from '../services/serviceAccount';
    import Header from '../components/Header.vue';

    export default defineComponent( {
        components: { 
            Header 
        },
        methods: {
            logout() {
                serviceAccount.logout()
                this.$router.push('/')
            }
        }
    });
    
</script>

<style lang="scss">
header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px;
    background-color: #FD2D01;
}
.header-logo {
    display: flex;
    width: 100%;
    height: 100%;
}
.header-logo img {
    width: 20%;
    height: 60px;
    object-fit: cover;
}
.nav {
    display: flex;
}
.button-nav {
    margin: 20px;
    font-size: 1.2rem;
    border: transparent;
    color: #4E5166;
    background-color: transparent;
    cursor: pointer;
}
</style>