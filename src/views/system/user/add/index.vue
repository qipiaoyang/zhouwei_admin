<template>
  <el-dialog title="新增用户" :visible.sync="addVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="formObj" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="formObj.username" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formObj.password" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formObj.mobile" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="mobile">
        <el-input v-model="formObj.email" placeholder="请输入邮箱"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">
        取消
      </el-button>
      <el-button type="primary" @click="createData()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "index.vue",
    data() {
      return {
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        formObj: {
          username: "",
          password: "",
          mobile: "",
          email: "",
        }
      }
    },
    computed: {
      ...mapState({
        addVisible: state => state.user.addVisible,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("user/SET_ADDVISIBLE", false);
      },
      createData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            this.$store.dispatch("user/createUser", this.formObj).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '添加用户成功',
                  type: 'success',
                  duration: 2000
                });
                that.formObj = {
                  username: "",
                    password: "",
                    mobile: "",
                    email: "",
                };
                that.$store.commit("user/RESET_LISTQUERY");
                that.$store.dispatch("user/getUserList");
              } else {
                that.$notify({
                  title: '添加用户失败',
                  message: e.data.errmsg,
                  type: 'fail',
                  duration: 2000
                });
              }
            });
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
