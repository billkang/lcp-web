<template>
  <div class="page-container">
    <div class="banner-wrapper">
      <div class="content-section">
        <div class="title">源启统一前端开发平台</div>
        <div class="content">
          中电金信源启统一前端开发平台以普惠为目标基于公司10多年组件化技术积累打造而成，将低代码技术引入高复杂度、大规模、高价值的企业级应用开发领域，通过拖拽式页面构建、灵活可视的业务模型设计与流程编排，积木式的应用搭建，简化开发过程，缩短开发周期，提高开发效率，节省开发成本，帮助专业开发者、IT技术人员和业务人员快速构建面向未来的个性化应用，为企业持续发展提供数字化支撑。
        </div>
        <el-button class="btn-try">立即试用</el-button>
      </div>
    </div>
    <div class="advantage-wrapper">
      <div class="title">核心优势&能力</div>
      <div class="content">
        以应用为核心，依托MDD-MDF思想，通过可视化拖拽式页面构建、灵活可视的业务模型设计、流程编排，积木式搭建
        应用缩短业务创新周期，促进金融企业的降本增效，加速金融行业的数字化转型速度
      </div>
    </div>
    <div class="ability-wrapper">
      <div class="box">
        <div class="icon icon-standard"></div>
        <div class="title">提供标准化能力 降低开发门槛</div>
        <div class="content">
          源启统一前端开发平台把基于代码的传统开发方式转变为基于企业研发资产的标准组件化开发方式，开发平台屏蔽各种技术规范，统一企业技术体系与技术管理，很方便助力企业实现技术规范设计编码质量流程等规范的统一，降低应开发门槛，破解系统升级难题，提高产品和项目的可维护性
        </div>
      </div>
      <div class="box">
        <div class="icon icon-efficient"></div>
        <div class="title">快速复用资产 加速敏捷创新</div>
        <div class="content">
          提供全面开放的生态与丰富的扩展集成能力，有效地沉淀业务、数据与技术资产，可在全企业多个部门产品或者项目间快速复用，提升应用交付速度，加速业务敏捷创新
        </div>
      </div>
      <div class="box">
        <div class="icon icon-period"></div>
        <div class="title">全生命周期管理 提升效率</div>
        <div class="content">
          基于源启统一前端开发平台标准化开发能力，在降低应用构建成本同时，有利于沉淀企业的研发资产与数据资产，提高企业业务治理与数据理水平，保障企业应用安全与稳定、加速金融行业的系统研发速度
        </div>
      </div>
      <div class="box">
        <div class="icon icon-platform"></div>
        <div class="title">一平台+双生态+六能力</div>
        <div class="content">
          <span>打造企业级一站式业务全流程前端可视化开发平台及解决方案</span>
          <span>物料市场+模板货架共同构成低代码开发平台的研发资产</span>
          <span>建模、业务全流程可视化开发、研发资产沉淀、无限扩展、与第三方平台集成、标准化开发的能力</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: calc(100vh - 224px);
  background: #fbfbfd;

  .banner-wrapper {
    width: 100%;
    height: 400px;
    background-image: url(@/assets/images/home/banner-bg.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .content-section {
      margin: 0 auto;
      width: 1200px;

      .title {
        padding: 65px 0 8px;
        font-size: 24px;
        font-weight: 500;
        color: #000000;
        line-height: 36px;
      }

      .content {
        margin-bottom: 16px;
        width: 546px;
        height: 180px;
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

  .advantage-wrapper {
    width: 810px;
    margin: 40px auto 30px;
    text-align: center;

    .title {
      margin-bottom: 8px;
      height: 36px;
      font-size: 24px;
      font-weight: 500;
      color: #000000;
    }

    .content {
      font-size: 16px;
      color: #4a505f;
      line-height: 30px;
    }
  }

  .ability-wrapper {
    width: 1200px;
    margin: 0 auto 40px;
    display: flex;
    justify-content: space-between;

    .box {
      padding: 34px 16px 22px;
      width: 270px;
      height: 367px;
      background: #ffffff;
      box-shadow: 4px 4px 8px 0px rgba(130, 145, 169, 0.16);
      border-radius: 8px;
      text-align: center;

      .icon {
        width: 63px;
        height: 63px;
        margin: 0 auto 20px;

        &.icon-efficient {
          background-image: url(@/assets/images/home/icon-efficient.png);
          background-size: contain;
        }

        &.icon-period {
          background-image: url(@/assets/images/home/icon-period.png);
          background-size: contain;
        }

        &.icon-platform {
          background-image: url(@/assets/images/home/icon-platform.png);
          background-size: contain;
        }

        &.icon-standard {
          background-image: url(@/assets/images/home/icon-standard.png);
          background-size: contain;
        }
      }

      .title {
        height: 28px;
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        line-height: 28px;
      }

      .content {
        height: 192px;
        font-size: 14px;
        font-weight: 400;
        color: #4a505f;
        line-height: 24px;

        span {
          margin: 0 0 8px 13px;
          text-align: left;
          display: block;

          &::before {
            position: relative;
            top: -2px;
            left: -8px;
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: #0081ff;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
