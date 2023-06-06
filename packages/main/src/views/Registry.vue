<template>
  <div class="page-container">
    <div class="form-wrapper">
      <div class="brand-wrapper">
        <div class="logo"></div>
        <div class="title">业权治理平台</div>
      </div>
      <div class="form-title">手机号注册</div>
      <el-form ref="formRef" :model="formModel" :rules="rules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="formModel.mobile" placeholder="请输入手机号" clearable>
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" placeholder="请输入密码" type="password" show-password clearable>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verificationCode">
          <el-input v-model="formModel.verificationCode" class="verification-code" placeholder="请输入验证码" clearable>
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
            <template #append>
              <el-button @click="handleGetVerificationCode">获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="btn-groups">
          <el-button type="primary" @click="handleSubmit(formRef)">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const formRef = ref<FormInstance>();
const formModel = reactive({
  mobile: '',
  password: '',
  verificationCode: '',
});

const rules = reactive<FormRules>({
  mobile: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
  verificationCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ],
});

const handleGetVerificationCode = () => {
  console.log('!');
};

const handleSubmit = (formEl: FormInstance | undefined) => {
  formEl &&
    formEl.validate(valid => {
      if (valid) {
        console.log('submit!');
      }
    });
};
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100vh;
  background-color: rgba(48, 51, 60, 0.16);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  .form-wrapper {
    padding: 60px 40px;
    width: 560px;
    height: 636px;
    background: #ffffff;
    box-shadow: 2px 2px 22px 7px rgba(149, 160, 176, 0.11);
    border-radius: 7px;

    .brand-wrapper {
      margin-bottom: 60px;
      display: flex;
      justify-content: center;

      .logo {
        width: 62px;
        height: 62px;
        display: inline-block;
        margin-right: 8px;
        background-image: url(@/assets/images/logo.ico);
        background-size: cover;
      }

      .title {
        padding: 17px 0;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #2d59b5;
        line-height: 28px;
      }
    }

    .form-title {
      margin-bottom: 16px;
      height: 32px;
      font-size: 20px;
      color: #111834;
    }

    .el-form-item {
      .el-input {
        height: 56px;
        background: #ffffff;
        border-radius: 8px;

        &.is-active {
          border: 1px solid #0081ff;
        }

        &.verification-code {
          :deep(.el-input-group__append) {
            --el-fill-color-light: transparent;

            .el-button {
              font-size: 18px;
              color: #0081ff;
            }
          }
        }
      }

      &.btn-groups {
        margin-top: 70px;

        .el-button {
          width: 100%;
          height: 56px;
          background: #0081ff;
          border-radius: 4px;
          border: 2px solid #0081ff;
          font-size: 24px;
          color: #ffffff;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
