<template>
	<common-page title="注册新账号">
		<el-steps :active="stepActive" simple finish-status="success">
			<el-step title="注册" />
			<el-step title="完成注册" />
		</el-steps>
		<el-form v-if="stepActive == 0" ref="stepForm_0" :model="form" :rules="rules" :label-width="120" style="margin-top: 20px;">
			<el-form-item label="登录账号" prop="user">
				<el-input v-model="form.user" placeholder="请输入登录账号"></el-input>
				<div class="el-form-item-msg">登录账号将作为登录时的唯一凭证</div>
			</el-form-item>
			<el-form-item label="登录密码" prop="password">
				<el-input v-model="form.password" type="password" show-password placeholder="请输入登录密码"></el-input>
				<sc-password-strength v-model="form.password"></sc-password-strength>
				<div class="el-form-item-msg">请输入包含英文、数字的8位以上密码</div>
			</el-form-item>
			<el-form-item label="确认密码" prop="password2">
				<el-input v-model="form.password2" type="password" show-password placeholder="请再一次输入登录密码"></el-input>
			</el-form-item>
			<el-form-item label="邀请码" prop="code">
				<el-input v-model="form.code" placeholder="请输入邀请码"></el-input>
			</el-form-item>
		</el-form>
		<el-form v-if="stepActive == 0" style="text-align: center; margin-bottom: 15px;">
			<el-button type="primary" plain @click="goLogin">返回</el-button>
			<el-button type="primary" @click="save">提交</el-button>
		</el-form>
		<div v-if="stepActive == 1">
			<el-result icon="success" title="注册成功" sub-title="请使用账号登录系统">
				<template #extra>
					<el-button type="primary" @click="goLogin">前去登录</el-button>
				</template>
			</el-result>
		</div>
	</common-page>
</template>

<script>
	import scPasswordStrength from '@/components/scPasswordStrength/index.vue';
	import commonPage from './components/commonPage.vue'

	export default {
		components: {
			commonPage,
			scPasswordStrength
		},
		data() {
			return {
				stepActive: 0,
				successRegister: false,
				form: {
					user: "",
					password: "",
					password2: "",
					code: null
				},
				rules: {
					user: [
						{ required: true, message: '请输入账号名'}
					],
					password: [
						{ required: true, message: '请输入密码'}
					],
					password2: [
						{ required: true, message: '请再次输入密码'},
						{validator: (rule, value, callback) => {
							if (value !== this.form.password) {
								callback(new Error('两次输入密码不一致'));
							}else{
								callback();
							}
						}}
					],
					code: [
						{ required: true, message: '请输入邀请码'}
					]
				}
			}
		},
		mounted() {

		},
		methods: {
			save(){
				const formName = `stepForm_${this.stepActive}`
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.stepActive += 1
						this.successRegister = true
					}else{
						return false
					}
				})
			},
			goLogin(){
				this.$router.push({
					path: '/login'
				})
			}
		}
	}
</script>

<style scoped>


</style>
