<template>
    <div>
        <div>{{ userState }}</div>

        <div>{{ username }}</div>
        <div>{{ password }}</div>
        <input type="text" v-model="username">
        <input type="password" v-model="password">
        <button @click="login({username, password})">Login</button>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },

    methods: {
        ...mapActions(['login']),

        
    },
    computed: {
        ...mapState(['userState']),
    },


}
</script>


<style scoped>

@font-face {
    font-family: font1;
    src: import('public/fonts/1.ttf');
}

@font-face {
    font-family: font2;
    src: import('public/fonts/2.ttf');
}

@font-face {
    font-family: font3;
    src: import('public/fonts/3.ttf');
}

@font-face {
    font-family: font4;
    src: import('public/fonts/4.ttf');
}

@font-face {
    font-family: font5;
    src: import('public/fonts/5.otf');
}

@font-face {
    font-family: font6;
    src: import('public/fonts/6.ttf');
}

</style>