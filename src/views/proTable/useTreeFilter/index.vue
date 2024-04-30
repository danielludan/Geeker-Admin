<template>
  <div class="main-box">
    <TreeFilter label="label" value="value" title="地区选择" :request-api="getAreaGroupTreeSelect" @change="changeTreeFilter" />
    <UserList />
  </div>
</template>

<script setup lang="ts" name="useTreeFilter">
import TreeFilter from "@/components/TreeFilter/index.vue";
import { getAreaGroupTreeSelect } from "@/api/modules/group";
import UserList from "@/views/proTable/components/UserList.vue";

const changeTreeFilter = (val: string[]) => {
  console.log("changeTreeFilter:" + val);
};
</script>
