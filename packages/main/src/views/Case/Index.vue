<template>
  <div class="page-container">
    <div class="banner-wrapper">
      <div class="content-section">
        <div class="title">行业案例</div>
        <div class="content">
          行业解决方案完全基于UWDP低代码平台进行设计、开发，平台提供了安全、可靠、稳定的运行环境，为您的业务保驾护航。
        </div>
      </div>
    </div>
    <div class="case-wrapper">
      <CategorySearch :data="menuList" @change-category="handleChangeCategory" @search="handleSearch" />
      <div class="case-list-section">
        <div v-for="item in caseList" :key="item.id" class="box">
          <img class="img" :src="item.img" />
          <div class="category">{{ item.category }}</div>
          <div class="title">{{ item.title }}</div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import photo from '@/assets/images/case/case.png';
import CategorySearch from './CategorySearch.vue';

const menuList = [
  {
    key: '0',
    label: '全部',
  },
  {
    key: '1',
    label: '制造业',
  },
];

const caseList = [
  {
    id: 1,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 2,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 3,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 4,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 5,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 6,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 7,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 8,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 9,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
  },
  {
    id: 10,
    img: photo,
    category: 'S01-1000人/互联网/业财一体化平台',
    title: '阿里云-云采销SRM',
    content:
      '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息但无论是哪种类型用户，都一定会有同种共性——好奇心。',
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
  width: 100%;
  height: 100%;
  background: #fbfbfd;

  .banner-wrapper {
    width: 100%;
    height: 165px;
    background-image: url(@/assets/images/case/banner-bg.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .content-section {
      margin: 0 auto;
      padding-top: 26px;
      width: 1200px;
      text-align: center;

      .title {
        padding: 0;
        margin-bottom: 10px;
        font-size: 40px;
        font-weight: 600;
        line-height: 56px;
        letter-spacing: 2px;
        background: linear-gradient(180deg, #9c68ff 0%, #187dff 100%);
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

  .case-wrapper {
    width: 1200px;
    margin: 0 auto 40px;

    .case-list-section {
      display: flex;
      flex-wrap: wrap;

      .box {
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 8px;
        width: 386px;
        height: 460px;
        background: #ffffff;
        box-shadow: 4px 4px 8px 0px rgba(130, 145, 169, 0.16);
        border-radius: 8px;

        &:nth-child(3n) {
          margin-right: 0;
        }

        .img {
          width: 100%;
          height: 200px;
          background: #ebeef5;
          border-radius: 4px;
        }

        .category {
          margin: 8px 0;
          font-size: 14px;
          color: #4a505f;
          line-height: 20px;
        }

        .title {
          font-size: 16px;
          font-weight: 500;
          color: #000000;
          line-height: 20px;
        }

        .content {
          margin-top: 6px;
          font-size: 14px;
          color: #4a505f;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
