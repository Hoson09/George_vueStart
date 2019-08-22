<template>
  <div id="app">
    <h1>用户管理列表页面</h1>
    <table>
      <thead>
        <tr>
          <th>编号</th>
          <th>姓名</th>
          <th>地址</th>
          <th>电话</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>huyi</td>
          <td>beijing</td>
          <td>1234567</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Demo from './components/Demo'
export default {
  name: "app",
  data() {
     return{ age: 19};
  },
  components:{
    'demo':Demo
  }
};
</script>

<style lang="scss">
$red: red;
#app {
  p {
    color: $red;
  }
}
</style>
