<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="用户头像" prop="profile.avatar">
        <UploadImg v-model:image-url="drawerProps.row!.profile!.avatar" width="135px" height="135px" :file-size="3">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传头像</span>
          </template>
          <template #tip> 头像大小不能超过 3M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="用户姓名" prop="username">
        <el-input v-model="drawerProps.row!.username" placeholder="请填写用户姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="drawerProps.row!.password" placeholder="请填写用户密码" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="is_active">
        <el-checkbox v-model="drawerProps.row!.is_active" label="激活" size="large" />
      </el-form-item>
      <el-form-item label="管理员" prop="is_superuser">
        <el-checkbox v-model="drawerProps.row!.is_superuser" label="管理员" size="large" />
      </el-form-item>
      <el-form-item label="员工" prop="is_staff">
        <el-checkbox v-model="drawerProps.row!.is_staff" label="员工" size="large" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="drawerProps.row!.email" placeholder="请填写邮箱" clearable></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="profile.gender">
        <el-select v-model="drawerProps.row!.profile.gender" placeholder="请选择性别" clearable>
          <el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机" prop="profile.phone">
        <el-input v-model="drawerProps.row!.profile.phone" placeholder="请填写手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="居住地址" prop="profile.address">
        <el-input v-model="drawerProps.row!.profile.address" placeholder="请填写居住地址" clearable></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="profile.user_area_group_id">
        <el-tree-select v-model="drawerProps.row!.profile.user_area_group_id" :data="areaGroupData" null="True" />
      </el-form-item>
      <el-form-item label="上一次登录" prop="last_login">
        <el-input v-model="drawerProps.row!.last_login" readonly></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive, onMounted } from "vue";
import { genderType } from "@/utils/dict";
import { ElMessage, FormInstance } from "element-plus";
import { User } from "@/api/interface";
import UploadImg from "@/components/Upload/Img.vue";
import { getAreaGroupTreeSelect } from "@/api/modules/group";

const rules = reactive({
  // avatar: [{ required: true, message: "请上传用户头像" }],
  // photo: [{ required: true, message: "请上传用户照片" }],
  username: [{ required: true, message: "请填写用户姓名" }],
  password: [{ required: true, message: "请填写密码" }],
  // gender: [{ required: true, message: "请选择性别" }],
  // idCard: [{ required: true, message: "请填写身份证号" }],
  email: [{ required: false, message: "请填写邮箱" }]

  // address: [{ required: true, message: "请填写居住地址" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<User.ResUserDetail>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});

// console.log(profile);
// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  // 如果没有row
  if (!params.row.profile) {
    params.row.profile = { avatar: "", gender: null, address: "", phone: "", user_area_group_id: null };
  }
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

const areaGroupData = ref({});

const getUserAreaGroupData = async () => {
  const { data } = await getAreaGroupTreeSelect();
  // Create the empty option object
  const emptyOption = { value: null, label: "无" };

  // Prepend the empty option to the data array
  const updatedData = [emptyOption, ...data];
  areaGroupData.value = updatedData;
};

onMounted(() => {
  // Perform actions after template rendering
  console.log("Template mounted!");

  // Access DOM elements within the template
  console.log(drawerProps.value.row);
  getUserAreaGroupData();
});

defineExpose({
  acceptParams
});
</script>
