<template>
  <el-dialog title="编辑用户" :visible.sync="editVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="datainfo" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="datainfo.username" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="小组" prop="dept_id">
        <el-select v-model="datainfo.dept_id" placeholder="请选择小组" clearable style="width: 300px">
          <el-option v-for="(item,index) in deptList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="datainfo.mobile" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="mobile">
        <el-input v-model="datainfo.email" placeholder="请输入邮箱"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="datainfo.password" placeholder="请输入密码"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">
        取消
      </el-button>
      <el-button type="primary" @click="updateData()">
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
      }
    },
    computed: {
      ...mapState({
        editVisible: state => state.user.editVisible,
        datainfo: state => state.user.datainfo,
        deptList: state => state.area.deptList
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("user/SET_EDITVISIBLE", false);
      },
      updateData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {

            this.$store.dispatch("user/updateUser", that.datainfo).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '编辑用户成功',
                  type: 'success',
                  duration: 2000
                });
                that.$store.commit("user/RESET_LISTQUERY");
                that.$store.dispatch("user/getUserList");
              } else {
                that.$notify({
                  title: '编辑用户失败',
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
