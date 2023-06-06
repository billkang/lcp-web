<template>
  <div class="page-container">
    <div class="banner-wrapper">
      <div class="content-section">
        <div class="title">资源中心</div>
        <div class="content">以应用为中心,支持可视化+低代码+全代码的一站式开发,快速构建企业业务应用</div>
        <el-button class="btn-try">欢迎入驻</el-button>
      </div>
    </div>

    <div class="resource-wrapper">
      <CategorySearch :data="menuList" @change-category="handleChangeCategory" />
      <div class="resource-list-section">
        <div v-for="item in caseList" :key="item.id" class="box">
          <div class="title">
            <img class="icon" :src="item.icon" />
            {{ item.title }}
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import icon from '@/assets/images/resource/icon.png';
import CategorySearch from './CategorySearch.vue';

const menuList = [
  {
    key: '0',
    icon,
    label: '全部',
  },
  {
    key: '1',
    icon,
    label: '国结',
  },
  {
    key: '2',
    icon,
    label: '信贷',
  },
  {
    key: '3',
    icon,
    label: '能源',
  },
  {
    key: '4',
    icon,
    label: '产品',
  },
];

const caseList = [
  {
    id: 1,
    icon,
    title: '产品LOGO+名称',
    content: '根据对比来思考并不会让人逻辑混乱，因为即使是对比也可以联结称一个和谐的整体。这是一段应用描述…',
  },
  {
    id: 2,
    icon,
    title: '产品LOGO+名称',
    content: '根据对比来思考并不会让人逻辑混乱，因为即使是对比也可以联结称一个和谐的整体。这是一段应用描述…',
  },
  {
    id: 3,
    icon,
    title: '产品LOGO+名称',
    content: '根据对比来思考并不会让人逻辑混乱，因为即使是对比也可以联结称一个和谐的整体。这是一段应用描述…',
  },
  {
    id: 4,
    icon,
    title: '产品LOGO+名称',
    content: '根据对比来思考并不会让人逻辑混乱，因为即使是对比也可以联结称一个和谐的整体。这是一段应用描述…',
  },
  {
    id: 5,
    icon,
    title: '产品LOGO+名称',
    content: '根据对比来思考并不会让人逻辑混乱，因为即使是对比也可以联结称一个和谐的整体。这是一段应用描述…',
  },
  {
    id: 6,
    icon,
    title: '产品LOGO+名称',
    content: '根据对比来思考并不会让人逻辑混乱，因为即使是对比也可以联结称一个和谐的整体。这是一段应用描述…',
  },
  {
    id: 7,
    icon,
    title: '产品LOGO+名称',
    content: '根据对比来思考并不会让人逻辑混乱，因为即使是对比也可以联结称一个和谐的整体。这是一段应用描述…',
  },
  {
    id: 8,
    icon,
    title: '产品LOGO+名称',
    content: '根据对比来思考并不会让人逻辑混乱，因为即使是对比也可以联结称一个和谐的整体。这是一段应用描述…',
  },
];

const handleChangeCategory = (key: string) => {
  console.log(key);
};
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  background: #fbfbfd;

  .banner-wrapper {
    width: 100%;
    height: 210px;
    background-image: url(@/assets/images/resource/banner-bg.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .content-section {
      margin: 0 auto;
      width: 1200px;

      .title {
        padding: 40px 0 8px;
        font-size: 24px;
        font-weight: 500;
        color: #000000;
        line-height: 36px;
      }

      .content {
        margin-bottom: 20px;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: #30333c;
        line-height: 30px;
      }

      .btn-try {
        padding: 8px;
        width: 126px;
        height: 36px;
        background: #0081ff;
        border-radius: 8px;
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
      }
    }
  }

  .resource-wrapper {
    width: 1200px;
    margin: 0 auto 40px;

    .resource-list-section {
      display: flex;
      flex-wrap: wrap;

      .box {
        margin-right: 16px;
        margin-bottom: 16px;
        padding: 21px 16px 16px;
        width: 288px;
        height: 134px;
        background: #ffffff;
        box-shadow: 4px 4px 8px 0px rgba(130, 145, 169, 0.16);
        border-radius: 8px;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .title {
          font-size: 18px;
          font-weight: 500;
          color: #4a505f;
          line-height: 20px;

          .icon {
            margin-right: 7px;
            width: 25px;
            height: 25px;
            display: inline-block;
          }
        }

        .content {
          margin-top: 14px;
          font-size: 14px;
          font-weight: 400;
          color: #4a505f;
          line-height: 21px;
        }
      }
    }
  }
}
</style>
