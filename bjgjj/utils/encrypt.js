import DES from './3DES'
import Base64 from './Base64'
import MD5 from './MD5'
import SHA1 from './SHA1'

	var appid = 'WX-0631-0001',
		appkey = 'c82781188a2de6cf1c271a54c82781188a2de6cf54f1af3d',
		siteid = '371000'

function getPostParam(param) {
		var package_ = {
			head: {
				siteid: siteid,
				appid: appid,
				sign: DES.encrypt_string(appkey, MD5.hex_md5(Base64.encode(appid + JSON.stringify(param)))),
				version: "2.0"
			},
			body: param
		}

    return JSON.stringify(package_);
	}
module.exports = {
  getPostParam: getPostParam
}
