package cn.smallfat.commons.utils;

/**
 * Created by will on 2017/8/20.
 */
public class Result {
    private boolean success;

    private String message;

    private Object data;

    public Result(boolean success){
        this.success = success;
    }

    public Result(boolean success,Object data){
        this.success = success;
        this.data = data;
    }

    public Result(boolean success,Object data,String message){
        this.success = success;
        this.data = data;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Result{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
