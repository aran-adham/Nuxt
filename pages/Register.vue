<template>
  <div class="flex items-center justify-center h-screen px-4 sm:px-6">
    <div class="bg-gray-800 p-12 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <!-- Login Text -->
      <h2 class="text-center text-white text-2xl sm:text-3xl font-bold mb-6">
        Register
      </h2>

      <!-- Form -->
      <form @submit.prevent="submit" class="flex flex-col space-y-6">

        <div>
          <label for="Name" class="block text-white text-base sm:text-lg mb-2">Name</label>
          <input type="text" id="Name" v-model="name"
            class="w-full p-2 sm:p-3 text-base sm:text-lg border rounded focus:outline-none focus:ring-2 focus:ring-green-500">
        </div>


        <div>
          <label for="Email" class="block text-white text-base sm:text-lg mb-2">Email</label>
          <input type="email" id="Email" v-model="email"
            class="w-full p-2 sm:p-3 text-base sm:text-lg border rounded focus:outline-none focus:ring-2 focus:ring-green-500">
        </div>

        <div>
          <label for="password" class="block text-white text-base sm:text-lg mb-2">Password</label>
          <input type="password" id="password" v-model="password"
            class="w-full p-2 sm:p-3 text-base sm:text-lg border rounded focus:outline-none focus:ring-2 focus:ring-green-500 mb-6">
        </div>

        <button type="submit"
          class="bg-green-500 text-white text-base sm:text-lg p-2 sm:p-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Register
        </button>
      </form>
    </div>
  </div>
</template>



<script>
export default {
  name: "register",
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async submit() {
      await fetch("nest-production-1596.up.railway.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
        })
      });
      await this.$router.push('/login')
    }
  }
}
</script>

<style></style>