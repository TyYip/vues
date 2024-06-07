<template>
  <div class="bar">
    <img src="@/assets/images/greenit.png" alt="Greenit" class="greenit" />
    <h2>Login</h2>
    <input v-model="email" type="text" class="search-input" placeholder="Email" />
    <input v-model="password" type="password" class="search-input" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const username = ref('');

    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        username.value = user.displayName || '';
        localStorage.setItem('loggedIn', 'true');
        window.location.href = '/menu'; 
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    };

    return { email, password, username, login };
  }
});
</script>


<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.center {
  text-align: center;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bar {
  background-image: url("https://i.pinimg.com/originals/73/9a/50/739a50c0b205d23db9cfb3d5b890c543.jpg");
  background-size: 200px; 
  background-position: center; 
  padding: 400px;
}
.search-input {
    width: 100%;
    padding: 10px 15px;
    border: 2px solid #ccc;
    border-radius: 20px;
    outline: none;
    font-size: 16px;
}
button, .btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
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
</style>
