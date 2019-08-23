import Vue from "vue";
// import {
//   Button,
//   Slider,
//   Dialog,
//   Input,
//   Select,
//   Form,
//   FormItem,
//   Option,
//   Message
// } from "element-ui";

// Vue.use(Button); //把button注册成全局组件 //部分引入
// Vue.use(Message);//message中没有install方法，无法把message的方法放到Vue的原型上，所以要使用他要么全部引入，要么在使用他的Vue文件的script脚本上引入import { Message } from 'element-ui';
// Vue.use(Slider);
// Vue.use(Dialog);
// Vue.use(Form);
// Vue.use(Input);
// Vue.use(Select);
// Vue.use(FormItem);
// Vue.use(Option);

import element from "element-ui"; //全部引入。
Vue.use(element);
