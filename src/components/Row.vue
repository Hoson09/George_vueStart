<template>
  <tr class="row">
    <!-- <td>{{item.id}}</td>
    <td>{{item.name}}</td>
    <td>{{item.phone}}</td>
    <td>{{item.address}}</td>-->
    <template v-if="isEdit">
      <td v-for="(item, index) of userObj" :key="index">
        <template v-if="index === 'id'">{{ item }}</template>
        <template v-else>
          <input type="text" v-model="userObj[index]" />
        </template>
      </td>
      <td>
        <a @click="cancel" href="javascript:">取消</a>
      </td>
      <td>
        <a @click="saveUser" href="javascript:">保存</a>
      </td>
    </template>
    <template v-else>
      <td v-for="(item, index) of userObj" :key="index">{{ item }}</td>
      <td>
        <a @click="delUser" href="javascript:">删除</a>
      </td>
      <td>
        <a @click="isEdit = true" href="javascript:">编辑</a>
      </td>
    </template>
  </tr>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  name: "row",
  props: ["rowData"], //属性不要进行修改
  data() {
    return {
      isEdit: false,
      // userObj: {...this.rowData},
      userObj: Object.assign({}, this.rowData) //这两个方法是一样的效果。应该要深拷贝一个对象，要不对象的内容会相互影响对方。
    };
  },
  methods: {
    cancel() {
      this.isEdit = false;
      this.userObj = Object.assign(this.userObj, this.rowData);
    },
    delUser() {
      this.$emit("delete:id", this.rowData.id); //向父级组件触发了一个名字叫 delete:id 事件
    },
    saveUser() {
      // console.log(this.userObj);
      axios
        .put(`http://localhost:12345/users/${this.rowData.id}`, this.userObj)
        .then(() => {
          this.$emit("updata:user", { ...this.userObj });
          this.isEdit = false;
          Message.success("保存成功!");
        })
        .catch(() => {
          Message.error("保存失败");
        });
    }
  }
};
</script>

<style></style>
