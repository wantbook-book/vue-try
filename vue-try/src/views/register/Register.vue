<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
        <b-card title="注册">
          <b-form>
            <b-form-group label="名称">
              <b-form-input v-model="$v.user.name.$model" type="text" placeholder="输入用户的名称（选填）"
                required>
              </b-form-input>
            </b-form-group>
            <b-form-group label="手机号">
              <b-form-input v-model="$v.user.telephone.$model" :state="validateState('telephone')"
                type="number" placeholder="输入手机号" required>
              </b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号必须为11位
              </b-form-invalid-feedback>
              <!-- <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback> -->
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input v-model="$v.user.password.$model" :state="validateState('password')"
                type="password" placeholder="输入密码" required>
              </b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须为8-20位，可以包含字母和数字
              </b-form-invalid-feedback>
              <!-- <b-form-text
              id="password-help-block"
              text-variant="danger"
              v-if="showPasswordValidate">
                密码必须为8-20位，可以包含字母和数字
              </b-form-text> -->

            </b-form-group>
            <b-form-group>
              <b-button block @click="register">注册</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  required, minLength, maxLength,
} from 'vuelidate/lib/validators';
import customValidator from '@/helper/validator';
import storageService from '@/service/storageService';
import userService from '@/service/userService';

export default {
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        password: '',
      },
      telephoneValidation: null,
      passwordValidation: null,
    };
  },
  methods: {

    validateState(name) {
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    register() {
      this.$v.user.$touch();
      if (this.$v.user.$anyerror) {
        // 有错误返回

      } else {
        // 没有错误发送表单
        // const api = 'http://localhost:9000/api/auth/register';
        userService.register(this.user).then((res) => {
          // 保存token
          console.log(res.data);
          storageService.set(storageService.USER_TOKEN, res.data.data.token);
          // 获取用户信息
          userService.info().then((resource) => {
            // 保存用户信息
            storageService.set(storageService.USER_INFO, JSON.stringify(resource.data.data.user));
            // 跳转到主页
            this.$router.replace({ name: 'Home' });
          });
        }).catch((err) => {
          // 请求失败，输出日志
          console.log('err:', err.response.data.msg);
          this.$bvToast.toast(err.response.data.msg, {
            title: '数据验证错误',
            variant: 'danger',
            solid: true,
          });
        });
      }
    },

  },
  validations: {
    user: {
      telephone: {
        required,
        telephone: customValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      name: {

      },
    },

  },
};

</script>
<style lang="scss" scoped>

</style>
