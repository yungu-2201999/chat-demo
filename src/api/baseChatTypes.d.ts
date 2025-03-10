
type GenerateData = {
  model: string;
  prompt: string;// 输入的内容
  suffix?: string;// 后缀内容
  images?: string[];// 图片内容
  format?: string;// 输入格式，如text、markdown、html等
  options?: string;
  system?: string;
  template?: string;
  stream?: boolean;
  raw?: string;
  keep_alive?: string;

}

export {GenerateData};
