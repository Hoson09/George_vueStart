<template>
  <div class="demo">
    <h3>{{name}}</h3>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      name: "huyi"
    };
  }
};
</script>

<style lang="scss" scoped>
.demo {
  h3 {
    font-size: 20px;
    color: green;
  }
}
</style>