<template>
  <div id="app">
    <h3>用户列表管理</h3>
    <el-button @click="addUserDialog" type="success">添加用户</el-button>
    <table class="table is-bordered is-striped is-narrow is-hoverable">
      <thead>
        <tr>
          <th class="has-text-centered">编号</th>
          <th class="has-text-centered">姓名</th>
          <th class="has-text-centered">电话</th>
          <th class="has-text-centered">地址</th>
          <th colspan="2" class="has-text-centered">编辑</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="(item,index) of userList" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.address}}</td>
        </tr>-->
        <!-- key属性一般是对应的是一个唯一标志符，但是他是系统自动生成的参数，
        从0.....一直到最后。作为这一行的唯一标志符，但是你要执行删除的时候,
        服务器默认从最后一个删除，实际上是删除了这一行，？？？？？ -->
        <row
          v-for="item of userList"
          @delete:id="delUser($event)"
          @updata:user="saveUser"
          :key="item.id"
          :rowData="item"
        ></row>
      </tbody>
    </table>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="60%">
      <h3>想要添加的用户</h3>
      <hr />
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios"; //ajax库
import { Message, MessageBox } from "element-ui";
import Row from "./components/Row";
export default {
  name: "app",
  data() {
    return {
      age: 19,
      userList: [],
      addDialogVisible: false,
      form: {
        id: "",
        name: "",
        phone: "",
        address: ""
      }
    };
  },
  methods: {
    saveUser(e) {
      let objIndex = this.userList.findIndex(item => e.id === item.id);
      this.userList.splice(objIndex, 1, e);
    },
    delUser(id) {
      MessageBox.confirm("是否真的要删除？", "删除提醒")
        .then(() => {
          axios
            .delete("http://localhost:12345/users/" + id)
            .then(res => {
              console.log("res:", res);
              let delIndex = this.userList.findIndex(item => item.id === id);
              if (delIndex >= 0) {
                this.userList.splice(delIndex, 1);
              }
              Message.info("删除成功！");
            })
            .catch(() => {
              Message.info("删除失败！");
            });
        })
        .catch(() => {
          Message.info("删除取消！");
        });
    },
    submitAdd() {
      this.id = Date.now();
      axios
        .post("http://localhost:12345/users/", this.form)
        .then(res => {
          // console.log(this);//这个this指向App组件对象
          // this.$message({//因为message组件内部没提供install方法，所以不能单个引用，只能element全部引用这个方法才能起作用。
          //   message: "添加数据成功",
          //   type: "info"
          // });
          Message.info("添加数据成功"); //这相当于把element框架中的Message组件在这个vue中引用了。可以直接使用
          this.userList.push(res.data);
          this.addDialogVisible = false;
          for (let m of Object.keys(this.form)) {
            this.form[m] = ""; //删除原始内容。
          }
        })
        .catch(() => {
          Message.info("添加数据失败");
          // this.$message({
          //   message: "添加数据成功",
          //   type: "warning"
          // });
        });
    },
    addUserDialog() {
      this.addDialogVisible = true;
    }
  },
  created() {
    axios
      .get("http://localhost:12345/users")
      .then(res => {
        // this.userList=res.data;
        this.userList.push(...res.data);
        // console.log(this.userList);//要想产生变化，json-server要监听才行
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    row: Row
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
