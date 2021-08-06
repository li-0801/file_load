export const request = ({
	url,
	method = 'post',
	data,
	headers = {},
	onProgress,
	requestList,
}) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		//set headers
		Object.keys(headers).forEach((key) =>
			xhr.setRequestHeader(key, headers[key])
		);
		xhr.upload.onprogress = onProgress;
		xhr.send(data);
		xhr.onload = (e) => {
			if (requestList && requestList.length > 0) {
				let itemIndex = requestList.findIndex((item) => item === xhr);
				requestList.splice(itemIndex, 1);
			}
			resolve({
				data: e.target.response,
			});
		};

		requestList?.push(xhr);
	});
};
