<template>
	<common-page title="重置密码">
		<el-steps :active="stepActive" simple finish-status="success">
			<el-step title="填写新密码" />
			<el-step title="完成重置" />
		</el-steps>
		<el-form v-if="stepActive==0" ref="form" :model="form" :rules="rules" :label-width="120">
			<el-form-item label="登录账号" prop="user">
				<el-input v-model="form.user" placeholder="请输入登录账号"></el-input>
				<div class="el-form-item-msg">请输入注册时填写的登录账号</div>
			</el-form-item>
			<el-form-item label="邀请码" prop="code">
				<el-input v-model="form.code" placeholder="请输入邀请码"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newpw">
				<el-input v-model="form.newpw" show-password placeholder="请输入新密码"></el-input>
				<div class="el-form-item-msg">请输入包含英文、数字的8位以上密码</div>
			</el-form-item>
			<el-form-item label="确认新密码" prop="newpw2">
				<el-input v-model="form.newpw2" show-password placeholder="请再一次输入新密码"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="save">提交</el-button>
			</el-form-item>
		</el-form>
		<el-result v-if="stepActive==1" icon="success" title="密码重置成功" sub-title="请牢记自己的新密码,返回登录后使用新密码登录">
			<template #extra>
				<el-button type="primary" @click="backLogin">返回登录</el-button>
			</template>
		</el-result>
	</common-page>
</template>

<script>
	import commonPage from './components/commonPage.vue'

	export default {
		components: {
			commonPage
		},
		data() {
			return {
				stepActive: 0,
				form: {
					user: "",
					code: "",
					newpw: "",
					newpw2: ""
				},
				rules: {
					user: [
						{ required: true, message: '请输入登录账号'}
					],
					code: [
						{ required: true, message: '请输入邀请码'}
					],
					newpw: [
						{ required: true, message: '请输入新的密码'}
					],
					newpw2: [
						{ required: true, message: '请再次输入新的密码'},
						{validator: (rule, value, callback) => {
							if (value !== this.form.newpw) {
								callback(new Error('两次输入密码不一致'));
							}else{
								callback();
							}
						}}
					],
				},
				disabled: false,
				time: 0
			}
		},
		mounted() {

		},
		methods: {
			async save(){
				var validate = await this.$refs.form.validate().catch(()=>{})
				if(!validate){ return false }

				this.stepActive = 1
			},
			backLogin(){
				this.$router.push({
					path: '/login'
				})
			}
		}
	}
</script>

<style scoped>


</style>
