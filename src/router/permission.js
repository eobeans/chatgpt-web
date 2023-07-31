import { ElNotification } from 'element-plus';
import config from "@/config"
import NProgress from 'nprogress'
import tool from '@/utils/tool';
import systemRouter from './systemRouter';

const routes = systemRouter

//设置标题
document.title = config.APP_NAME

export function setupPageGuard(router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
		//动态标题
		document.title = to.meta.title ? `${to.meta.title} - ${config.APP_NAME}` : `${config.APP_NAME}`

		let token = tool.cookie.get("TOKEN");

		if(to.path === "/login"){
			next();
			return false;
		}

		if(routes.findIndex(r => r.path === to.path) >= 0){
			next();
			return false;
		}

		if(!token){
			next({
				path: '/login'
			});
			return false;
		}
		next();
  })

	router.afterEach((to, from) => {
		NProgress.done()
	});
	
	router.onError((error) => {
		NProgress.done();
		ElNotification.error({
			title: '路由错误',
			message: error.message
		});
	});
}


