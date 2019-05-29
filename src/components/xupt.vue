<template>
  <div class="xupt">
    <a-carousel class='register-img' autoplay>
      <div calss='imgthd'><img class='carimgs' src='../assets/dashu.jpg'></div>
      <div calss='imgthd'><img class='carimgs' src='../assets/xiaoshu.jpg'></div>
      <div calss='imgthd'><img class='carimgs' src='../assets/liqiu.jpg'></div>
      <div calss='imgthd'><img class='carimgs' src='../assets/shuangjiang.jpg'></div>
    </a-carousel>
    <div class="text">
      <p>西安邮电大学是一所以工为主，以信息科学技术为特色，工、管、理、经、文、法、艺多学科协调发展的普通高等学校，是我国特别是西北地区信息产业高级专门人才培养的重要基地。</p>
      <a-divider></a-divider>
      <p>学校始创于新中国成立初期，前身是 1950 年成立的陕西和甘肃两省邮电人员训练班及随后的西安邮电学校。1959 年经国务院批准设立西安邮电学院，是国家在西北地区布局的唯一邮电通信类普通高校。2012 年 3 月，经教育部批准学校更名为西安邮电大学。学校先后隶属于邮电部和信息产业部，2000 年划转到陕西省，由陕西省与工业和信息化部共建。</p>
      <a-divider></a-divider>
      <p>学校是陕西高水平大学建设高校、教育部 “卓越工程师教育培养计划” 实施高校、中国人民解放军后备军官选拔培养基地、全国首批试办边防军人子女预科班的高校、西北地区唯一承担亚太电信组织和东盟培训任务的高校。被教育部授予 “2017 年度全国创新创业典型经验高校” 称号，被中共陕西省委、陕西省人民政府授予陕西省 “先进集体”、陕西省“高等学校思想政治教育先进集体”、陕西省“文明校园” 称号，被省教育厅授予 “依法治校示范校” 称号，被西安市人民政府授予 “园林式单位” 称号。校党委被中共陕西省委授予 “全省先进基层党组织” 称号，被省委高教工委授予 “陕西高等学校先进基层党委” 称号。</p>
      <a-divider></a-divider>
      <p>学校坐落在西安市南郊文化区，占地 1500 余亩，设有长安、雁塔两个校区，现有在校学生 18000 余人。教学科研仪器设备总值 2.84 亿元，图书馆藏书 167 余万册。设有研究生院、通信与信息工程学院、电子工程学院、计算机学院、自动化学院、经济与管理学院、现代邮政学院（物流学院）、理学院、马克思主义学院、人文社科学院、外国语学院、数字艺术学院、继续教育学院、职业技术学院、体育部、物联网与两化融合研究院、国防教育学院、国际教育学院等 18 个教学科研单位。建有国家级工程实验室、国家级实验教学示范中心、国家级工程实践教育中心、国家级大学生校外实践教育基地各 1 个以及 20 个省部级实验室和研究中心。2016 年 7 月，陕西省人民政府、国家邮政局签约，共建西安邮电大学现代邮政学院、邮政研究院。学校现有 46 个本科专业、12 个硕士学位授权一级学科，4 个硕士专业学位授权类别，6 个省部级重点学科，3 个国家级特色专业和国家级专业综合改革试点。</p>
      <a-divider></a-divider>
      <p>学校现有教职工 1560 余人, 具有高级职称者 560 余人。教师队伍中有国家有突出贡献中青年专家、教育部新世纪优秀人才支持计划人选、陕西省三五人才工程人选、陕西省青年科技新星、二三级教授、全国优秀教师、省级教学名师等人才项目和荣誉获得者 60 余人次。有双聘院士 6 人，客座教授 130 余人。学校不断深化教育教学改革，提升人才培养质量。截至 2018 年 11 月，获批国家级教学立项项目 11 项，省级教改立项 37 项，获国家级教学成果二等奖 1 项、省级教学成果奖 38 项，省级教学名师 14 人。拥有国家级教学团队 1 个和省级教学团队 13 个。</p>
      <a-divider></a-divider>
    </div>
  </div>
</template>


<script>
export default {
  name: "xupt",
  data() {
    return {};
  }
};
</script>

<style>
.xupt{
    width: 100%;
}
.register-img {

  width: 100%;
  height: 150px;
  background-color: aliceblue;
}
.register-img .ant-carousel .slick-slider {
  width: 100%;
  height: 100%;
}
.imgthd {
  width: 100%;
  height: 150px;
}
.carimgs {
  width: 100%;
  height: 170px;
}
@media screen and (min-width: 800px){
  .xupt{
    width: 70%;
    margin-left: 8%;
}
.register-img{
height: 200px;;
}
.carimgs {
  width: 100%;
  height: 230px;
}
}
</style>

