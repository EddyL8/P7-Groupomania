<template>
    <HeaderNav />
    <div class="home">
        <div class="wall">
            <div class="post-wall">
                <createPost />
                <AllPosts />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { serviceAccount } from '../services/serviceAccount';
    import { serviceUser } from '../services/serviceUser';
    import HeaderNav from '../components/HeaderNav.vue';
    import CreatePost from '../components/CreatePost.vue';
    import AllPosts from '../components/AllPosts.vue';

    export default defineComponent( {
        name: 'Home',
        components: { 
            HeaderNav,
            CreatePost,
            AllPosts 
        },

      }
    );
</script>

<style lang="scss">
    .home {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .wall {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        padding: 75px 0;
        background-color: #FFD7D7;
    }
    .post-wall {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
    }
</style>