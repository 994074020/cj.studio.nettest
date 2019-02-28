$(document).ready(function(){
	$(".portlet .net-protocols > ul > li>input[name='net-protocol']").on('click',function(){
		$(this).parents("ul").find(">li>input").prop('checked',false);
		var netprotocol=$(this).attr('id');
		var mid=$(this).parents('.main-column-lets').find('.portlet[position]').attr('mid');
		if(typeof mid=='undefined'){
			$(this).prop('checked',false);
			alert('您未选中任何服务方法');
			return;
		}
		var the=$(this);
		$.get('./views/netprotocol-save.service',{netprotocol:netprotocol,mid:mid},function(data){
			the.prop('checked',true);
		}).error(function(e){
			alert(e.responseText);
		});
	});
	$('.portlet .headline > ul > li > input:text').on('change',function(){
		var mid=$(this).parents('.main-column-lets').find('.portlet[position]').attr('mid');
		if(typeof mid=='undefined'){
			$(this).val('');
			alert('您未选中任何服务方法');
			return;
		}
		var ul=$(this).parents('ul');
		var cmd=ul.children('li.cmd').find('input').val();
		var url=ul.children('li.url').find('input').val();
		var protocol=ul.children('li.prot').find('input').val();
		$.post('./views/headline-save.service',{mid:mid,cmd:cmd,url:url,protocol:protocol},function(data){
			
		}).error(function(e){
			alert(e.responseText);
		});
	});
	var reqPanels=$('.portlet .settings > .tab-panels');
	reqPanels.find('.tab-panel.parameter').undelegate('.tab-table-cell input:text','change');
	reqPanels.find('.tab-panel.parameter').delegate('.tab-table-cell input:text','change',function(){
		var mid=$('.main-column-lets').find('.portlet[position]').attr('mid');
		if(typeof mid=='undefined'){
			$(this).val('');
			alert('您未选中任何服务方法');
			return;
		}
		var row=$(this).parents('.tab-table-row');
		var id=row.attr('id');
		var key=row.find('.tab-table-cell.key input:text').val();
		var value=row.find('.tab-table-cell.value input:text').val();
		var desc=row.find('.tab-table-cell.desc input:text').val();
		var pos=row.index();
		var len=row.parent('ul').find('.tab-table-row.t-content').length;
		if(pos==len-1){
			var crow=row.clone();
			crow.find('input:text').val('');
			crow.removeAttr('id');
			row.parent('ul').append(crow);
		}
		if(typeof id=='undefined'||id==''){
			$.post('./views/request-parameter-save.service',{mid:mid,key:key,value:value,desc:desc},function(data){
				var obj=$.parseJSON(data);
				row.attr("id",obj.id);
			}).error(function(e){
				alert(e.responseText);
			});
			return;
		}
		$.post('./views/request-parameter-update.service',{mid:mid,id:id,key:key,value:value,desc:desc},function(data){
		}).error(function(e){
			alert(e.responseText);
		});
	});
	reqPanels.find('.tab-panel.parameter').undelegate('.tab-table-cell.op span','click');
	reqPanels.find('.tab-panel.parameter').delegate('.tab-table-cell.op span','click',function(){
		var row=$(this).parents('.tab-table-row');
		var id=row.attr('id');
		if(typeof id=='undefined'||id=='')return;
		$.get('./views/request-parameter-delete.service',{id:id},function(data){
			row.remove();
		}).error(function(e){
			alert(e.responseText);
		});
	});
	
	reqPanels.find('.tab-panel.header').undelegate('.tab-table-cell input:text','change');
	reqPanels.find('.tab-panel.header').delegate('.tab-table-cell input:text','change',function(){
		var mid=$('.main-column-lets').find('.portlet[position]').attr('mid');
		if(typeof mid=='undefined'){
			$(this).val('');
			alert('您未选中任何服务方法');
			return;
		}
		var row=$(this).parents('.tab-table-row');
		var id=row.attr('id');
		var key=row.find('.tab-table-cell.key input:text').val();
		var value=row.find('.tab-table-cell.value input:text').val();
		var desc=row.find('.tab-table-cell.desc input:text').val();
		var pos=row.index();
		var len=row.parent('ul').find('.tab-table-row.t-content').length;
		if(pos==len-1){
			var crow=row.clone();
			crow.find('input:text').val('');
			crow.removeAttr('id');
			row.parent('ul').append(crow);
		}
		if(typeof id=='undefined'||id==''){
			$.post('./views/request-header-save.service',{mid:mid,key:key,value:value,desc:desc},function(data){
				var obj=$.parseJSON(data);
				row.attr("id",obj.id);
			}).error(function(e){
				alert(e.responseText);
			});
			return;
		}
		$.post('./views/request-header-update.service',{mid:mid,id:id,key:key,value:value,desc:desc},function(data){
		}).error(function(e){
			alert(e.responseText);
		});
	});
	reqPanels.find('.tab-panel.header').undelegate('.tab-table-cell.op span','click');
	reqPanels.find('.tab-panel.header').delegate('.tab-table-cell.op span','click',function(){
		var row=$(this).parents('.tab-table-row');
		var id=row.attr('id');
		if(typeof id=='undefined'||id=='')return;
		$.get('./views/request-header-delete.service',{id:id},function(data){
			row.remove();
		}).error(function(e){
			alert(e.responseText);
		});
	});
	
	reqPanels.find('.tab-panel.content .radios').undelegate('li input:radio','click');
	reqPanels.find('.tab-panel.content .radios').delegate('li input:radio','click',function(){
		$(this).parents('ul.radios').find('li input:radio').prop('checked',false);
		var mid=$('.main-column-lets').find('.portlet[position]').attr('mid');
		if(typeof mid=='undefined'){
			$(this).val('');
			alert('您未选中任何服务方法');
			return;
		}
		var type=$(this).attr('id');
		var the=$(this);
		$.get('./views/request-content-type-save.service',{mid:mid,type:type},function(data){
			the.prop('checked',true);
		}).error(function(e){
			alert(e.responseText);
		});
	});
	
	reqPanels.find('.tab-panel.content').undelegate('.tab-panels > .tab-panel.Any > textarea','change');
	reqPanels.find('.tab-panel.content').delegate('.tab-panels > .tab-panel.Any > textarea','change',function(){
		var mid=$('.main-column-lets').find('.portlet[position]').attr('mid');
		if(typeof mid=='undefined'){
			$(this).val('');
			alert('您未选中任何服务方法');
			return;
		}
		var content=$(this).val();
		$.post('./views/request-content-any-save.service',{mid:mid,content:content},function(){
			
		}).error(function(e){
			alert(e.responseText);
		});
	});
	
	reqPanels.find('.tab-panel.x-www-form-urlencode').undelegate('.tab-table-cell input:text','change');
	reqPanels.find('.tab-panel.x-www-form-urlencode').delegate('.tab-table-cell input:text','change',function(){
		var mid=$('.main-column-lets').find('.portlet[position]').attr('mid');
		if(typeof mid=='undefined'){
			$(this).val('');
			alert('您未选中任何服务方法');
			return;
		}
		var row=$(this).parents('.tab-table-row');
		var id=row.attr('id');
		var key=row.find('.tab-table-cell.key input:text').val();
		var value=row.find('.tab-table-cell.value input:text').val();
		var desc=row.find('.tab-table-cell.desc input:text').val();
		var pos=row.index();
		var len=row.parent('ul').find('.tab-table-row.t-content').length;
		if(pos==len-1){
			var crow=row.clone();
			crow.find('input:text').val('');
			crow.removeAttr('id');
			row.parent('ul').append(crow);
		}
		if(typeof id=='undefined'||id==''){
			$.post('./views/request-content-xwww-save.service',{mid:mid,key:key,value:value,desc:desc},function(data){
				var obj=$.parseJSON(data);
				row.attr("id",obj.id);
			}).error(function(e){
				alert(e.responseText);
			});
			return;
		}
		$.post('./views/request-content-xwww-update.service',{mid:mid,id:id,key:key,value:value,desc:desc},function(data){
		}).error(function(e){
			alert(e.responseText);
		});
	});
	reqPanels.find('.tab-panel.x-www-form-urlencode').undelegate('.tab-table-cell.op span','click');
	reqPanels.find('.tab-panel.x-www-form-urlencode').delegate('.tab-table-cell.op span','click',function(){
		var row=$(this).parents('.tab-table-row');
		var id=row.attr('id');
		if(typeof id=='undefined'||id=='')return;
		$.get('./views/request-content-xwww-delete.service',{id:id},function(data){
			row.remove();
		}).error(function(e){
			alert(e.responseText);
		});
	});
	
	reqPanels.find('.tab-panel.Form-Data').undelegate('.tab-table-cell input:text','change');
	reqPanels.find('.tab-panel.Form-Data').delegate('.tab-table-cell input:text','change',function(){
		var mid=$('.main-column-lets').find('.portlet[position]').attr('mid');
		if(typeof mid=='undefined'){
			$(this).val('');
			alert('您未选中任何服务方法');
			return;
		}
		var row=$(this).parents('.tab-table-row');
		var id=row.attr('id');
		var key=row.find('.tab-table-cell.key input:text').val();
		var value=row.find('.tab-table-cell.value input:text').val();
		var desc=row.find('.tab-table-cell.desc input:text').val();
		var pos=row.index();
		var len=row.parent('ul').find('.tab-table-row.t-content').length;
		if(pos==len-1){
			var crow=row.clone();
			crow.find('input:text').val('');
			crow.removeAttr('id');
			row.parent('ul').append(crow);
		}
		if(typeof id=='undefined'||id==''){
			$.post('./views/request-content-formdata-save.service',{mid:mid,key:key,value:value,desc:desc},function(data){
				var obj=$.parseJSON(data);
				row.attr("id",obj.id);
			}).error(function(e){
				alert(e.responseText);
			});
			return;
		}
		$.post('./views/request-content-formdata-update.service',{mid:mid,id:id,key:key,value:value,desc:desc},function(data){
		}).error(function(e){
			alert(e.responseText);
		});
	});
	reqPanels.find('.tab-panel.Form-Data').undelegate('.tab-table-cell.op span','click');
	reqPanels.find('.tab-panel.Form-Data').delegate('.tab-table-cell.op span','click',function(){
		var row=$(this).parents('.tab-table-row');
		var id=row.attr('id');
		if(typeof id=='undefined'||id=='')return;
		$.get('./views/request-content-formdata-delete.service',{id:id},function(data){
			row.remove();
		}).error(function(e){
			alert(e.responseText);
		});
	});
})