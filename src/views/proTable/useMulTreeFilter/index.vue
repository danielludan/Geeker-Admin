<template>
  <div class="main-box">
    <TreeFilter title="地区选择" :request-api="getDeptGroupTreeSelect" @change="changeTreeFilter" multiple="true" />
    <UserList ref="userListRef" />
  </div>
</template>

<script setup lang="ts" name="useMulTreeFilter">
import { ref, onMounted } from "vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { getDeptGroupTreeSelect } from "@/api/modules/group";
import UserList from "@/views/proTable/components/UserList.vue";

const userListRef = ref(null);
let initParam: any;
let proTable: any;

onMounted(async () => {
  // 在这里确保组件已挂载
  if (userListRef.value) {
    ({ initParam, proTable } = userListRef.value!);
    console.log("initParam:", initParam);
    console.log("proTable:", proTable);
  }
});

const changeTreeFilter = (val: string[]) => {
  console.log("changeTreeFilter:" + val);
  proTable!.pageable.pageNum = 1;
  initParam.dept_app_group_ids = val;
};
</script>
