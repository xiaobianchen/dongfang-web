import moment from "moment";

export enum FORMAT_TYPE {
    DATE = 1,
    TIME = 2,
}

export enum DATE_FORMAT  {
    DATE= 'YYYY-MM-DD',
    TIME= 'YYYY-MM-DD HH:mm:ss'
}

export const DEFAULT_RANGE = {
  '今天': [
    moment({hour: 0, minute: 0, seconds: 0}),
    moment({hour: 23, minute: 59, seconds: 59})
  ],
  '当前月': [
    moment({hour: 0, minute: 0, seconds: 0}).startOf('month'),
    moment({hour: 23, minute: 59, seconds: 59}).endOf('month')
  ]
};
