import { ChatLayout } from '@/views/chat/layout'

//系统路由
const routes = [
	{
		name: "Root",
		path: "/",
		component: ChatLayout,
		redirect: '/chat',
		children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
	},
	{
		path: "/login",
		name: "login",
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/user_register",
		name: "userRegister",
		component: () => import('@/views/login/userRegister.vue'),
		meta: {
			title: "注册"
		}
	},
	{
		path: "/reset_password",
		name: "resetPassword",
		component: () => import('@/views/login/resetPassword.vue'),
		meta: {
			title: "重置密码"
		}
	}
]

export default routes;