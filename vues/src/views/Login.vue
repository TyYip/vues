<template>
  <div class="bar">
    
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

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        localStorage.setItem('loggedIn', 'true');
        window.location.href = '/menu'; // Redirect to the menu page upon successful login
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    };

    return { email, password, login };
  }
});
</script>

<style scoped>
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
  position: relative;
    margin: 20px auto;
    max-width: 400px;
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
</style>
