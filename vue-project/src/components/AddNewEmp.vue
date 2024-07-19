<template>
  <div class="add-employee">
    <div class="logout-container">
      <button @click="logout" class="logout-button">Logout</button>
    </div>
    <h2>Add New Employee</h2>
    <form @submit.prevent="addEmployee">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" v-model="phoneNumber" id="phoneNumber" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="grad">Grad:</label>
        <input type="number" v-model="grad" id="grad" required>
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" @change="onFileChange" id="image" required>
      </div>
      <button type="submit">Add Employee</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      phoneNumber: '',
      email: '',
      grad: '',
      image: null ,
      errorMessage: '' 

    };
  },
  methods: {
    onFileChange(event) {
      this.image = event.target.files[0];
    },
    async addEmployee() {
      try {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('phoneNumber', this.phoneNumber);
        formData.append('email', this.email);
        formData.append('grad', this.grad);
        formData.append('image', this.image);

        const token = sessionStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        };

        const response = await axios.post('https://localhost:7129/api/Employees/AddEmployee', formData, config);
        console.log('Employee added:', response.data);
        if(response.data==true){
          this.$router.push('/employeeList');
        }else{
          this.errorMessage="This User Is Added Previosly";
        }
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    },
    logout() {
      sessionStorage.removeItem('token');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.add-employee {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.logout-container {
  text-align: right;
  margin-bottom: 10px;
}

.logout-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 20%;
}

.logout-button:hover {
  background-color: #c82333;
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
input[type="email"],
input[type="number"],
input[type="file"],
textarea {
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
.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
