<template>
  <div class="menu">
    <img src="@/assets/images/greenit.png" alt="Greenit" class="greenit" />
    <button class="create-server-button" @click="goToServerCreation">Create Server</button>
    <button class="logout-button" @click="logout">Logout</button>
    <h1>Menu</h1>
    <div class="server-links">
      <div v-for="server in servers" :key="server.id" @click="goToChatroom(server.id)" class="server-bubble">
        <img :src="server.icon" class="server-icon" alt="Server Icon">
        <div class="server-info">
          <h2>{{ server.name }}</h2>
          <p>{{ server.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      servers: []
    };
  },
  async created() {
    await this.loadServers();
  },
  methods: {
    async loadServers() {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'servers'));
        this.servers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error loading servers:', error.message);
      }
    },
    goToChatroom(serverId) {
      this.$router.push(`/chat/${serverId}`);
    },
    goToServerCreation() {
      this.$router.push('/servercreation');
    },
    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.$router.push('/'); 
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  }
};
</script>


<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-image: url("https://i.pinimg.com/originals/73/9a/50/739a50c0b205d23db9cfb3d5b890c543.jpg");
  background-size: 200px; 
  background-position: center; 
  padding: 400px; 
}
.logout-button {
  position: absolute;
  top: 60px;
  right: 30px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.greenit {
  position: absolute;
  top: 30px;
  left: 60px;
  padding: 10px 20px;
  background-color: white;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}
.create-server-button {
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.server-links {
  width: 100%;
}
.logout-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px; 
}
.server-bubble {
  
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.server-bubble:hover {
  background-color: #ddd;
}

.server-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.server-info h2 {
  font-size: 20px;
  color: black;
  margin-bottom: 5px;
}

.server-info p {
  font-size: 16px;
  color: black;
}

</style>
