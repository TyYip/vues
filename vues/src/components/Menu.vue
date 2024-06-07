<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getDatabase, ref as dbRef, set, push, remove } from 'firebase/database';
import { auth, database } from '../firebase';

export default defineComponent({
  setup() {
    const user = auth.currentUser;
    const userActionsRef = user ? dbRef(database, `users/${user.uid}/actions`) : null;

    const logAction = (actionId: number) => {
      if (!userActionsRef) return; 

      const newActionRef = push(userActionsRef);
      set(newActionRef, `Button ${actionId} clicked`);
    };

    const logout = () => {
      auth.signOut().then(() => {
        localStorage.removeItem('loggedIn');
        window.location.href = '/';
      }).catch((error) => {
        console.error('Logout error:', error);
      });
    };

    onMounted(() => {
      if (!localStorage.getItem('loggedIn')) {
        window.location.href = '/';
      }
    });

    onBeforeUnmount(() => {
      if (userActionsRef) {
        remove(userActionsRef);
      }
    });

    return { logAction, logout };
  }
});
</script>
