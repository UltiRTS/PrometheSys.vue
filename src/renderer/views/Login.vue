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
