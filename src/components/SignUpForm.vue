<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="display name" v-model="displayName">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password" v-model="password">
    <div class="error">{{error}}</div>
    <button>Sign Up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignUp from '../composables/useSignUp'
export default {
  setup(props, context) {
    const { error, signup } = useSignUp();
    //refs
    const displayName = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      // console.log(displayName.value, email.value, password.value)
      await signup(email.value, password.value, displayName.value)
      if(!error.value){
        console.log('user signed up')
        context.emit('signup')
      }
    }

    return { displayName, email, password, handleSubmit, error}
  }
}
</script>

<style>

</style>