<template>
    <a-table :columns="columns" :dataSource="dataSource" class="components-table-demo-nested">
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
const columns=[
    {
        title:'学号',
        dataIndex:'username',
        key:'username',
        scopedSlots: {filterDropdown: 'filterDropdown',filterIcon: 'filterIcon',customRender: 'customRender',},
        onFilter: (value, record) => record.username.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => {
                    this.searchInput.focus()
                },0)
            }
        }, 
    }, {
        title:'学生姓名',
        dataIndex:'name',
        key:'name',
        scopedSlots: {filterDropdown: 'filterDropdown',filterIcon: 'filterIcon',customRender: 'customRender',},
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => {
                    this.searchInput.focus()
                },0)
            }
        }, 
    }, {
        title:'组织关系转寄地址',
        dataIndex:'orRelationship',
        key:'orRelationship',
        scopedSlots: {filterDropdown: 'filterDropdown',filterIcon: 'filterIcon',customRender: 'customRender',},
        onFilter: (value, record) => record.orRelationship.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => {
                    this.searchInput.focus()
                },0)
            }
        }, 
    }
]
export default {
    data(){
        return{
            columns,
            dataSource:[],
            searchText: '',
            searchInput: null,
        }
    },
    beforeCreate(){
        this.$ajax.get("/api/admin/stu/relation")
        .then((response,data,content) =>{
            console.log(response.data.content);
            this.dataSource = response.data.content;
        })
    },
    methods:{
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    }
}
</script>

<style>
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
