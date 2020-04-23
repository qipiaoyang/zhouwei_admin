<template>
  <el-dialog title="编辑角色" :visible.sync="editVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="datainfo" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="datainfo.title" placeholder="请输入菜单名称"/>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parent_id">
        <el-select v-model="datainfo.parent_id" placeholder="请选择上级菜单" style="width:300px;">
          <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.title" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="前端名称" prop="name">
        <el-input v-model="datainfo.name" placeholder="请输入前端名称"/>
      </el-form-item>
      <el-form-item label="前端图标" prop="icon">
        <el-input v-model="datainfo.icon" placeholder="请输入前端图标"/>
      </el-form-item>
      <el-form-item label="排序" prop="level">
        <el-input v-model="datainfo.sort" placeholder="请输入排序"/>
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-radio-group v-model="datainfo.hidden">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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
        editVisible: state => state.menu.editVisible,
        datainfo: state => state.menu.datainfo,
        parentOptions: state => state.menu.parentOptions,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("menu/SET_EDITVISIBLE", false);
      },
      updateData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            this.$store.dispatch("menu/updateMenu", that.datainfo).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '编辑角色成功',
                  type: 'success',
                  duration: 2000
                });
                that.$store.commit("menu/RESET_LISTQUERY");
                that.$store.dispatch("menu/getMenuList");
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
