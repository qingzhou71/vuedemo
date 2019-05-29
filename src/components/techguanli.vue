<template>
  <a-table :columns="columns" :dataSource="dataSource" class="components-table-demo-nested" :scroll="{ x: 1600 }">
    <!-- <a slot="operation"  href="javascript:;">Publish</a> -->
     <template slot="fileIds" slot-scope="text">
      <a href="javascript:;">{{text}}</a>
    </template>
    <template slot="operation">
      <a-popconfirm
        v-if="dataSource.length"
        okText='确认'
        cancelText='取消'
        title="确定删除？"
        @confirm="onDelete">
        <a href="javascript:;">删除</a>
      </a-popconfirm>
    </template>
    <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>
      <a-input
        v-ant-ref="c => searchInput = c"
        :placeholder="`按${column.title}查找`"
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
        style="width: 188px; margin-bottom: 8px; display: block;"
      />
      <a-button
        type='primary'
        @click="() => handleSearch(selectedKeys, confirm)"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
      >查找</a-button>
      <a-button
        @click="() => handleReset(clearFilters)"
        size="small"
        style="width: 90px"
      >重置</a-button>
    </div>
    <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />
    <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
    </template>
  </a-table>
</template>
<script>
const columns = [
  { title: '学号', 
    width:100, 
    dataIndex: 'username', 
    key: 'username',
    fixed:'left',
    scopedSlots: {filterDropdown: 'filterDropdown',filterIcon: 'filterIcon',customRender: 'customRender',},
    onFilter: (value, record) => record.username.toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        },0)
      }
    }, 
  },
  { title: '学生姓名', width:100, dataIndex: 'name', key: 'name',fixed:'left' },
  { title: '成果名称', 
    width:300, 
    dataIndex: 'technologicalAchievements', 
    key: 'technologicalAchievements' ,
    fixed:'left',
    scopedSlots: {filterDropdown: 'filterDropdown',filterIcon: 'filterIcon',customRender: 'customRender',},
    onFilter: (value, record) => record.technologicalAchievements.toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        },0)
      }
    }, 
  },
  { title: '成果编号', width:100, dataIndex: 'id', key: 'id' },
  { title: '获奖时间', width:100, dataIndex: 'awardTime', key: 'awardTime' },
  { title: '颁发单位', width:100, dataIndex: 'issuingOrganization ', key: 'issuingOrganization ' },
  { title: '文件', dataIndex: 'fileIds', key: 'fileIds',scopedSlots: { customRender: 'fileIds' } },
  { title: '操作', width:100, key: 'operation', scopedSlots: { customRender: 'operation' } ,fixed:'right'},
];
import axios from 'axios'
export default {
  data() {
    return {
      dataSource:[],
      columns,
      id:"",
      searchText: '',
      searchInput: null,
      enable:true,
      name:"",
      username:"",
    }
  },
  beforeCreate(){
    axios.get("/api/admin/stu/tec")
    .then((response,data,content) => {
      this.dataSource = response.data.content;
      console.log(this.dataSource);
      response.data.content.map(item => {
        this.id = item.id;
        this.username = item.username;
        this.enable = item.enable;
        console.log(this.username)
        console.log(this.id);
      });
    });
  },
  methods:{
    onDelete (id) {
        axios.delete('/api/admin/stu/tec/'+this.id, 
        {
          headers: {"Content-Type": "application/json","X-Merchant": "53cdd6f50cf261fadf0dd74c"}
        })
        .then((response) => {
          this.enable = false;
          console.log(response);  
        }).catch((error) => {
          console.log(error);
        });
        
    },
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
  },
}
</script>
<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
