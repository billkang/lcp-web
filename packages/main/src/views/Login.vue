<template>
  <div class="page-container">
    <div class="form-wrapper">
      <div class="brand-wrapper">
        <div class="logo"></div>
        <div class="title">业权治理平台</div>
      </div>
      <div class="form-title">账号密码登录</div>
      <el-form ref="formRef" :model="formModel" :rules="rules" status-icon>
        <el-form-item prop="account">
          <el-input v-model="formModel.account" placeholder="请输入账号" clearable>
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="password-section">
          <el-input v-model="formModel.password" placeholder="请输入密码" type="password" show-password clearable>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="remember-password-section">
          <el-checkbox v-model="rememberPassword" label="记住密码" />
          <el-link href="/" :underline="false">忘记密码</el-link>
        </el-form-item>
        <el-form-item class="read-and-agree-section">
          <el-checkbox v-model="readAndAgree" label="我已阅读并同意" />
          <el-link href="/" target="_blank" :underline="false">《隐私政策》</el-link>
        </el-form-item>
        <el-form-item class="btn-groups">
          <el-button @click="handleRegistry">注册</el-button>
          <el-button type="primary" @click="handleSubmit(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';

const router = useRouter();

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

const handleRegistry = () => {
  router.push('/registry');
};

const handleSubmit = (formEl: FormInstance | undefined) => {
  formEl &&
    formEl.validate(valid => {
      if (valid) {
        console.log('submit!');

        router.push('/');
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
        background-size: contain;
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
      &.remember-password-section {
        :deep(.el-form-item__content) {
          display: flex;
          justify-content: space-between;
          margin-bottom: 50px;
        }
      }

      &.read-and-agree-section {
        margin-bottom: 10px;
      }

      &.btn-groups {
        :deep(.el-form-item__content) {
          display: flex;
          justify-content: space-between;

          .el-button {
            width: 230px;
            height: 56px;
            background: #ffffff;
            border-radius: 8px;
            border: 2px solid #0081ff;
            font-size: 24px;
            color: #0081ff;
            line-height: 32px;

            &.el-button--primary {
              background: #0081ff;
              border: 2px solid #0081ff;
              color: #ffffff;
            }
          }
        }
      }

      .el-input {
        height: 56px;
        background: #ffffff;
        border-radius: 8px;

        &.is-active {
          border: 1px solid #0081ff;

          .el-icon {
            color: #0081ff;
          }
        }

        :deep(.el-input__wrapper) {
          padding: 16px;

          &.is-focus {
            .el-icon {
              color: #0081ff;
            }
          }

          .el-icon {
            font-size: 20px;
          }

          .el-input__inner {
            font-size: 18px;
            color: #8291a9;
            line-height: 25px;
          }
        }
      }

      .el-checkbox {
        :deep(.el-checkbox__input) {
          &.is-checked {
            .el-checkbox__inner {
              --el-checkbox-checked-bg-color: #0081ff;
              --el-checkbox-checked-input-border-color: #0081ff;
            }
          }
        }

        :deep(.el-checkbox__label) {
          font-size: 18px;
          color: #555859 !important;
          line-height: 18px;
        }
      }

      .el-link {
        height: 18px;
        font-size: 18px;
        color: #0081ff;
        line-height: 18px;
      }
    }
  }
}
</style>
