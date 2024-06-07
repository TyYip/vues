<template>
  <div class="server-creation">
    <img src="@/assets/images/greenit.png" alt="Greenit" class="greenit" />
    <button class="back-button" @click="backToMenu">&#8592;</button>
    <button class="logout-button" @click="logout">Logout</button>
    <h1>Create New Server</h1>
    <div class="server-form">
      <label for="serverName">Server Name:</label>
      <input type="text" id="serverName" v-model="serverName">
      <label for="serverIcon">Server Icon (URL or upload image):</label>
      <input type="text" id="serverIcon" v-model="serverIcon">
      <label for="serverDescription">Description:</label>
      <textarea id="serverDescription" v-model="serverDescription"></textarea>
      <button @click="createServer">Create Server</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      serverName: '',
      serverIcon: '',
      serverDescription: ''
    };
  },
  methods: {
    async createServer() {
      try {
        await addDoc(collection(firestore, 'servers'), {
          name: this.serverName,
          icon: this.serverIcon,
          description: this.serverDescription
        });
        this.serverName = '';
        this.serverIcon = '';
        this.serverDescription = '';
      } catch (error) {
        console.error('Error creating server:', error.message);
      }
    },
    backToMenu() {
      this.$router.push('/menu');
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
.server-creation {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  height: 100%;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.server-form {
  max-width: 400px;
}

.server-form label {
  display: block;
  margin-bottom: 5px;
}

.server-form input[type="text"],
.server-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
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
.server-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.logout-button {
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
.server-bubble {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 10px;
}

.server-bubble img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.server-bubble .server-info {
  color: black;
}
.server-creation {
  background-image: url("https://i.pinimg.com/originals/73/9a/50/739a50c0b205d23db9cfb3d5b890c543.jpg");
  background-size: 200px; 
  background-position: center; 
  padding: 300px; 
}
</style>