<template>
  <div class="not-auth1">
    <div class="container">
      <div class="content">
        <h1>Oops....</h1>
        <!--这里需要做成动态的-->
        <p>Not auth</p>
        <button @click="goBack">
          <icon-left />
          Go Back
        </button>
      </div>
      <div class="image">
        <img alt="403 Forbidden" src="@/assets/error.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.not-auth {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  //background-color: #fff;
  //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  font-size: 3rem;
  color: #333;
  margin: 0;
}

p {
  font-size: 1.5rem;
  color: #666;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #165dff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

//button:hover {
//  background-color: #165dff;
//}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image img {
  max-width: 100%;
  height: auto;
}
</style>
