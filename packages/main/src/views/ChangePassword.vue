<template>
  <div class="page-container">
    <div class="form-wrapper">
      <div class="brand-wrapper">
        <div class="logo"></div>
        <div class="title">管理系统</div>
      </div>
      <div class="form-title">账号密码登录</div>
      <el-form ref="formRef" :model="formModel" :rules="rules" status-icon>
        <el-form-item prop="account">
          <el-input v-model="formModel.account" placeholder="请输入账号" clearable>
            <template #prefix>
              <el-icon><UserFilled /></el-icon>
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
        <el-form-item>
          <el-checkbox v-model="rememberPassword" label="记住密码" />
          <el-link href="/">忘记密码</el-link>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="readAndAgree" label="我已阅读并同意" />
          <el-link href="/" target="_blank">《隐私政策》</el-link>
        </el-form-item>
        <el-form-item>
          <el-button>注册</el-button>
          <el-button type="primary" @click="handleSubmit(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const rememberPassword: Ref<boolean> = ref(true);
const readAndAgree: Ref<boolean> = ref(true);

const formRef = ref<FormInstance>();
const formModel = reactive({
  account: '',
  password: '',
});

const rules = reactive<FormRules>({
  account: [
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
});

const handleSubmit = async (formEl: FormInstance | undefined) => {
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
      }
    }
  }
}
</style>
