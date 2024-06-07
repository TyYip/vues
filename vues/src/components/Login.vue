
<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" type="text" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
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
        window.location.href = '/home';
      } catch (error) {
        alert('Login failed');
      }
    };

    return { email, password, login };
  }
});
</script>
