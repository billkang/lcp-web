<template>
  <div class="page-container">
    <div class="banner-wrapper">
      <div class="content-section">
        <div class="title">开放平台</div>
        <div class="content">
          为企业用户提供便捷的应用配置和接口调用开发能力，通过用友云开放平台，可将内部的信息系统延伸、整合到统一的移动入口及WEB端入口，快速帮助企业实现信息移动化，向企业用户提供更友好、更方便的企业服务，实现数据共享和生态伙伴融合。
        </div>
        <el-button class="btn-try" @click="handleTryNow">立即试用</el-button>
      </div>
    </div>

    <div class="ability-wrapper">
      <div class="title">为企业提供完善的API治理能力</div>
      <div class="box-wrapper">
        <div class="box">
          <div class="icon icon-install"></div>
          <div class="title">安装便捷,操作简单</div>
          <div class="content">
            <span>基于安装器向导式安装</span>
            <span>产品设计简答易懂</span>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-manage"></div>
          <div class="title">全生命周期API管理</div>
          <div class="content">
            <span>API发布管理和测试</span>
            <span>API统一授权调用</span>
            <span>API监控及预警</span>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-safe"></div>
          <div class="title">安装便捷,操作简单</div>
          <div class="content">
            <span>基于安装器向导式安装</span>
            <span>产品设计简答易懂</span>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-plugin"></div>
          <div class="title">安装便捷,操作简单</div>
          <div class="content">
            <span>基于安装器向导式安装</span>
            <span>产品设计简答易懂</span>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-data"></div>
          <div class="title">安装便捷,操作简单</div>
          <div class="content">
            <span>基于安装器向导式安装</span>
            <span>产品设计简答易懂</span>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-concurrence"></div>
          <div class="title">安装便捷,操作简单</div>
          <div class="content">
            <span>基于安装器向导式安装</span>
            <span>产品设计简答易懂</span>
          </div>
        </div>
      </div>
    </div>

    <div class="process-wrapper">
      <div class="title">使用流程</div>

      <div class="step-wrapper">
        <div class="line"></div>

        <div class="step-item">
          <div class="index">01</div>
          <div class="icon active"></div>
          <div class="title">注册</div>
          <div class="content">注册平台用户</div>
        </div>

        <div class="step-item">
          <div class="index">02</div>
          <div class="icon"></div>
          <div class="title">注册</div>
          <div class="content">注册平台用户</div>
        </div>

        <div class="step-item">
          <div class="index">03</div>
          <div class="icon"></div>
          <div class="title">注册</div>
          <div class="content">注册平台用户</div>
        </div>

        <div class="step-item">
          <div class="index">04</div>
          <div class="icon"></div>
          <div class="title">注册</div>
          <div class="content">注册平台用户</div>
        </div>

        <div class="step-item">
          <div class="index">05</div>
          <div class="icon"></div>
          <div class="title">注册</div>
          <div class="content">注册平台用户</div>
        </div>

        <div class="step-item">
          <div class="index">06</div>
          <div class="icon"></div>
          <div class="title">注册</div>
          <div class="content">注册平台用户</div>
        </div>
      </div>

      <div class="btn-groups">
        <el-button type="primary" @click="handleTryNow">快速入驻</el-button>
      </div>
    </div>

    <div class="docs-wrapper">
      <div class="title">开放平台接入文档</div>

      <div class="guide-wrapper">
        <div class="guide-item">
          <div class="title">
            接入引导
            <div class="link">
              查看全部
              <el-icon><DArrowRight /></el-icon>
            </div>
          </div>
          <div class="content">
            <span>开放平台简介</span>
            <span>名词解释</span>
            <span>常用字段说明</span>
            <span>开放平台服务协议</span>
          </div>
        </div>

        <div class="guide-item">
          <div class="title">
            接入规范
            <div class="link">
              查看全部
              <el-icon><DArrowRight /></el-icon>
            </div>
          </div>
          <div class="content">
            <span>UI开发规范</span>
            <span>前端开发规范</span>
            <span>开放平台用户认证接入规范</span>
            <span>返回码说明</span>
          </div>
        </div>

        <div class="guide-item">
          <div class="title">
            接入引导
            <div class="link">
              查看全部
              <el-icon><DArrowRight /></el-icon>
            </div>
          </div>
          <div class="content">
            <span>开放平台简介</span>
            <span>名词解释</span>
            <span>常用字段说明</span>
            <span>开放平台服务协议</span>
          </div>
        </div>

        <div class="guide-item">
          <div class="title">
            接入引导
            <div class="link">
              查看全部
              <el-icon><DArrowRight /></el-icon>
            </div>
          </div>
          <div class="content">
            <span>开放平台简介</span>
            <span>名词解释</span>
            <span>常用字段说明</span>
            <span>开放平台服务协议</span>
          </div>
        </div>
      </div>

      <div class="welcome">诚邀您体验开发者中心，开启企业应用构建之旅</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleTryNow = () => {
  router.push('/my-app');
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: calc(100vh - 224px);
  background: #fbfbfd;

  .banner-wrapper {
    width: 100%;
    height: 210px;
    background-image: url(@/assets/images/open-platform/banner-bg.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .content-section {
      margin: 0 auto;
      width: 1200px;

      .title {
        padding: 25px 0 8px;
        font-size: 24px;
        font-weight: 500;
        color: #000000;
        line-height: 36px;
      }

      .content {
        margin-bottom: 16px;
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

  .ability-wrapper {
    width: 1200px;
    margin: 40px auto 64px;
    text-align: center;

    .title {
      margin-bottom: 40px;
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      line-height: 36px;
    }

    .box-wrapper {
      display: flex;
      flex-wrap: wrap;

      .box {
        margin: 0 20px 20px 0;
        padding: 50px 75px 10px;
        width: 386px;
        height: 230px;
        background: #ffffff;
        border-radius: 8px;
        text-align: center;

        &:nth-child(3n) {
          margin-right: 0;
        }

        .icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 20px;
          background-size: contain;
          background-repeat: no-repeat;

          &.icon-install {
            background-image: url(@/assets/images/open-platform/icon/install.png);
          }

          &.icon-manage {
            background-image: url(@/assets/images/open-platform/icon/manage.png);
          }

          &.icon-safe {
            background-image: url(@/assets/images/open-platform/icon/safe.png);
          }

          &.icon-plugin {
            background-image: url(@/assets/images/open-platform/icon/plugin.png);
          }

          &.icon-data {
            background-image: url(@/assets/images/open-platform/icon/data.png);
          }

          &.icon-concurrence {
            background-image: url(@/assets/images/open-platform/icon/concurrence.png);
          }
        }

        .title {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: #000000;
          line-height: 20px;
        }

        .content {
          margin-top: 8px;
          font-size: 14px;
          color: #4a505f;
          line-height: 24px;

          span {
            display: block;
          }
        }
      }
    }
  }

  .process-wrapper {
    width: 100%;
    height: 332px;
    background-image: url(@/assets/images/open-platform/process-bg.png);
    background-color: #ffffff;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .title {
      width: 600px;
      padding: 40px 0;
      margin: 0 auto;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      line-height: 36px;
    }

    .step-wrapper {
      position: relative;
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .line {
        position: absolute;
        top: 39px;
        left: -360px;
        margin: 0 auto;
        width: 1920px;
        height: 2px;
        background: linear-gradient(331deg, rgba(231, 238, 255, 0) 0%, #dadee9 51%, rgba(233, 238, 251, 0) 100%);
        border-radius: 2px;
      }

      .step-item {
        width: 160px;
        font-size: 14px;
        color: #4a505f;
        line-height: 20px;
        text-align: center;
        z-index: 1;

        .index {
          font-size: 20px;
          font-family: Krungthep;
          color: #0081ff;
          line-height: 25px;
        }

        .icon {
          margin: 8px auto;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid #0081ff;
          background: #ffffff;

          &::after {
            position: relative;
            top: 2px;
            left: 2px;
            display: block;
            content: '';
            width: 6px;
            height: 6px;
            background: #0081ff;
            border-radius: 50%;
          }

          &.active {
            border: 4px solid #0081ff;

            &::after {
              display: none;
            }
          }
        }

        .title {
          padding: 0;
          width: auto;
          font-size: 16px;
          font-weight: 500;
          color: #000000;
          line-height: 20px;
        }

        .content {
          font-size: 14px;
          color: #4a505f;
          line-height: 20px;
        }
      }
    }

    .btn-groups {
      display: flex;
      justify-content: center;
      width: 800px;
      margin: 40px auto 0;
    }
  }

  .docs-wrapper {
    width: 1200px;
    margin: 0 auto;
    text-align: center;

    .title {
      margin: 40px auto 36px;
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      line-height: 36px;
    }

    .guide-wrapper {
      display: flex;
      flex-wrap: wrap;

      .guide-item {
        width: 594px;
        height: 222px;
        margin: 0 12px 12px 0;
        padding: 38px 25px 25px 45px;
        background-color: #eff4ff;
        text-align: left;
        border-radius: 8px;
        box-shadow: 4px 4px 8px 0 #edf2fb;

        &:nth-child(2n) {
          margin-right: 0;
        }

        &:nth-child(2) {
          background-color: #fff3ee;
        }

        &:nth-child(3) {
          background-color: #eaf6ff;
        }

        &:nth-child(4) {
          background-color: #fffbf1;
        }

        .title {
          position: relative;
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          color: #000000;
          line-height: 28px;

          .link {
            position: absolute;
            top: 4px;
            right: 0px;
            font-size: 14px;
            font-weight: 400;
            color: #0081ff;
            line-height: 24px;

            .el-icon {
              position: relative;
              top: 2px;
            }
          }
        }

        .content {
          margin-top: 8px;
          font-size: 14px;
          color: #4a505f;
          line-height: 24px;

          span {
            margin: 0 0 8px 10px;
            text-align: left;
            display: block;

            &::before {
              position: relative;
              top: -2px;
              left: -12px;
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background-color: #0081ff;
              border-radius: 50%;
            }
          }
        }
      }
    }

    .welcome {
      margin: 28px 280px 56px;
      font-size: 28px;
      font-weight: 600;
      line-height: 40px;
      letter-spacing: 2px;
      background-image: linear-gradient(90deg, #9c68ff 0%, #0a82ff 48%, #41deff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
</style>
