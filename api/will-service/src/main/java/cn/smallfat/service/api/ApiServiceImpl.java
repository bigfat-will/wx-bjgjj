package cn.smallfat.service.api;

import cn.smallfat.commons.utils.HttpHttpClientUtils;
import cn.smallfat.commons.utils.Param;
import cn.smallfat.commons.utils.Result;
import okhttp3.Response;
import org.springframework.stereotype.Service;

/**
 * Created by will on 2017/8/20.
 */
@Service
public class ApiServiceImpl implements IApiService {

    @Override
    public Result loginApi(String data) {
        String url = "*";
        Param param = new Param(url,data);
        Result result = HttpHttpClientUtils.httpPost(param);

        return result;
    }

    @Override
    public Result getOpenBanks(String data) {
        String url = "";
        Param param = new Param(url,data);
        Result result = HttpHttpClientUtils.httpPost(param);

        return result;
    }

    @Override
    public Result getUserBankInfo(String data) {
        String url = "";
        Param param = new Param(url,data);
        Result result = HttpHttpClientUtils.httpPost(param);

        return result;
    }
}
