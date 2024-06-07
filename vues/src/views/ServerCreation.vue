<template>
  <div>
    <h2>Create New Server</h2>
    <form @submit.prevent="createServer">
      <label for="serverName">Server Name:</label>
      <input v-model="serverName" type="text" id="serverName" required />
      <button type="submit">Create</button>
    </form>
    <button @click="goToMenu">Back to Menu</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const serverName = ref('');
    const router = useRouter();

    const createServer = async () => {
      if (serverName.value.trim() === '') {
        alert('Please enter a server name.');
        return;
      }

      try {
        await addDoc(collection(firestore, 'servers'), {
          name: serverName.value.trim(),
        });
        alert('Server created successfully!');
        serverName.value = ''; // Clear input field
      } catch (error) {
        console.error('Error creating server:', error);
        alert('Failed to create server. Please try again later.');
      }
    };

    const goToMenu = () => {
      router.push('/menu');
    };

    return { serverName, createServer, goToMenu };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
