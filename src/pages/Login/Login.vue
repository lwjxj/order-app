<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a @click="loginWay=true" :class="{on:loginWay}">短信登录</a>
          <a @click="loginWay=false" :class="{on:!loginWay}">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input v-model='phoneNumber' type="tel" maxlength="11" placeholder="手机号">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="getVerifyCode">
                {{(countDown === 0) ? '获取验证码' : `已发送${countDown}s`}}
              </button>
            </section>
            <section class="login_verification">
              <input v-model="verifyCode" type="tel" maxlength="8" placeholder="验证码">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="username">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="password" v-show="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="password" v-show="!showPwd">
                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" ref="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
        <AlertTip :alertText="tipInfo" v-show="isShowAlert" @closeTip="closeTip"/>
      </div>
      <a class="go_back" @click="$router.go(-1)">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import {reqPwdLogin, reqSendCode, reqSmsLogin} from '../../api'
  import AlertTip from '../../components/AlertTip/AlertTip'

  export default {
    name: 'Login',
    data() {
      return {
        loginWay:true, // true短信登录  false用户名密码登录
        phoneNumber:'', // 手机号
        verifyCode:'', // 验证码
        countDown:0, // 倒计时
        isShowAlert:false, // 默认不显示提示框
        tipInfo:'', // 提示信息
        username:'', // 用户名
        password:'', // 密码
        captcha:'', // 验证码
        showPwd:false, // 是否显示密码，默认不显示
      }
    },

    components:{
      AlertTip
    },

    methods:{
      // 获取短信验证码
      async getVerifyCode(){
        // 如果当前没有倒计时
        if(!this.countDown){
          // 启动倒计时
          this.countDown = 30
          this.interval = setInterval(() => {
            this.countDown--
            if(this.countDown === 0){
              // 停止倒计时
              clearInterval(this.interval)
            }
          },1000)
          // 发请求获取验证码
          let res = await reqSendCode(this.phoneNumber)
          if(res.code === 1){
            // 如果出错，进行提醒并停止倒计时
            this.showAlert(res.msg)
            if(this.countDown){
              this.countDown = 0
              clearInterval(this.interval)
            }
          }
        }
      },

      // 弹框信息提示
      showAlert(text){
        this.tipInfo = text
        this.isShowAlert = true
      },

      // 关闭提示框
      closeTip(){
        this.isShowAlert = false
      },

      // 获取验证码
      getCaptcha(){
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
      },

      // 登录
      async login(){
        const {phoneNumber,verifyCode} = this
        let result = {} // 存储登录结果的对象
        if(this.loginWay){ // 短信验证码登录方式
          if(!this.phoneNumber || !this.verifyCode){
            return this.showAlert('手机号和验证码不能为空')
          }
          if(!this.rightPhone){
            return this.showAlert('手机号格式不正确')
          }
          if(!/^\d{6}$/.test(this.verifyCode)){
            return this.showAlert('短信验证码必须是6位数字')
          }
          // 发送短信验证码登录请求
          result = await reqSmsLogin(phoneNumber,verifyCode)
        }else { // 用户名密码验证码登录方式
          const {username,password,captcha} = this
          if(!username){
            return this.showAlert('用户名不能为空')
          }
          if(!password){
            return this.showAlert('密码不能为空')
          }
          if(!captcha){
            return this.showAlert('验证码不能为空')
          }
          // 发送请求
          result = await reqPwdLogin(username,password,captcha)
        }
        // 处理请求结果
        if(result.code === 0){
          const user = result.data
          // 将返回的user信息存到vuex中
          this.$store.dispatch('saveUser',user)
          // 跳转到个人中心页面
          this.$router.replace('/profile')
        }else {
          // 显示新的图形验证码
          this.getCaptcha()
          // 弹出报错信息
          this.showAlert(result.msg)
        }
      }
    },

    computed:{
      // 校验手机号
      rightPhone() {
        return /^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phoneNumber)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
