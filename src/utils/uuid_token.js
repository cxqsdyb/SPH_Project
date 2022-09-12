import { v4 as uuidv4 } from 'uuid';
// 如果本地有用户id，就不用生成新的！
export const getUUID = () => {
    // 从本地存储读取
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if(!uuid_token){
      // 如果没有，生成！
      uuid_token = uuidv4();
      localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token
}