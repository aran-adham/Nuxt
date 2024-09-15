<template>
  <div class="flex items-center justify-center h-screen px-4 sm:px-6">
    <div class="bg-gray-800 p-12 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <!-- Login Text -->
      <h2 class="text-center text-white text-2xl sm:text-3xl font-bold mb-6">
        Edit User
      </h2>

      <!-- Form -->
      <form @submit.prevent="updateUser" class="flex flex-col space-y-6">
        <div>
          <label for="Email" class="block text-white text-base sm:text-lg mb-2">Name</label>
          <input type="text" id="Email" v-model="user.name"
            class="w-full p-2 sm:p-3 text-base sm:text-lg border rounded focus:outline-none focus:ring-2 focus:ring-green-500">
        </div>

        <div>
          <label for="password" class="block text-white text-base sm:text-lg mb-2">Email</label>
          <input type="text" id="password" v-model="user.email"
            class="w-full p-2 sm:p-3 text-base sm:text-lg border rounded focus:outline-none focus:ring-2 focus:ring-green-500 mb-6">
        </div>

        <button type="submit"
          class="bg-green-500 text-white text-base sm:text-lg p-2 sm:p-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Update
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: ''
      }
    };
  },
  async mounted() {
    const userId = this.$route.params.id; // Get user ID from $route (not useRoute)

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        headers: { "Content-Type": "application/json" }
      });
      const userData = await response.json();
      this.user = userData; // Populate the form with the user's data
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  },
  methods: {
    async updateUser() {
      const userId = this.$route.params.id; // Access $route directly

      try {
        await fetch(`http://localhost:8000/api/users/${userId}`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.user)
        });
        // Redirect or show success message after update
        this.$router.push('/');
      } catch (e) {
        console.error("Error updating user:", e);
      }
    }
  }
};
</script>


<script setup>
definePageMeta({
  middleware: 'auth', // Ensure authentication
});
</script>
