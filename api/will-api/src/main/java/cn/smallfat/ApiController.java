package cn.smallfat;

import cn.smallfat.commons.utils.Result;
import cn.smallfat.service.api.IApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by will on 2017/8/14.
 */
@Controller
@RequestMapping(value="api")
public class ApiController {

    @Autowired
    private IApiService apiService;

    @RequestMapping(value="login")
    @ResponseBody
    public Result login(@RequestParam String data){

        return apiService.loginApi(data);
    }
    @RequestMapping(value="getOpenBanks")
    @ResponseBody
    public Result getOpenBanks(@RequestParam String data){

        return apiService.getOpenBanks(data);
    }
    @RequestMapping(value="getUserBankInfo")
    @ResponseBody
    public Result getUserBankInfo(@RequestParam String data){

        return apiService.getUserBankInfo(data);
    }

}
