<template>
    <HeaderNav />
    <Post />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { serviceAccount } from '../services/serviceAccount';
    import { serviceUser } from '../services/serviceUser';
    import HeaderNav from '../components/HeaderNav.vue';
    import Post from '../components/Post.vue';

    export default defineComponent( {
        name: 'Home',
        components: { 
            HeaderNav,
            Post 
        },

      }
    );
</script>