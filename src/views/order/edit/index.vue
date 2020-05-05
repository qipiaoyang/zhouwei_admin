<template>
  <el-dialog title="编辑角色" :visible.sync="editVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="datainfo" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="角色名" prop="desc">
        <el-input v-model="datainfo.role_name" placeholder="请输入角色名"/>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="datainfo.role_desc" placeholder="请输入描述"/>
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
        editVisible: state => state.order.editVisible,
        datainfo: state => state.order.datainfo,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("order/SET_EDITVISIBLE", false);
      },
      updateData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            this.$store.dispatch("order/updateAuthRole", that.datainfo).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '编辑角色成功',
                  type: 'success',
                  duration: 2000
                });
                that.$store.commit("order/RESET_LISTQUERY");
                that.$store.dispatch("order/getAuthRoleList");
              } else {
                that.$notify({
                  title: '编辑角色失败',
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
