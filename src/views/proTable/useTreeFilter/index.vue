<template>
  <div class="main-box">
    <TreeFilter title="地区选择" :request-api="getAreaGroupTreeSelect" @change="changeTreeFilter" />
    <UserList ref="userListRef" />
  </div>
</template>

<script setup lang="ts" name="useTreeFilter">
import { ref, onMounted } from "vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { getAreaGroupTreeSelect } from "@/api/modules/group";
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
  initParam.user_area_group_id = val;
};
</script>
