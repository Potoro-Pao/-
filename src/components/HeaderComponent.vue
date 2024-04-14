<template>
  <header class="header-container">
    <div class="background bg-dark" ></div>
    <a href="#/products" class="link-content btn btn-outline-info">
      Explore more Books
    </a>
  </header>
</template>

<style>
  .header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100vh;
    max-height: 800px; /* Limit the height to 800px */
  }

  .header-container .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/headerbanner8.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
  }

  .header-container .background::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: -1;
  }

  .link-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
  }
</style>
