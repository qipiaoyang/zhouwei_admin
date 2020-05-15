<template>
  <div class="home-container">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="formObj"
      label-position="left"
      label-width="100px"
      style="width: 400px; margin-left:50px;"
    >
      <el-form-item label="地址信息" prop="address">
        <el-cascader
          :options="options"
          :props="props"
          v-model="formObj.address"
          style="width: 400px;"
          @change="addressChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="乡镇" prop="town">
        <el-select v-model="formObj.town" placeholder="请选择乡镇" clearable style="width: 400px">
          <el-option v-for="(item,index) in townList" :key="index" :label="item.label" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address_desc">
        <el-input v-model="formObj.address_desc" placeholder="请输入详细地址" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="收货人姓名" prop="name">
        <el-input v-model="formObj.name" placeholder="请输入姓名" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="formObj.mobile" placeholder="请输入手机号码" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input v-model="formObj.desc" placeholder="请输入备注" style="width: 400px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取消</el-button>
      <el-button type="primary" @click="createData()">确认</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["name"]),
    ...mapState({
      admin_id: state => state.app.admin_id,
      dept_id: state => state.app.dept_id,
      options: state => state.area.tree,
      townList: state => state.area.townList
    })
  },
  created() {
    this.$store.dispatch("area/getAreaTree", 0);
  },
  data() {
    return {
      rules: {
        address: [
          { required: true, message: "请输入地址信息", trigger: "blur" }
        ],
        address_desc: [
          { required: true, message: "请输入地址详细信息", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // town: [{ required: true, message: "请输入乡镇", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      },
      formObj: {
        address: [],
        address_desc: "",
        mobile: "",
        name: "",
        town: "",
        desc: ""
      },
      props: {
        value: 'id',
        children: 'children'
      }
    };
  },
  methods: {
    addressChange(e) {
      this.formObj.town = "";
      this.$store.dispatch("area/getTownList", { pid: e[2] })
    },
    createData() {
      let that = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          that.formObj.admin_id = that.admin_id;
          that.formObj.dept_id = that.dept_id;
          this.$store
            .dispatch("address/createAddress", this.formObj)
            .then(e => {
              if (e.success) {
                that.$notify({
                  title: "添加订单成功",
                  type: "success",
                  duration: 2000
                });
                that.formObj = {
                  address: [],
                  address_desc: "",
                  mobile: "",
                  name: "",
                  town: "",
                  desc: ""
                };
              } else {
                that.$notify({
                  title: "添加订单失败",
                  message: e.data.errmsg,
                  type: "fail",
                  duration: 2000
                });
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
