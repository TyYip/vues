<template>
  <div>
    <h2>Menu</h2>
    <ul>
      <li v-for="server in servers" :key="server.id">
        <router-link :to="'/chat/' + server.id">{{ server.name }}</router-link>
      </li>
    </ul>
    <router-link to="/create-server">
      <button>Create Server</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

export default defineComponent({
  setup() {
    const servers = ref([]);

    const loadServers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'servers'));
        servers.value = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      } catch (error) {
        console.error('Error fetching servers:', error);
      }
    };

    loadServers();

    return { servers };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
