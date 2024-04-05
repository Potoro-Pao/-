<template>
  <div class="not-found-container">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, we couldn't find the page you're looking for.</p>
    <p>This might be because you've typed the web address incorrectly
         or the page has been moved or deleted.</p>
    <router-link to="/" class="home-link">Go to Homepage</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
}

p {
  color: #666;
}

.home-link {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}
</style>
