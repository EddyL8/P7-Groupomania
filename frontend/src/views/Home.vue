<template>
    <HeaderNav />
    <div class="home">
        <createPost />
        <AllPosts />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { serviceAccount } from '../services/serviceAccount';
    import { serviceUser } from '../services/serviceUser';
    import HeaderNav from '../components/HeaderNav.vue';
    import createPost from '../components/createPost.vue';
    import AllPosts from '../components/AllPosts.vue';

    export default defineComponent( {
        name: 'Home',
        components: { 
            HeaderNav,
            createPost,
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
</style>