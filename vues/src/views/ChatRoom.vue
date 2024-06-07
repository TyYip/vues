<template>
    <div>
      <h2>{{ serverName }}</h2>
      <ul>
        <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
      </ul>
      <input v-model="newMessage" type="text" placeholder="Type your message" @keyup.enter="sendMessage" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { doc, collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
  import { firestore } from '../firebase';
  
  export default defineComponent({
    props: ['serverId', 'serverName'],
    setup(props) {
      const newMessage = ref('');
      const messages = ref([]);
  
      const loadMessages = async () => {
        const q = query(
          collection(firestore, 'servers', props.serverId, 'messages'),
          orderBy('createdAt')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          messages.value = querySnapshot.docs.map((doc) => doc.data());
        });
        onMounted(unsubscribe);
      };
  
      const sendMessage = async () => {
        try {
          await addDoc(collection(firestore, 'servers', props.serverId, 'messages'), {
            text: newMessage.value,
            createdAt: new Date()
          });
          newMessage.value = ''; // Clear input field after sending
        } catch (error) {
          alert('Failed to send message: ' + error.message);
        }
      };
  
      return { newMessage, messages, loadMessages, sendMessage };
    },
    mounted() {
      this.loadMessages();
    }
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  