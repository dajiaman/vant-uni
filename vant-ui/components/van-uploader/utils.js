const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;

function isImageUrl(url) {
	return IMAGE_REGEXP.test(url);
}

export function isImageFile(item) {
	if (item.type) {
		return item.type.indexOf('image') === 0;
	}

	if (item.path) {
		return isImageUrl(item.path);
	}

	if (item.url) {
		return isImageUrl(item.url);
	}

	return false;
}

export function isVideo(res, accept) {
	return accept === 'video';
}

export function chooseFile({ accept, multiple, capture, compressed, maxDuration, sizeType, camera, maxCount }) {
	switch (accept) {
		case 'image':
			return new Promise((resolve, reject) => {
				uni.chooseImage({
					count: multiple ? Math.min(maxCount, 9) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
					sourceType: capture,
					sizeType,
					success: resolve,
					fail: reject
				});
			});
		case 'media':
			// 拍摄或从手机相册中选择图片或视频。
			// 支持微信小程序
			return new Promise((resolve, reject) => {
				uni.chooseMedia({
					count: multiple ? Math.min(maxCount, 9) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
					sourceType: capture,
					maxDuration,
					sizeType,
					camera,
					success: resolve,
					fail: reject
				});
			});
		case 'video':
			return new Promise((resolve, reject) => {
				uni.chooseVideo({
					sourceType: capture,
					compressed,
					maxDuration,
					camera,
					success: resolve,
					fail: reject
				});
			});
		default:
			return new Promise((resolve, reject) => {
				// 只支持小程序
				wx.chooseMessageFile({
					count: multiple ? maxCount : 1, // 最多可以选择的数量，如果不支持多选则数量为1
					type: 'file',
					success: resolve,
					fail: reject
				});
			});
	}
}

export function isFunction(val) {
	return typeof val === 'function';
}

export function isObject(val) {
	return val !== null && typeof val === 'object';
}

export function isPromise(val) {
	return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
