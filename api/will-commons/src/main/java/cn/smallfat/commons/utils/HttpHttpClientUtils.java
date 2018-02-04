package cn.smallfat.commons.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.io.IOException;

/**
 * Created by will on 2017/8/20.
 */
public class HttpHttpClientUtils {
    private static Logger log = LoggerFactory.getLogger(HttpHttpClientUtils.class);
    private static final String SUCCESS_CODE = "000000";
    public static Result httpPost(Param param){
        log.info("param：{}",param);
        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json;charset=utf-8");
        RequestBody body = RequestBody.create(mediaType, param.getData());
        Request request = new Request.Builder()
                .url(param.getUrl())
                .post(body)
                .build();

        try {
            Response response = client.newCall(request).execute();
            int code = response.code();
            if(code == 200){
               String res = response.body().string();
               ResponseVo responseVo = JSON.parseObject(res,ResponseVo.class);
               log.info("response：{}",responseVo);
               if(SUCCESS_CODE.equals(responseVo.getHead().getRtnCode())){
                    return new Result(true,responseVo.getBody(),responseVo.getHead().getRtnMsg());
               }else{
                   return new Result(false,null,responseVo.getHead().getRtnMsg());
               }
            }


        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Result(false,null,"请求失败");

    }
}
