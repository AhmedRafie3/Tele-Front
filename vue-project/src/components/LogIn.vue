<template>
  <div class="login">
    <h2>Log In</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required>
      </div>

      <button type="submit">Log In</button>
    </form>
    <button @click="routeToCreateAccount" class="create-account-button">Create Account</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '' 
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://localhost:7129/api/User/Auth', {
          username: this.username,
          password: this.password
        });

        console.log('User logged in:', response.data);
        if (response.data && response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('userRole', response.data.userRole);
          this.$router.push('/employeeList'); 
        } else {
          this.errorMessage = 'Invalid username or password'; 
        }
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'An error occurred during login'; 
      }
    },
    routeToCreateAccount() {
      this.$router.push('/register'); 
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-top: 200px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"],
select {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.create-account-button {
  margin-top: 10px;
  background-color: #28a745;
}

.create-account-button:hover {
  background-color: #218838;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
