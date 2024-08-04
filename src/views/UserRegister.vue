<template>
  <div class="register-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">Olecode</div>
        <img
          alt="Rocket Image"
          class="rocket-image"
          src="@/assets/Saly-1.png"
        />
      </div>

      <div class="login-form-container">
        <h2>账户注册</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="username">账户</label>
            <input
              id="username"
              v-model="username"
              placeholder="Username"
              type="text"
            />
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input
              id="password"
              v-model="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <button class="btn-signin" type="submit" @click="register">
            注册
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import checkParam from "@/util/checkParam";
import { Message } from "@arco-design/web-vue";
import { Service } from "../../generated";

const username = ref("");
const password = ref("");

checkParam(username.value, password.value);

const register = () => {
  const error = checkParam(username.value, password.value) as string;
  if (error) {
    Message.error(error);
  } else {
    Service.userRegisterUsingPost({
      userAccount: username.value,
      userPassword: password.value,
    });
  }
};
</script>

<style lang="less" scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5; // 背景色

  .login-container {
    width: 100%;
    max-width: 900px;
    background-color: white;
    //overflow: hidden;
    display: flex;

    .login-header {
      width: 50%;
      background-color: #007bff;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;

      .logo {
        font-size: 24px;
      }

      .rocket-image {
        margin-top: 20px;
        max-width: 100%;
      }
    }

    .login-form-container {
      width: 50%;
      padding: 40px;

      h1 {
        font-size: 24px;
        margin-bottom: 10px;

        .brand {
          color: #007bff;
        }
      }

      h2 {
        font-size: 20px;
        margin-bottom: 30px;
      }

      .form-group {
        margin-bottom: 20px;

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      }

      .form-footer {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;

        .forgot-password {
          color: #007bff;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .btn-signin {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        color: white;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          background-color: #0056b3;
        }
      }

      .signup-link {
        margin-top: 20px;
        text-align: center;

        span {
          margin-right: 5px;
        }

        a {
          color: #007bff;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
