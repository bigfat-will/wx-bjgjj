package cn.smallfat.commons.utils;

/**
 * Created by will on 2017/8/20.
 */
public class Param {
    private String url;
    private String data;

    public Param(String url,String data){
        this.url = url;
        this.data = data;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Param{" +
                "url='" + url + '\'' +
                ", data='" + data + '\'' +
                '}';
    }
}
