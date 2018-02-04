package cn.smallfat.service.api;

import cn.smallfat.commons.utils.Result;

/**
 * Created by will on 2017/8/20.
 */
public interface IApiService {
    Result loginApi(String data);
    Result getOpenBanks(String data);
    Result getUserBankInfo(String data);
}
