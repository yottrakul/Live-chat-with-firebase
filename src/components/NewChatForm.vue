<template>
  <form>
    <textarea
    placeholder="พิมพ์ข้อความที่นี่ ..."
    v-model="message"
    @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser';
import {timestamp} from '../firebase/config'
import useCollection from '../composables/useCollection'

export default {
  setup() {
    const {user} = getUser();
    const message = ref('');
    const {addDoc, error} = useCollection('message')

    const handleSubmit = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp()
      }

      await addDoc(chat);
      if(!error.value) {
        console.log(chat);
        message.value = '';
      }
    }

    return {handleSubmit, message, error}
  }
}
</script>

<style scoped>
  form {
    margin: 10px;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }

</style>