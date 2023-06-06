<template>
  <div class="layout-footer">
    <div class="footer-wrapper">
      <div class="section">
        <div class="logo"></div>
        <div class="icon-groups"></div>
      </div>
      <div class="section">
        <div class="primary link">快捷入口</div>
        <div class="link">帮助中心</div>
      </div>
      <div class="section">
        <div class="primary link">更多</div>
        <div class="link">关于源启</div>
      </div>
      <div class="section">
        <div class="primary link">联系我们</div>
        <div class="link">售前咨询</div>
        <div class="link">技术支持</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-footer {
  height: 160px;
  background-color: #0c244d;

  .footer-wrapper {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    display: flex;

    .section {
      width: 400px;
      padding-top: 30px;

      .link {
        height: 26px;
        font-size: 16px;
        color: #ffffff;
        margin-bottom: 8px;

        &.primary {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
