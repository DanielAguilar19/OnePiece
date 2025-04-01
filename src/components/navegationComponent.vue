<template>
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/characters">Characters</RouterLink>
    <RouterLink to="/fruits">Fruits</RouterLink>
    <RouterLink to="/crews">Crews</RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 12vh;
  left: 50%;
  transform: translateX(-50%);
  height: 7%;
  width: auto;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-size: 18px;
  padding: 10px;
  transition: all 0.3s ease;
}

.navbar a:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

body {
  padding-top: 80px;
}
</style>
