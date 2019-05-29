//图书管理处后台图书管理展示
<template>
<div>
  <a-button type="primary" ghost class="editable-add-btn" @click="handleAdd"><a-icon type="plus" /> 添加</a-button>
  <a-table :columns="columns" :dataSource="dataSource">
    <!-- <template slot="name" slot-scope="text, record">
      <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
    </template> -->
    <template v-for="col in ['idnumber','name','tags','buydate','buynum','havenum','remark']" :slot="col" slot-scope="text, record">
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/> -->
        <div :key="col">
            <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{text}}</template>
        </div>
    </template>
    <template slot="operation" slot-scope="text, record">
        <div class='editable-row-operations'>
            <span v-if="record.editable">
                <a @click="() => save(record.key)">保存</a>
                <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
                    <a>取消</a>
                </a-popconfirm>
            </span>
            <span v-else>
                <a @click="() => edit(record.key)">编辑</a>
            </span>
        </div>
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
    </template>
    <a-table
      slot="expandedRowRender"
      :columns="innerColumns"
      :dataSource="innerData"
      :pagination="true"
    >
      <span slot="status" >
        <a-badge status="success" />Finished
      </span>
      <span slot="operation"  class="table-operation">
        <a href="javascript:;">Pause</a>
        <a href="javascript:;">Stop</a>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item>
              Action 1
            </a-menu-item>
            <a-menu-item>
              Action 2
            </a-menu-item>
          </a-menu>
          <a href="javascript:;">
            More <a-icon type="down" />
          </a>
        </a-dropdown>
      </span>
    </a-table>
  </a-table>
</div>
</template>
<script>
// import EditableCell from './EditableCell'
const columns = [
  { title: '编号', dataIndex: 'idnumber', key: 'idnumber' },
  { title: '书籍名称', dataIndex: 'name', key: 'name', scopedSlots: { customRender: 'name' },},
  { title: '类别', dataIndex: 'tags', key: 'tags' },
  { title: '购书时间', dataIndex: 'buydate', key: 'buydate' },
  { title: '购入数量', dataIndex: 'buynum', key: 'buynum' },
  { title: '库存数量', dataIndex: 'havenum', key: 'havenum' },
  { title: '备注', dataIndex: 'remark', key: 'remark' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } },
];

const dataSource = [{
          key:'0',
          idnumber:'0000001',
          name:'《朝花夕拾》',
          tags:['文学'],
          buydate:'2015.12.35',
          buynum:'25',
          havenum:'25',
          remark:'',
      },{
          key:'1',
          idnumber:'0000001',
          name:'《朝花夕拾》',
          tags:['文学'],
          buydate:'2015.12.35',
          buynum:'25',
          havenum:'25',
          remark:'',
      }

];
// for (let i = 0; i < 3; ++i) {
//   data.push({
//     key: i,
//     name: 'Screem',
//     platform: 'iOS',
//     version: '10.3.4.5654',
//     upgradeNum: 500,
//     creator: 'Jack',
//     createdAt: '2014-12-24 23:12:00',
//   });
// }

const innerColumns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', key: 'state', scopedSlots: { customRender: 'status' } },
  { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const innerData = [];
for (let i = 0; i < 2; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: 'This is production name',
    upgradeNum: 'Upgraded: 56',
  });
}

export default {
  data() {
    return {
      dataSource,
      columns,
      innerColumns,
      innerData,
    }
  },
//   components: {
//     EditableCell,
//   },
  methods:{
      handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
    },
    // onCellChange (key, dataIndex, value) {
    //     const dataSource = [...this.dataSource]
    //     const target = dataSource.find(item => item.key === key)
    //     if (target) {
    //       target[dataIndex] = value
    //       this.dataSource = dataSource
    //     }
    // },
    handleAdd () {
      const { count, dataSource } = this
      const newData = {
        key: count,
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
    },
    edit (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.dataSource = newData
      }
    },
    save (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.dataSource = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.dataSource = newData
      }
    },
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
  },
}
</script>

<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
  /* float: left; */
  right: 2px;
  left: -585px;
}
</style>
