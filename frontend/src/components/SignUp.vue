<template>
    <div class="homepage">
        <img src="../assets/icon-left-font.png" alt="Logo de l'entreprise groupomania" title="logo groupomania" />
        <div class="signup-bloc">
            <div class='signup'>
                <h1>Rejoignez-nous</h1>
                <form class="form-box">
                    <label for="lastname">
                        <h3>Nom</h3>
                    </label>
                    <input type="text" v-model="lastname" placeholder="Nom" required>
                
                    <label for="firstname">
                        <h3>Prénom</h3>
                    </label>
                    <input type="text" v-model="firstname" placeholder="Prénom" required>

                    <label for="email">
                        <h3>Email</h3>
                    </label>
                    <input type="email" v-model="email" placeholder="Adresse email" required>

                    <div class="btn-show-text">
                        <label for="password">
                            <h3> Mot de passe</h3>
                        </label>
                        <input v-if="showPassword" type="text" class="input" v-model="password" placeholder="Mot de passe" required>
                        <input v-else type="password" class="input" v-model="password" placeholder="Mot de passe" required>

                        <button class="show-text" @click="toggleShow">
                            <span class="icon is-small is-right">
                                <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                            </span>
                        </button>
                    </div>

                    <label for="passwordConfirm">
                        <h3>Confirmation du mot de passe</h3>
                    </label>
                    <input v-if="showPassword" type="text" class="input" v-model="passwordConfirm" placeholder="Mot de passe" required>
                    <input v-else type="password" class="input" v-model="passwordConfirm" placeholder="Mot de passe" required>

                    <input type="submit" @click.prevent="submit" class="btn-registration" value="Inscription">
                </form>
                <div class="login-redirect">
                    <div class="text-login-redirect">Déjà inscrit ?</div>
                    <router-link class="redirect-to-login" to="/login">Se connecter</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent( {
        name: 'SignUp',
        data() {
            return {
                lastname: '',
                firstname: '',
                email: '',
                password: '',
                passwordConfirm: '',
                showPassword: false,
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
            let data = {
                lastname:this.lastname,
                firstname:this.firstname,
                email:this.email,
                password:this.password
            };
            fetch("http://localhost:3000/api/auth/signup", {
                  method: "POST",
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
            }) 
            .then(() => {
                alert("Votre inscription a bien été prise en compte");
                this.$router.push("/login");
            })
            .catch((error)=> {
			    alert("Votre inscription ne peut pas être validée")
			})
          }
        }
      }
    );
    </script>
    
<style lang="scss">
body {
    margin: 0 auto;
    min-width: 320px;
    max-width: 1920px;
}
.homepage {
    display: flex;
    width: 100%;
}
.homepage img {
    width: 60%;
}
.signup-bloc {
    padding: 20px;
    background-color: #FFD7D7;
    width: 40%;
}
.signup {
    display:flex;
    flex-direction: column;
    align-items: center;
    margin: 15px;
}
.signup h1 {
    padding: 15px;
    margin: 15px;
    font-size: 2rem;
    color: #FD2D01;
}
.form-box {
    width:90%;
}
.form-box h3 {
    text-align: left;
    margin: 5px 0;
}
.btn-show-text {
    position: relative;
}
form input {
    width: 100%;
    outline: none;
    border: 1px solid #4E5166;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 10px;
    text-align: left;
    box-sizing: border-box;
}
.show-text {
    bottom: 21px;
    right: 6%;
    position: absolute;
    width: 0px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login {
    width: 50%;
    font-size: 1.3rem;
    height: 3rem;
    border: solid 1px #333;
    cursor: pointer;
}
.infoPassword {
    color: #4E5166;
    font-weight: 200;
    font-size: small;
    text-align: justify;
    padding-bottom: 20px;
    margin-top: -10px;
}
.btn-registration {
    text-align: center;
    font-size: 1.1rem;
    margin: 20px;
    margin-top: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 80%;
    height: 40px;
    background: #4E5166;
    border-radius: 12px;
    border-color: none;
    color: white;
    border: none;
    cursor: pointer;
}
.btn-registration:hover {
    background: #FD2D01;
    color: #FFF;
    transition: 0.2s;
}
.btn-registration a {
    color: #FFF;
}
.login-redirect {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}
.text-login-redirect {
    padding-right: 6px;
    color: black;
    font-weight: 500;
}
.redirect-to-login {
    color: #FD2D01;
    font-weight: bold;
    cursor: pointer;
}
</style>