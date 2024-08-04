<template>
  <div class="login-page">
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
        <h1>欢迎来到 <span class="brand">OleCode</span></h1>
        <h2>账户登录</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">账户</label>
            <input
              id="username"
              v-model="username"
              placeholder="Username or email address"
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
          <div class="form-footer">
            <a class="forgot-password" href="#">忘记密码</a>
          </div>
          <button class="btn-signin" type="submit">登录</button>
        </form>
        <div class="signup-link">
          <span>没有账户？</span>
          <router-link :to="{ path: '/user/register' }">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import checkParam from "@/util/checkParam";
import { Message, Notification } from "@arco-design/web-vue";
import { Service } from "../../generated";
import { useRouter } from "vue-router";
import useStore from "@/store";

const username = ref("");
const password = ref("");
const router = useRouter();

const { useUserStore } = useStore();
const { fetchAndUpdateUser } = useUserStore();
const handleLogin = () => {
  const error = checkParam(username.value, password.value) as string;
  if (error) {
    Message.error(error);
  } else {
    Service.userLoginUsingPost({
      userAccount: username.value,
      userPassword: password.value,
    })
      .then(async (res) => {
        console.log(res);
        if (res.code === 200) {
          Notification.info({
            title: "登录成功",
            content: "",
          });
          await fetchAndUpdateUser();
          router.push({ path: "/", replace: true });
        } else {
          Notification.error({
            title: res.message,
            content: "",
          });
        }
      })
      .catch((err) => {
        Message.error(err);
      });
  }
};
</script>

<style lang="less" scoped>
.login-page {
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
