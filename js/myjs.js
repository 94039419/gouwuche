

window.onload=function(){
	
	function g(id){
		if(id.substr(0,1)=="."){
			return document.getElementsByClassName(id.substr(1))	
		}
		return document.getElementById(id);	
	}
	
	for(var a=0;a<g(".checkBox").length;a++){
		g(".checkBox")[a].onclick=function(){									//循环所有选择按钮
			if(this.className=="checkAll checkBox"){							//如果选中全选按钮，就把所有按钮的checked设为全选按钮的checked值
				for(var b=0;b<g(".checkBox").length;b++){
					g(".checkBox")[b].checked=this.checked;
					calculation();
				}
			}
			if(this.className=="checkSingle checkBox"){						//如果选择单个按钮，就把改行的价格和数量
				calculation();
				
			}
			if(this.checked==false){									//当有一个checkbox未被选中
				for(var c=0;c<g(".checkAll").length;c++){
					g(".checkAll")[c].checked=false;
				}
			}
		}
	}
	g(".checkAll checkBox")[0].checked=true;
	g(".checkBox")[0].onclick();
	
	function calculation(){														//定义一个计算函数
		var selectNum=0;
		var	totleNum=0;
		var newStr="";
		for(var i=0;i<g(".body_tr").length;i++){			//遍历每行的，当其第一input元素被选中时，把其第二个input值和第四个td元素的值获取到
			if(	g(".body_tr")[i].getElementsByTagName("input")[0].checked){
				selectNum+=parseInt(g(".body_tr")[i].getElementsByTagName("input")[1].value);
				totleNum+=parseFloat(g(".body_tr")[i].getElementsByTagName("td")[4].innerHTML);
				
				g(".body_tr")[i].className="body_tr trOn";
				
				newStr+='<div href="#" class="imgItem" id="imgItem'+(i+1)+'">'+										//拼接字符串，在显示区动态生成图片
               			 	'<img src="images/'+(i+1)+'.jpg" />'+
                 		   '<span class="cancel" id="cancel'+(i+1)+'">取消选择</span>'+
             			   '</div>';
				   
				
			}else{
				g(".body_tr")[i].className="body_tr";
			}
			
		}
		g("showImg").innerHTML=newStr;	
		g("number").innerHTML=selectNum;
		g("totle").innerHTML=totleNum.toFixed(2);
	}

	g("selectted").onclick=function(){									//点击下方“显示已选商品”，就动态生成新的图片，以及变化“+”和“-”的符号
		if(parseInt(g("number").innerHTML)!=0){
			if(g("showImg").className=="showImg"){
				g("showImg").className="showImg showImgShow";

			}else if(g("showImg").className=="showImg showImgShow"){
				g("showImg").className="showImg";

			}
		}
	}
	
	g("showImg").onclick=function(e){				//因为显示的图片是动态生成，在显示图片区域的父元素上定义一个点击事件
		e=e||window.event;							//解决兼容性问题
		var eTarget= e.srcElement||e.target;
		var index=0;							
		if(eTarget.id){													
			index=parseInt(eTarget.id.substr(6));			//获取动态生成图片的id，方式是从id的“cancel2”的第6个下标位置开始取值
			g(".body_tr")[index-1].getElementsByTagName("input")[0].checked=false; //用获取的位置，删除该位置（行）中input的勾选
			calculation();
		}
		if(parseInt(g("number").innerHTML)==0){
			g("showImg").className="showImg";
		}
	}
	
	
	
	for(var i=0;i<g(".body_tr").length;i++){					//委托“加减”span标签的父元素，各自点击后，增加或减减
		g(".body_tr")[i].onclick=function(e){
			e=e||window.event;
			var targetEle= e.srcElement||e.target;
			var input=this.getElementsByTagName("input")[1];
			var inputV=parseInt(this.getElementsByTagName("input")[1].value);
			var reduce=this.getElementsByTagName("span")[1];
			if(targetEle.className=="plus numerSpan"){			//当点击加号时，input值加加，显示“-”
				input.value=inputV+1;
				subCalculation(this);
				
			}else if(targetEle.className=="reduce numerSpan"){
				if(input.value>0){								//当点击减号时，如果大于0，才会持续减减
					input.value=inputV-1;
				}
				if(input.value<=1){								//当值小于等于1时，“-”变成空值
				}
				subCalculation(this);
			}
			calculation();
		}
		
		g(".body_tr")[i].getElementsByTagName("input")[1].onkeyup=function(){			//当手动输入商品数量后，计算小计值
			if(this.value>0){															//如果值大于0，还是要现实“-”
				this.parentNode.parentNode.parentNode.getElementsByTagName("span")[1].innerHTML="-";
			}else{
				this.parentNode.parentNode.parentNode.getElementsByTagName("span")[1].innerHTML="&nbsp;";
				}
			if(this.value<0||isNaN(this.value)){						// 如果输入的值小于0,或者输入的不是数字，那他的值就设为0
				this.value=0;
			}
			subCalculation(this.parentNode.parentNode.parentNode);	
			calculation();
		}
		
		g(".body_tr")[i].getElementsByTagName("a")[0].onclick=function(){		//删除单行
			var conf=confirm("确定要删除这一行么？");
			if(conf){
				this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);		//用a标签爷爷的爸爸，删除爷爷
			}
		}
		
	}
	
	function subCalculation(tr){						//定义一个函数，随着数量增减，计算出小计的值（传入当前行数的tr）
		var price=parseFloat(tr.cells[2].innerHTML);
		var number=parseInt(tr.getElementsByTagName("input")[1].value);
		var subCal=price*number;
		subCal=subCal.toFixed(2);
		tr.cells[4].innerHTML=subCal;
	}
	
	g("deleteAll").onclick=function(){						//多行删除	
		var conf=confirm("确定要删除所选的商品么？");
		if(conf){
			for(var i=0;i<g(".body_tr").length;i++){			
				if(g(".body_tr")[i].getElementsByTagName("input")[0].checked){		//如果改行的input标签被选中，那么删除改行
					g(".body_tr")[i].parentNode.removeChild(g(".body_tr")[i]);
					i--;															//数组某个元素被删后，index总动加1会妨碍元素的操作
				}
				
			}
		}
	}
	
	
	
}



