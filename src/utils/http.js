import config from '../config/index.js';

const baseUrl = config.loveliveServerHost;

function get(url, data, loadingOptions = {
	showLoading: true,
	loadingText: ''
}) {
	return request('GET', url, data, loadingOptions);
}

function post(url, data, loadingOptions = {
	showLoading: true,
	loadingText: ''
}) {
	return request('POST', url, data, loadingOptions);
}

function put(url, data, loadingOptions = {
	showLoading: true,
	loadingText: ''
}) {
	return request('PUT', url, data, loadingOptions);
}

function requestDelete(url, data, loadingOptions = {
	showLoading: true,
	loadingText: ''
}) {
	return request('DELETE', url, data, loadingOptions);
}

function request(method, url, data, loadingOptions) {
	return new Promise((resolve, reject) => {
		let requestUrl = baseUrl + url;

		uni.request({
			url: requestUrl,
			method: method,
			data: data ? data : {},
			success: (response) => {
				return responseHandle(response, url, resolve, reject);
			},
			fail: (error) => {
				if (error.errMsg === 'request:fail timeout') {
					setTimeout(() => {
						uni.showToast({
							title: '请求超时...',
							icon: 'none'
						})
					}, 500);
				}
				reject(error)
			},
			complete: () => {
				if (loadingOptions.showLoading) {
					uni.hideLoading();
				}
			}
		})
	});
}

function responseHandle(response, url, resolve, reject) {
	if (response.statusCode === 500) {
		setTimeout(() => {
			uni.showToast({
				title: '服务器错误',
				icon: 'loading'
			})
		}, 500);
		return reject('服务器错误');
	} else if (response.statusCode === 401) {
		setTimeout(() => {
			uni.showToast({
				title: '身份过期！请重新授权登录',
				icon: 'loading'
			})
		}, 500);
		return reject('身份过期！请重新登录');
	} else {
		// 用户已被注销
		if (response.data.returnCode === '202' && !url.endsWith('user/saveSellerInfo')) {
			uni.showToast({
				icon: 'loading',
				title: '该用户已注销...'
			});
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/seller/login',
					fail: (err) => {
						console.log(err);
					}
				})
			}, 1500);
		}
		return resolve(response.data);
	}
}

export default {
	get,
	post,
	put,
	requestDelete
}
