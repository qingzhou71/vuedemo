//离校管理子组件
<template>
  <div class="gracenter">
    <a-collapse accordion :bordered="false" :activeKey='activeKey' @change='changekey'>
        <a-collapse-panel key="1" :showArrow="false" :style="customStyle" >
            <template slot="header">
                毕业生离校管理系统
            </template><br/>
            <a-card title="注意事项">
                <granotice></granotice>
            </a-card>
        </a-collapse-panel>
        <a-collapse-panel key="2" :showArrow="false" :style="customStyle" :disabled='kejidisabled'>
            <template slot="header">
                科技立项部
            </template><br/>
            <a-card title="科技立项成果记录">
            <techlist></techlist>
            <!-- <a-button type="primary" block ghost @click='techsure'>确认</a-button> -->
            <a-popconfirm title="是否确认提交？一旦提交无法更改。" okText="确认" cancelText="取消" @confirm="techsure">
                <a>确认</a>
            </a-popconfirm>
            </a-card>
        </a-collapse-panel>
        <a-collapse-panel key="3" :showArrow="false" :style="customStyle" :disabled='tushudisabled'>
            <template slot="header">
                图书管理处
            </template><br/>
            <a-card title="图书借还记录">
            <booklist></booklist>
            <!-- <a-button type="primary" block ghost @click="booksure">确认</a-button> -->
            <a-popconfirm title="是否确认提交？一旦提交无法更改。" okText="确认" cancelText="取消" @confirm="booksure">
                <a>确认</a>
            </a-popconfirm>
            </a-card>
        </a-collapse-panel>
        <a-collapse-panel key="4" :showArrow="false" :style="customStyle" :disabled='guanxidisabled'>
            <template slot="header">
                组织关系管理
            </template>
            <a-card title="政治面貌">
            <relative></relative>
            <!-- <a-button type="primary" block ghost @click="relativesure">确认</a-button> -->
            <a-popconfirm title="是否确认提交？一旦提交无法更改。" okText="确认" cancelText="取消" @confirm="relativesure">
                <a>确认</a>
            </a-popconfirm>
            </a-card>
        </a-collapse-panel>
        <a-collapse-panel key="5" :showArrow="false" :style="customStyle" :disabled='hujidisabled'>
            <template slot="header">
                保卫处
            </template>
            <a-card title="户籍迁移情况">
            <hujilist></hujilist>
            <!-- <a-button type="primary" block ghost @click="censussure">确认</a-button> -->
            <a-popconfirm title="是否确认提交？一旦提交无法更改。" okText="确认" cancelText="取消" @confirm="censussure">
                <a>确认</a>
            </a-popconfirm>
            </a-card>
        </a-collapse-panel>
        <a-collapse-panel key="6" :showArrow="false" :style="customStyle" :disabled='leavedisabled'>
            <template slot="header">
                就业指导中心
            </template>
            <a-card title="毕业去向">
            <leavelist></leavelist><br/>
            <!-- <a-button type="primary" block ghost @click="leavesure">确认</a-button> -->
            <a-popconfirm title="是否确认提交？一旦提交无法更改。" okText="确认" cancelText="取消" @confirm="leavesure">
                <a>确认</a>
            </a-popconfirm>
            </a-card>
        </a-collapse-panel>
        <a-collapse-panel key="7" :showArrow="false" :style="customStyle" :disabled='moneydisabled'>
            <template slot="header">
                财务处
            </template>
            <a-card title="缴费记录">
            <moneylist></moneylist>
            <!-- <a-button type="primary" block ghost @click="moneysure">确认</a-button> -->
            <a-popconfirm title="是否确认提交？一旦提交无法更改。" okText="确认" cancelText="取消" @confirm="moneysure">
                <a>确认</a>
            </a-popconfirm>
            </a-card>
        </a-collapse-panel>
        <a-collapse-panel key="8" :showArrow="false" :style="customStyle" :disabled='sushedisabled'>
            <template slot="header">
                宿舍管理处
            </template>
            <a-card title="离宿记录">
            <sushelist></sushelist>
            <!-- <a-button type="primary" block ghost @click="sushesure">确认</a-button> -->
            <a-popconfirm title="是否确认提交？一旦提交无法更改。" okText="确认" cancelText="取消" @confirm="sushesure">
                <a>确认</a>
            </a-popconfirm>
            </a-card>
        </a-collapse-panel>
        <a-collapse-panel key="9" :showArrow="false" :style="customStyle" :disabled='carddisabled'>
            <template slot="header">
                卡务中心
            </template>
            <cardform></cardform>
            <!-- <a-button type="primary" block ghost @click="cardsure">确认</a-button> -->
            <a-popconfirm title="是否确认提交？一旦提交无法更改。" okText="确认" cancelText="取消" @confirm="cardsure">
                <a>确认</a>
            </a-popconfirm>
        </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import techlist from "@/components/techlist";
