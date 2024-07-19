<template>
    <div class="edit-employee">
        <div class="logout-container">
      <button @click="logout" class="logout-button">Logout</button>
    </div>
      <h2>Edit Employee</h2>
      <form @submit.prevent="editEmployee">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="employee.name" id="name" required>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" v-model="employee.phoneNumber" id="phoneNumber" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="employee.email" id="email" required>
        </div>
        <div class="form-group">
          <label for="grad">Grad:</label>
          <input type="number" v-model="employee.grad" id="grad" required>
        </div>
        <div class="form-group">
          <label for="image">Image URL:</label>
          <input type="text" v-model="employee.image" id="image" required>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        employee: {
          id: '', 
          name: '',
          phoneNumber: '',
          email: '',
          grad: '',
          image: ''
        }
      };
    },
    created() {
     
      const employeeId = this.$route.params.id;
      this.fetchEmployee(employeeId);
    },
    methods: {
        logout() {
      sessionStorage.removeItem('token');
      
      this.$router.push('/'); 
    },
      async fetchEmployee(id) {
        try {
          const token = sessionStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.get(`https://localhost:7129/api/Employees/GetById?id=${id}`, config);
          this.employee = response.data;
          console.log('Fetched employee:', this.employee);
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      },
      
      async editEmployee() {
        try {
          const token = sessionStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
  
          const response = await axios.put(`https://localhost:7129/api/Employees/UpdateEmployee`, this.employee, config);
          console.log('Employee updated:', response.data);
  
          this.$router.push('/employeeList'); 
        } catch (error) {
          console.error('Error updating employee:', error);
        }
      }
    }
    
  };
  </script>
  
  <style scoped>
  .edit-employee {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
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
  input[type="number"] {
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
  </style>
  