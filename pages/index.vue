<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <div class="p-4 w-full max-w-4xl">
        <!-- Flex Container for Header and Add Button -->
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-3xl">{{ message }}</h1>
          
          <!-- Add Button -->
          <NuxtLink to="/add" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xl">+</NuxtLink>
        </div>

        <!-- Users Table -->
        <table class="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="bg-gray-50 odd:bg-gray-100">
              <td class="border px-4 py-2">{{ user.id }}</td>
              <td class="border px-4 py-2">{{ user.name }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2 text-center">
                <NuxtLink :to="`/edit/${user.id}`" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2">Edit</NuxtLink>
                <button @click="confirmDelete(user)" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p>Are you sure you want to delete this user?</p>
        <div class="mt-4">
          <button @click="deleteUser" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Confirm</button>
          <button @click="cancelDelete" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      users: [], // Store the list of users here
      showModal: false, // Controls the modal visibility
      userToDelete: null, // Store the user to delete
    };
  },
  async mounted() {
    try {
      const response = await fetch("nest-production-1596.up.railway.app/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      });

      const content = await response.json();
      this.message = "Hi " + content.name;
    } catch (e) {
      this.message = "You are not logged in";
    }

    // Fetch all users
    try {
      const response = await fetch("nest-production-1596.up.railway.app/api/users", {
        headers: { "Content-Type": "application/json" },
      });

      const users = await response.json();
      this.users = users; // Update the users array
    } catch (e) {
      console.error("Error fetching users:", e);
    }
  },
  methods: {
    confirmDelete(user) {
      this.userToDelete = user;
      this.showModal = true; // Show the confirmation modal
    },
    cancelDelete() {
      this.showModal = false; // Hide the modal if cancel is clicked
      this.userToDelete = null;
    },
    async deleteUser() {
      const userId = this.userToDelete.id;

      try {
        await fetch(`nest-production-1596.up.railway.app/api/users/${userId}`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" }
        });

        // Remove the deleted user from the table
        this.users = this.users.filter(user => user.id !== userId);
        this.showModal = false; // Close the modal after deletion
      } catch (e) {
        console.error("Error deleting user:", e);
      }
    }
  }
};
</script>

<script setup>
definePageMeta({
  middleware: 'auth', // Apply the auth middleware
});
</script>
