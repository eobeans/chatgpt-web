<template>
	<el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" @keyup.enter="login">
		<el-form-item prop="user">
			<el-input v-model="form.user" prefix-icon="el-icon-user" clearable :placeholder="$t('login.userPlaceholder')">
				<template #append>
					<el-select v-model="userType" style="width: 130px;">
						<el-option :label="$t('login.admin')" value="admin"></el-option>
						<el-option :label="$t('login.user')" value="user"></el-option>
					</el-select>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="form.password" prefix-icon="el-icon-lock" clearable show-password :placeholder="$t('login.PWPlaceholder')"></el-input>
		</el-form-item>
		<el-form-item style="margin-bottom: 10px;">
				<el-col :span="12">
					<el-checkbox :label="$t('login.rememberMe')" v-model="form.autologin"></el-checkbox>
				</el-col>
				<el-col :span="12" class="login-forgot">
					<router-link to="/reset_password">{{ $t('login.forgetPassword') }}？</router-link>
				</el-col>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login">{{ $t('login.signIn') }}</el-button>
		</el-form-item>
		<div class="login-reg">
			{{$t('login.noAccount')}} <router-link to="/user_register">{{$t('login.createAccount')}}</router-link>
		</div>
	</el-form>
</template>

<script>
import { fetchTooken } from '@/api'

	export default {
		data() {
			return {
				userType: 'admin',
				form: {
					user: "admin",
					password: "admin",
					autologin: false
				},
				rules: {
					user: [
						{required: true, message: this.$t('login.userError'), trigger: 'blur'}
					],
					password: [
						{required: true, message: this.$t('login.PWError'), trigger: 'blur'}
					]
				},
				islogin: false,
			}
		},
		watch:{
			userType(val){
				if(val == 'admin'){
					this.form.user = 'admin'
					this.form.password = 'admin'
				}else if(val == 'user'){
					this.form.user = 'user'
					this.form.password = 'user'
				}
			}
		},
		mounted() {

		},
		methods: {
			async login(){
				// const params = {
				// 	username: 'admin',
				// 	password: 'admin123',
				// 	client_id: 'web',
				// 	client_secret: '123456',
				// 	grant_type: 'password',
				// 	scope: 'server'
				// }
				// // 获取Token
				// const userToken = await this.$API.auth.accessToken.get(params)
				// this.$TOOL.cookie.set("TOKEN", userToken.access_token)
				// this.$TOOL.cookie.set("Admin-Token", userToken.access_token)
				// this.$TOOL.cookie.set("Admin-Expires-In", userToken.expires_in)
				// // 获取用户权限
				// const userInfo = await this.$API.system.user.info.get()
				// this.$TOOL.data.set("PERMISSIONS", userInfo.permissions)
				// this.$TOOL.data.set("ROLES", userInfo.roles)
				// this.$TOOL.data.set("USER", userInfo.user)
				// this.$TOOL.data.set("USER_INFO", {
				// 	role: userInfo.roles,
				// 	userId: userInfo.user.userId,
				// 	userName: userInfo.user.userName
				// })

				let data = {
					username: this.form.user,
					password: this.$TOOL.crypto.MD5(this.form.password)
				}
				//获取token
				// let user = await fetchTooken(data)
				// if(user.code == 200){
				// 	this.$TOOL.cookie.set("TOKEN", user.data.token, {
				// 		expires: this.form.autologin? 24*60*60 : 0
				// 	})
				// 	this.$TOOL.data.set("USER_INFO", user.data.userInfo)
				// }else{
				// 	this.islogin = false
				// 	this.$message.warning(user.message)
				// 	return false
				// }
				this.$TOOL.cookie.set("TOKEN", 'testToken', {
					expires: this.form.autologin? 24*60*60 : 0
				})
				this.$router.replace({
					path: '/'
				})
				this.$message.success("Login Success 登录成功")
				this.islogin = false
			},
		}
	}
</script>

<style>
</style>
