<template>
  <div class="chat-room">
    <div class="messages" ref="messagesContainer">
      <ul>
        <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
      </ul>
    </div>
    <div class="input-container">
      <input v-model="newMessage" type="text" placeholder="Type your message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const newMessage = ref('');
    const messages = ref([]);
    const router = useRouter();
    const serverId = router.currentRoute.value.params.id;

    const loadMessages = async () => {
      const q = query(
        collection(firestore, 'servers', serverId, 'messages'),
        orderBy('createdAt')
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        messages.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        scrollToBottom();
      });
      onMounted(unsubscribe);
    };

    const scrollToBottom = () => {
      const container = document.querySelector('.messages');
      container.scrollTop = container.scrollHeight;
    };

    const sendMessage = async () => {
      try {
        await addDoc(collection(firestore, 'servers', serverId, 'messages'), {
          text: newMessage.value,
          createdAt: new Date()
        });
        newMessage.value = ''; // Clear input field after sending
      } catch (error) {
        alert('Failed to send message: ' + error.message);
      }
    };

    onMounted(loadMessages);

    return { newMessage, messages, sendMessage };
  }
});
</script>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex: 1;
  overflow-y: auto;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
}

.input-container input {
  flex: 1;
  margin-right: 10px;
}

.input-container button {
  padding: 8px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>

