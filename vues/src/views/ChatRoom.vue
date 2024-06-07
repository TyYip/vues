<template>
  <div class="chat-room">
    <img src="@/assets/images/greenit.png" alt="Greenit" class="greenit" />
    <button class="menu-button" @click="goBackToMenu">←</button>
    <div class="header">
      <div class="left-section">
        <div class="server-icon" style="margin-left: 30px;">
          <img :src="serverIconUrl" alt="Server Icon" class="server-icon" />
        </div>
        <div style="margin-left: 30px;">
          <h2>{{ serverName }}</h2>
          <div class="server-description">{{ serverDescription }}</div>
        </div>
      </div>
      <div class="right-section">
        <img src="@/assets/images/poyo.jpg" alt="Profile Icon" class="profile-icon" />
        <div class="username">{{ extractUsername(currentUser?.email) }}</div>
        <button v-if="currentUser" class="logout-button" @click="logout">Logout</button>
      </div>
    </div>
    <div class="messages" ref="messagesContainer">
      <ul>
        <li v-for="message in messages" :key="message.id" class="message-item">
          <img src="@/assets/images/poyo.jpg" alt="Profile Icon" class="profile-icon" />
          <div class="message-content">
            <div class="message-header">
              <div class="username">{{ extractUsername(message.userEmail) }}:</div>

              <button v-if="message.userId === currentUser?.uid" @click="deleteMessage(message.id)" class="delete-button">Delete</button>
            </div>
            <div class="text">{{ message.text }}</div>
            <div v-if="message.image" class="message-image">
              <img :src="message.image" alt="Posted Image" class="posted-image">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="input-container">
      <input v-model="newMessage" type="text" placeholder="Type your message" @keyup.enter="sendMessage" />
      <input v-model="imageLink" type="text" placeholder="Image URL" />
      <button @click="sendImage">Send Image</button>
      <button @click="sendMessage">Send Message</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';

export default defineComponent({
  setup() {
    const newMessage = ref('');
    const imageLink = ref('');
    const messages = ref([]);
    const serverName = ref('');
    const router = useRouter();
    const serverId = router.currentRoute.value.params.id;
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const serverDescription = ref('');
    const serverIconUrl = ref('');

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };

    const loadMessages = async () => {
      const q = query(
        collection(firestore, 'servers', serverId, 'messages'),
        orderBy('createdAt')
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        messages.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        scrollToBottom();
      });
      onMounted(scrollToBottom);
      onMounted(unsubscribe);
    };

    const loadServerDetails = async () => {
      const serverDoc = await getDoc(doc(firestore, 'servers', serverId));
      if (serverDoc.exists()) {
        serverName.value = serverDoc.data().name;
        serverDescription.value = serverDoc.data().description;
        serverIconUrl.value = serverDoc.data().icon;
      }
    };

    const scrollToBottom = () => {
      const container = document.querySelector('.messages');
      container.scrollTop = container.scrollHeight;
    };

    const sendMessage = async () => {
      try {
        if (!currentUser) {
          throw new Error('User is not authenticated.');
        }

        const messageText = newMessage.value.trim();
        if (!messageText) {
          return;
        }

        const userEmail = currentUser.email;

        await addDoc(collection(firestore, 'servers', serverId, 'messages'), {
          text: messageText,
          createdAt: new Date(),
          userId: currentUser.uid,
          userEmail: userEmail,
          userIcon: currentUser.photoURL, 
        });
        newMessage.value = '';
      } catch (error) {
        alert('Failed to send message: ' + error.message);
      }
    };

    const sendImage = async () => {
      try {
        if (!currentUser) {
          throw new Error('User is not authenticated.');
        }

        const imageUrl = imageLink.value.trim();
        if (!imageUrl) {
          return;
        }

        const userEmail = currentUser.email;

        await addDoc(collection(firestore, 'servers', serverId, 'messages'), {
          image: imageUrl,
          createdAt: new Date(),
          userId: currentUser.uid,
          userEmail: userEmail,
          userIcon: currentUser.photoURL, 
        });
        imageLink.value = '';
      } catch (error) {
        alert('Failed to post image: ' + error.message);
      }
    };

    const deleteMessage = async (messageId: string) => {
      try {
        await deleteDoc(doc(firestore, 'servers', serverId, 'messages', messageId));
      } catch (error) {
        alert('Failed to delete message: ' + error.message);
      }
    };

    const extractUsername = (email: string | null | undefined) => {
      if (email) {
        return email.split('@')[0];
      } else {
        return 'Unknown User';
      }
    };

    const getUserIcon = (message: any) => {
      return message.userIcon ? message.userIcon : '@/assets/images/poyo.jpg'; // Provide default icon
    };

    const goBackToMenu = () => {
      router.push('/menu');
    };

    onMounted(loadMessages);
    onMounted(loadServerDetails);

    return {
      serverIconUrl,
      serverDescription,
      newMessage,
      imageLink,
      messages,
      sendMessage,
      sendImage,
      deleteMessage,
      extractUsername,
      getUserIcon,
      currentUser,
      serverName,
      goBackToMenu,
      logout, 
    };
  },
});
</script>




<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
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
.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
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
.message-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  background-color: #f0f0f0; 
  border-radius: 10px; 
  padding: 10px; 
}

.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.server-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.message-content {
  display: flex;
  flex-direction: column;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.username {
  font-weight: bold;
}

.delete-button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
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

.menu-button {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


.message-text {
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-indent: 0; 
  max-width: 80%; 
}

.long-message {
  text-indent: 1em; 
}

.chat-room {
  background-image: url("https://i.pinimg.com/originals/73/9a/50/739a50c0b205d23db9cfb3d5b890c543.jpg");
  background-size: 200px; 
  background-position: center; 
  padding:360px; 
}
</style>
