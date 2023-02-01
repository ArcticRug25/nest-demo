<script setup lang="ts">
import { ref } from 'vue'

const lists = ref([])
const tmpItem = ref({})
// 控制模态框
const openModal = () => {

}
</script>

<template>
  <div>
    <div class="mb-3">
      <button type="button" class="btn btn-primary px-3" @click="openModal()">
        <i class="fas fa-plus" />新增
      </button>
    </div>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            用户名
          </th>
          <th scope="col">
            角色
          </th>
          <th scope="col">
            性别
          </th>
          <th scope="col">
            头像
          </th>
          <th scope="col">
            地址
          </th>
          <th scope="col">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="(item, index) in lists" :key="item.id">
          <th scope="row">
            {{ index + 1 }}
          </th>
          <td>{{ item.username }}</td>
          <td>{{ item.roles.map(o => o.name).join(',') }}</td>
          <td>{{ item.profile && item.profile.gender }}</td>
          <td>{{ item.profile && item.profile.photo }}</td>
          <td>{{ item.profile && item.profile.address }}</td>
          <td>
            <button type="button" class="btn btn-secondary px-3" @click="openModal()">
              <i class="far fa-edit me-2" />编辑
            </button>
            <button type="button" class="btn btn-danger px-3 ms-3" @click="openModal()">
              <i class="far fa-trash-alt me-2" />删除
            </button>
          </td>
        </tr> -->
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">Previous</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>

    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#DeleteModal">
      Launch demo modal
    </button> -->

    <!-- <DeleteModal v-model:show="deleteShow" @delete="deleteSubmit" />
    <EditAddModal v-model:show="editShow" :schema="formSchema" :msg="msg" @submit="editSubmit" /> -->
  </div>
</template>

<style scoped>
</style>
