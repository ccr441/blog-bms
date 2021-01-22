import { Message } from "element-ui";

export const msg = (str: string, type: any) => {
  Message({
    message: str,
    center: true,
    type: type
  });
};

export const formatTimeFun = (time: any, type?: string) => {
  const date = time;
  const year = date.getFullYear();
  let mon: any = date.getMonth() + 1;
  let day: any;
  mon = mon < 10 ? `0${mon}` : mon;
  day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  let h: any = date.getHours();
  h = h < 10 ? `0${h}` : `${h}`;
  let m: any = date.getMinutes();
  m = m < 10 ? `0${m}` : `${m}`;
  let s: any = date.getSeconds();
  s = s < 10 ? `0${s}` : `${s}`;
  const formatTime = type
    ? `${year}-${mon}-${day} ${h}:${m}:${s}`
    : `${year}-${mon}-${day}`;
  return formatTime;
};

export const openUrl = (name: any, query: any, ctx: any) => {
  const routeData = ctx.$router.resolve({
    name: name,
    query: query
  });
  if (routeData.href.includes("static")) {
    routeData.href = `#${routeData.href.split("#")[1]}`;
  }
  window.open(routeData.href, "_blank");
};
