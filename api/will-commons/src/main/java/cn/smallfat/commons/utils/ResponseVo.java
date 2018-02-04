package cn.smallfat.commons.utils;

/**
 * Created by will on 2017/8/20.
 */
public class ResponseVo {
    private Head head;
    private String body;

    public Head getHead() {
        return head;
    }

    public void setHead(Head head) {
        this.head = head;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @Override
    public String toString() {
        return "ResponseVo{" +
                "head=" + head +
                ", body='" + body + '\'' +
                '}';
    }
}

class Head{
    private String rtnMsg;
    private String rtnCode;

    public String getRtnMsg() {
        return rtnMsg;
    }

    public void setRtnMsg(String rtnMsg) {
        this.rtnMsg = rtnMsg;
    }

    public String getRtnCode() {
        return rtnCode;
    }

    public void setRtnCode(String rtnCode) {
        this.rtnCode = rtnCode;
    }

    @Override
    public String toString() {
        return "Head{" +
                "rtnMsg='" + rtnMsg + '\'' +
                ", rtnCode='" + rtnCode + '\'' +
                '}';
    }
}

