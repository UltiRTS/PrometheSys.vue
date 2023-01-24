<template>
    <div id="userCardContainer" v-if="isVisible" @click.stop="closeUserCard" style="pointer-events: auto;">
      <div :style="locationStyle">
        <UserCard :username="user"/>  
      </div>
    </div>
    
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useUserCardStore } from '../stores/userCard';
import UserCard from './userCard.vue';

const userCardStore = useUserCardStore()
const { isVisible, user, location } = storeToRefs(userCardStore)
const locationStyle = computed(() => {
  if (location.value) {
    return `top: ${location.value.y}px; left: ${location.value.x}px;`
  } else {
    ""
  }
})
const { closeUserCard } = userCardStore
</script>

<style>
#userCardContainer {
    position: absolute;
    height: 100vh; 
    width: 100vw;
    cursor: default;
    perspective: 20vw;
}
#userCardContainer > div {
    width: 5vw;
    position: absolute;
    transform: rotateY(4deg);
}
</style>