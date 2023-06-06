<template>
  <div class="page-container">
    <div class="page-bg"></div>
    <div class="page-wrapper">
      <div class="banner-wrapper">
        <div class="content-section">
          <div class="title">行业案例</div>
          <div class="content">
            行业解决方案完全基于UWDP低代码平台进行设计、开发，平台提供了安全、可靠、稳定的运行环境，为您的业务保驾护航。
          </div>
        </div>
      </div>
      <div class="solution-wrapper">
        <CategorySearch :data="menuList" @change-company="handleChangeCategory" @search="handleSearch" />
        <div class="solution-list-section">
          <div v-for="item in caseList" :key="item.id" class="box">
            <img class="img" :src="item.img" />
            <div class="title">{{ item.title }}</div>
            <div class="content">
              {{ item.content }}
            </div>
            <div class="company">
              <img class="logo" :src="item.logo" />
              {{ item.company }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import photo from '@/assets/images/case/case.png';
import logo from '@/assets/images/solution/logo.ico';
import CategorySearch from './CategorySearch.vue';

const menuList = [
  {
    key: '0',
    label: '全部',
  },
  {
    key: '1',
    label: '政务',
  },
  {
    key: '2',
    label: '医疗',
  },
  {
    key: '3',
    label: '教育',
  },
  {
    key: '4',
    label: '餐饮',
  },
  {
    key: '5',
    label: '制造业',
  },
];

const caseList = [
  {
    id: 1,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
  {
    id: 2,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
  {
    id: 3,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
  {
    id: 4,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
  {
    id: 5,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
  {
    id: 6,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
  {
    id: 7,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
  {
    id: 8,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
  {
    id: 9,
    img: photo,
    logo,
    company: '这里是公司Logo及名称',
    title: '阿里云-云采销SRM',
    content: '这里的该业务的详情信息,最多可显示两行,如有更多字段在第二行最后显示“…”,点击改模块可查看详情',
  },
];

const handleChangeCategory = (key: string) => {
  console.log(key);
};

const handleSearch = (message: string) => {
  console.log(message);
};
</script>

<style lang="scss" scoped>
.page-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fbfbfd;

  .page-bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 1080px;
    background-image: url(@/assets/images/solution/page-bg.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .page-wrapper {
    position: relative;
    z-index: 1;

    .banner-wrapper {
      width: 100%;

      .content-section {
        margin: 0 auto;
        padding-top: 60px;
        width: 1200px;
        text-align: center;

        .title {
          padding: 0;
          margin-bottom: 20px;
          font-size: 40px;
          font-weight: 600;
          line-height: 56px;
          letter-spacing: 2px;
          background: linear-gradient(360deg, #0081ff 0%, #a067ff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .content {
          width: 600px;
          margin: 0 auto;
          font-size: 16px;
          color: #000000;
          line-height: 24px;
        }
      }
    }

    .solution-wrapper {
      width: 1200px;
      margin: 0 auto 35px;

      .solution-list-section {
        display: flex;
        flex-wrap: wrap;

        .box {
          margin-right: 20px;
          margin-bottom: 20px;
          padding: 8px;
          width: 386px;
          height: 282px;
          background: #ffffff;
          box-shadow: 4px 4px 8px 0px rgba(130, 145, 169, 0.16);
          border-radius: 8px;

          &:nth-child(3n) {
            margin-right: 0;
          }

          .img {
            margin-bottom: 8px;
            width: 100%;
            height: 162px;
            background: #ebeef5;
            border-radius: 4px;
          }

          .title {
            margin-bottom: 8px;
            font-size: 16px;
            font-weight: 500;
            color: #000000;
            line-height: 20px;
          }

          .content {
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 400;
            color: #4a505f;
            line-height: 20px;
          }

          .company {
            font-size: 14px;
            font-weight: 400;
            color: #000000;
            line-height: 20px;

            .logo {
              width: 14px;
              height: 14px;
              display: inline-block;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
