<template>
  <div>
    <nav class="bg-gray-800">
      <div class="px-6 sm:px-6 lg:px-8">
        <div :class="['flex h-16 items-center text-white', isAuthenticated ? 'justify-between' : 'justify-end']">
          <!-- Home link is always accessible -->
          <div v-if="isAuthenticated">
            <NuxtLink to="/">Home</NuxtLink>
          </div>

          <!-- Display Login/Register for unauthenticated users -->
          <div v-if="!isAuthenticated" class="flex space-x-6">
            <NuxtLink to="/Login">Login</NuxtLink>
            <NuxtLink to="/Register">Register</NuxtLink>
          </div>

          <!-- Display Logout for authenticated users -->
          <div v-if="isAuthenticated" class="flex space-x-6">
            <NuxtLink to="/Login" @click="logout">Logout</NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup>
import { useAuthState } from '~/composables/useAuthState';

definePageMeta({
  middleware: 'auth', // Apply the auth middleware
});

const { signout } = useAuthState();
const { isAuthenticated } = useAuthState();

// Logout function
async function logout() {
  try {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    signout();
    await navigateTo('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}
</script>