import booklist from "@/components/booklist";
import granotice from "@/components/granotice";
import hujilist from "@/components/hujilist";
import leavelist from "@/components/leavelist";
import moneylist from "@/components/moneylist";
import sushelist from "@/components/sushelist";
import cardform from "@/components/cardform";
import relative from "@/components/relative";
  export default {
    data () {
      return {
        text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
        customStyle: 'background: #F8F8FF;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden;text-align: center',
        kejidisabled:localStorage.getItem('kejidisabled'),
        tushudisabled:localStorage.getItem('tushudisabled'),
        guanxidisabled:localStorage.getItem('guanxidisabled'),
        hujidisabled:localStorage.getItem('hujidisabled'),
        leavedisabled:localStorage.getItem('leavedisabled'),
        moneydisabled:localStorage.getItem('moneydisabled'),
        sushedisabled:localStorage.getItem('sushedisabled'),
        carddisabled:localStorage.getItem('carddisabled'), 
        activeKey:"1",
      }
    },
    // beforeMount(){
    //     console.log(this.sushedisabled);
    //     console.log(!!this.kejidisabled)
    // },
    methods:{
        callback (key) {
            console.log(key)
        },
        techsure(){
            this.kejidisabled=true;
            // console.log(this.kejidisabled);
            localStorage.setItem('kejidisabled',true);
            console.log(localStorage.getItem('kejidisabled'))
        },
        booksure(){
            this.tushudisabled=true;
            localStorage.setItem('tushudisabled',true);
            console.log(localStorage.getItem('tushudisabled'))
        },
        relativesure(){
            this.guanxidisabled=true;
            localStorage.setItem('guanxidisabled',true);
            console.log(localStorage.getItem('guanxidisabled'))
        },
        censussure(){
            this.hujidisabled=true;
            localStorage.setItem('hujidisabled',true);
            console.log(localStorage.getItem('hujidisabled'))
        },
        leavesure(){
            this.leavedisabled=true;
            localStorage.setItem('leavedisabled',true);
            console.log(localStorage.getItem('leavedisabled'))
        },
        moneysure(){
            this.moneydisabled=true;
            localStorage.setItem('moneydisabled',true);
            console.log(localStorage.getItem('moneydisabled'))
        },
        sushesure(){
            this.sushedisabled=true;
            localStorage.setItem('sushedisabled',true);
            console.log(localStorage.getItem('sushedisabled'))
        },
        cardsure(){
            this.carddisabled=true;
            localStorage.setItem('carddisabled',true);
            console.log(localStorage.getItem('carddisabled'))
        }
        // changekey(key){
        //     console.log(key)
        // }
    },
    components:{techlist,booklist,granotice,hujilist,leavelist,moneylist,sushelist,cardform,relative},
  }
</script>

<style>
.gracenter{
    height: auto;
    width: 100%;
    background-color:white;
}
</style>
