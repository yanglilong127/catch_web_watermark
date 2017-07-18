//封装组件插件

(function(root,factory,plug){
	factory.call(root,root.jQuery,plug);
})(window,function($,plug){
	//默认模版
	var __DEF_TEMP__ = '<p class="p1">{text1}</p><p class="p2">{text2}</p><p class="finish">完成</p>';
	//默认参数
	var __DEFAULT__ = {
		activeIndex:0,  //默认为0
		stepData:[],    //默认空
	};
	//默认方法
	var __PROTO__ = {
		_init : function(){
			this.$steps=this.addClass('myText').css('color','red');
			this.$box=$('#box');
			//....
		},
		_genSteps:function(){
			var _$this=this;
			var _$steps=this.$steps;
			var _$box=this.$box;
			$.each(this.stepData,function(i,elem){
				$('#box').append(_$this._genStepByTemplate(__DEF_TEMP__,elem));
			});
			_$box.find('p.finish').on('click',function(){
				var _index=$(this).index();
				_$this.trigger('finish',[_index]);  //触发finish事件
			});
			$('#box p').eq(this.activeIndex).css('color','pink');

			
		},
		_genStepByTemplate:function(temp,data){
			for(var prop in data){
				temp=temp.replace('{'+prop+'}',data[prop]);
			}
			return temp;
		}
	};

	$.fn[plug]= function(options){
		$.extend(this,__PROTO__,__DEFAULT__,options);//扩展
		this._init(); //初始化板块信息
		this._genSteps(); //生成一些东西
		return this;
	}

},'uiGuide');