

export const getCurTime = () => {
    const now = new Date(); // 创建一个表示当前时间的Date对象

    const year = now.getFullYear(); // 获取年份
    const month = now.getMonth() + 1; // 获取月份（注意月份是从0开始的，所以要加1）
    const day = now.getDate(); // 获取日期
    const hours = now.getHours(); // 获取小时
    const minutes = now.getMinutes(); // 获取分钟
    const seconds = now.getSeconds(); // 获取秒

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
