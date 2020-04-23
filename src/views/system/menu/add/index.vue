<template>
  <el-dialog title="新增角色" :visible.sync="addVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="formObj" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="formObj.title" placeholder="请输入菜单名称"/>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parent_id">
        <el-select v-model="formObj.parent_id" placeholder="请选择上级菜单" style="width:300px;">
          <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.title" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="前端名称" prop="name">
        <el-input v-model="formObj.name" placeholder="请输入前端名称"/>
      </el-form-item>
      <el-form-item label="前端图标" prop="icon">
        <el-input v-model="formObj.icon" placeholder="请输入前端图标"/>
      </el-form-item>
      <el-form-item label="排序" prop="level">
        <el-input v-model="formObj.sort" placeholder="请输入排序"/>
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-radio-group v-model="formObj.hidden">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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
          title: "",
          parent_id: 0,
          name: "",
          icon: "",
          sort: 0,
          hidden: 0
        }
      }
    },
    computed: {
      ...mapState({
        addVisible: state => state.menu.addVisible,
        parentOptions: state => state.menu.parentOptions,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("menu/SET_ADDVISIBLE", false);
      },
      createData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            this.$store.dispatch("menu/createMenu", this.formObj).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '添加用户成功',
                  type: 'success',
                  duration: 2000
                });
                that.formObj = {
                  title: "",
                  parent_id: 0,
                  name: "",
                  icon: "",
                  sort: 0,
                  hidden: 0
                };
                that.$store.commit("menu/RESET_LISTQUERY");
                that.$store.dispatch("menu/getMenuList");
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
