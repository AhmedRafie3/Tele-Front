<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required>
      </div>
 
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <div class="form-group">
        <label for="userRole">User Role:</label>
        <select v-model="userRole" id="userRole" required>
          <option value="">Select --</option>
          <option value="1">Admin</option>
          <option value="2">User</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      userRole: ''  // Corrected the property name to userRole
    };
  },
  methods: {
    async register() {
      try {
        console.log('User registered:', this.username, this.password, this.userRole);

        const response = await axios.post('https://localhost:7129/api/User/Register', {
          username: this.username,
          password: this.password,
          userRole: parseInt(this.userRole)  
        });
        console.log('User registered:', response.data);

        this.$router.push('/');
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px
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
</style>
