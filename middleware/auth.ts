import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useAuthState } from '~/composables/useAuthState'; // Adjust import path as necessary

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuthState();

  // Redirect to login page if user is not authenticated and accessing a protected route
  if (!isAuthenticated.value && to.path !== '/login' && to.path !== '/Home') {
    return navigateTo('/login');
  }

  // If user tries to access the root ('/') and is not authenticated, redirect to '/Home'
  if (!isAuthenticated.value && to.path === '/') {
    return navigateTo('/Home');
  }

  // Redirect authenticated users from login page to home ('/')
  if (isAuthenticated.value && to.path === '/login') {
    return navigateTo('/');
  }
});
