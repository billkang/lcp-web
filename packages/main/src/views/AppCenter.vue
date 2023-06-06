<template>
  <div class="page-container">
    <div class="banner-wrapper">
      <div class="content-section">
        <div class="title">统一前端开发平台UWDP</div>
        <div class="content">以应用为中心,支持可视化+低代码+全代码的一站式开发,快速构建企业业务应用</div>
        <el-button class="btn-try" @click="handleTryNow">立即试用</el-button>
      </div>
    </div>

    <div class="ability-wrapper">
      <div class="title">强大产品特性,释放企业生产力,激活更多商业潜能</div>
      <div class="box-wrapper">
        <div class="box">
          <div class="icon icon-designer"></div>
          <div class="right-section">
            <div class="title">可视化设计器</div>
            <div class="content">
              “0”代码拖拽式快速定制,支持根据数据创建应用的模型驱动设计,构建高度定制化应用的画布式设计、基于模版的快速构建
            </div>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-business"></div>
          <div class="right-section">
            <div class="title">业务流</div>
            <div class="content">
              实现一定的经营目的而执行的一系列逻辑相关的活动的集合,输出的是满足业务活动需要的服务
            </div>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-script"></div>
          <div class="right-section">
            <div class="title">函数式脚本扩展</div>
            <div class="content">
              在应用下支持开发者基于单据、页面、数据、流程等模型自定义脚本语句,基于应用构建平台的脚本引擎,完成自定义逻辑的脚本填写
            </div>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-engine"></div>
          <div class="right-section">
            <div class="title">应用引擎</div>
            <div class="content">
              为专业开发者提供自建应用引擎的创建、脚手架下载、本地开发调试、CICD、发布上线、生态应用上市的全生命周期管理
            </div>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-workflow"></div>
          <div class="right-section">
            <div class="title">工作流</div>
            <div class="content">在多个参与者之间按某种规则自动传递数据、文档等信息,满足事项协作及合规检查的需要</div>
          </div>
        </div>
        <div class="box">
          <div class="icon icon-more"></div>
          <div class="right-section">
            <div class="title">更多产品特性,待您探索</div>
          </div>
        </div>
      </div>
    </div>

    <div class="period-wrapper">
      <div class="title">完善的应用全生命周期管理</div>
      <div class="box-wrapper">
        <div class="box">
          <div class="icon icon-proto"></div>
          <div class="title">需求/原型</div>
          <div class="content">从需求输入开始进行应用构建,业务、产品也能进行应用开发</div>
        </div>
        <div class="box">
          <div class="icon icon-engine"></div>
          <div class="title">应用引擎</div>
          <div class="content">安全可靠、多组户隔离的公共引擎,无服务器自建引擎,保障应用高效运行</div>
        </div>
        <div class="box">
          <div class="icon icon-build"></div>
          <div class="title">应用构建</div>
          <div class="content">低门槛、可视化、多端适配、组建式集成,实现快速定制</div>
        </div>
        <div class="box">
          <div class="icon icon-debug"></div>
          <div class="title">代码调试</div>
          <div class="content">在线函数式脚本开发,无需部署,实时生效,本地源码开发,自主把控</div>
        </div>
        <div class="box">
          <div class="icon icon-sandbox"></div>
          <div class="title">沙箱验证</div>
          <div class="content">独立、安全可靠、维护成本低,测试更改或新应用不会损坏生产数据或配置</div>
        </div>
        <div class="box">
          <div class="icon icon-publish"></div>
          <div class="title">发布上线</div>
          <div class="content">多环境持续集成,代码+数据快捷打包上线、发布</div>
        </div>
        <div class="box">
          <div class="icon icon-cloud"></div>
          <div class="title">上架云市场</div>
          <div class="content">应用构建产出服务快速上架云市场,共享渠道,共建生态</div>
        </div>
        <div class="box">
          <div class="icon icon-ops"></div>
          <div class="title">运维/运营</div>
          <div class="content">全方位多角度监控、监控大盘、全链路监控、简单维护、智能感知</div>
        </div>
      </div>
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
    background-image: url(@/assets/images/app-center/banner-bg.png);
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
    margin: 36px auto 12px;

    .title {
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      line-height: 36px;
      text-align: center;
    }

    .box-wrapper {
      margin-top: 32px;
      display: flex;
      flex-wrap: wrap;

      .box {
        margin: 0 40px 20px 0;
        padding: 15px 20px 9px 0;
        width: 580px;
        height: 122px;
        background: #ffffff;
        box-shadow: 4px 4px 8px 0px rgba(130, 145, 169, 0.16);
        border-radius: 8px;
        display: flex;

        &:nth-child(2n) {
          margin-right: 0;
        }

        .icon {
          margin: 5px 10px 0 0;
          width: 98px;
          height: 98px;
          background-size: contain;
          background-repeat: no-repeat;

          &.icon-designer {
            background-image: url(@/assets/images/app-center/icon/designer.png);
          }

          &.icon-business {
            background-image: url(@/assets/images/app-center/icon/business.png);
          }

          &.icon-script {
            background-image: url(@/assets/images/app-center/icon/script.png);
          }

          &.icon-engine {
            background-image: url(@/assets/images/app-center/icon/engine.png);
          }

          &.icon-workflow {
            background-image: url(@/assets/images/app-center/icon/workflow.png);
          }

          &.icon-more {
            background-image: url(@/assets/images/app-center/icon/more.png);
          }
        }

        .right-section {
          flex: 1;

          .title {
            text-align: left;
            font-size: 16px;
            font-weight: 500;
            color: #000000;
            line-height: 28px;
          }

          .content {
            font-size: 14px;
            color: #4a505f;
            line-height: 24px;
          }
        }
      }
    }
  }

  .period-wrapper {
    width: 1200px;
    margin: 32px auto 12px;
    text-align: center;

    .title {
      margin-bottom: 32px;
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
        padding: 40px 24px;
        width: 285px;
        height: 230px;
        background: #ffffff;
        box-shadow: 4px 4px 8px 0px rgba(130, 145, 169, 0.16);
        border-radius: 8px;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .icon {
          width: 46px;
          height: 46px;
          margin: 0 auto 16px;
          background-size: contain;
          background-repeat: no-repeat;

          &.icon-proto {
            background-image: url(@/assets/images/app-center/icon/proto.png);
          }

          &.icon-engine {
            background-image: url(@/assets/images/app-center/icon/app-engine.png);
          }

          &.icon-build {
            background-image: url(@/assets/images/app-center/icon/build.png);
          }

          &.icon-debug {
            background-image: url(@/assets/images/app-center/icon/debug.png);
          }

          &.icon-sandbox {
            background-image: url(@/assets/images/app-center/icon/sandbox.png);
          }

          &.icon-publish {
            background-image: url(@/assets/images/app-center/icon/publish.png);
          }

          &.icon-cloud {
            background-image: url(@/assets/images/app-center/icon/cloud.png);
          }

          &.icon-ops {
            background-image: url(@/assets/images/app-center/icon/publish.png);
          }
        }

        .title {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 500;
          color: #000000;
          line-height: 28px;
        }

        .content {
          font-size: 14px;
          color: #4a505f;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
