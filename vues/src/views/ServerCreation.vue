<template>
  <div>
    <h2>Create Server</h2>
    <input v-model="serverName" type="text" placeholder="Server Name" />
    <button @click="createServer">Create Server</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

export default defineComponent({
  setup() {
    const serverName = ref('');

    const createServer = async () => {
      try {
        await addDoc(collection(firestore, 'servers'), {
          name: serverName.value,
          createdAt: new Date()
        });
        alert('Server created successfully!');
        serverName.value = ''; // Clear input field after creation
      } catch (error) {
        alert('Failed to create server: ' + error.message);
      }
    };

    return { serverName, createServer };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
