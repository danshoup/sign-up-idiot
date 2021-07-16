

var victorApp=angular.module('myapp',[])



victorApp.controller('main', ['$scope', function ($scope) {

	$("html").click(function(){
		if ($("#icon_calendar").width()!=80) {
			ok=0
			$("#icon_calendar").css({width:80,height:80,borderRadius:"18px",marginLeft:-40,marginTop:-40,animation:"bounce2 0.3s",cursor:"pointer",transform:"scale(1)"})
			$(".mois").css({display:"none",fontSize:14,width:80})
			$(".days").css({fontFamily:"'openlight',sans-serif",display:"none",backgroundColor:"transparent",color:"#3C3C3C"})
			$("#month_wrap").css({backgroundColor:"transparent",color:"#F05252"})
			$("#month"+mois_choisi).css({marginLeft:0,display:"block"})
			$("#day"+jour_choisi).css({position:"absolute",fontSize:30,width:"100%",display:"block"})
			$(".fleches_mois").hide()
			console.log("eee")
		};
	})

	$("body").on('click',"#icon_calendar",function(event){
		event.stopPropagation();
		if ($(this).width()==80) {
			ok=1
			$(this).css({width:160,height:150,borderRadius:"7px",marginLeft:-80,marginTop:-75,animation:"bounce 0.3s",cursor:"initial",transform:"scale(1)"})
			$(".mois").css({display:"block",fontSize:18,width:100})
			$(".days").css({fontFamily:"'openbold',sans-serif",display:"block"})
			$("#month_wrap").css({backgroundColor:"#F05252",color:"rgb(240,240,240)"})
			$("#month"+mois_choisi).css("margin-left",30)

if (mois_choisi==ladate.getMonth()) 
{
 $("#day"+ladate.getDate()).css({position:"relative",fontSize:12,width:"calc(100%/7)",backgroundColor:"#2295EC",color:"rgb(240,240,240)"}) 
}
			$("#day"+jour_choisi).css({position:"relative",fontSize:12,width:"calc(100%/7)"})
			mois_retenu=mois_choisi
			console.log("lol")
			$(".fleches_mois").show()
			
		};
		
	})

	$("body").on("click",".days",function(event){
		event.stopPropagation();
		if ($("#icon_calendar").width()!=80) {
			ok=0
			$("#icon_calendar").css({width:80,height:80,borderRadius:"18px",marginLeft:-40,marginTop:-40,animation:"bounce2 0.3s",cursor:"pointer",transform:"scale(1)"})
			$(".mois").css({display:"none",fontSize:14,width:80})
			$(".days").css({fontFamily:"'openlight',sans-serif",display:"none",backgroundColor:"transparent",color:"#3C3C3C"})
			$("#month_wrap").css({backgroundColor:"transparent",color:"#F05252"})
			$("#month"+mois_choisi).css({marginLeft:0,display:"block"})
			jour_choisi=$(this).html()
			console.log($(this).html())
			$("body").trigger("mouseleave",".days")
			$("#day"+jour_choisi).css({position:"absolute",fontSize:30,width:"100%",display:"block"})
			$(".fleches_mois").hide()
		}
		else
		{
			ok=1
			$("#icon_calendar").css({width:160,height:150,borderRadius:"7px",marginLeft:-80,marginTop:-75,animation:"bounce 0.3s",cursor:"initial",transform:"scale(1)"})
			$(".mois").css({display:"block",fontSize:18,width:100})
			$(".days").css({fontFamily:"'openbold',sans-serif",display:"block"})
			$("#month_wrap").css({backgroundColor:"#F05252",color:"rgb(240,240,240)"})
			$("#month"+mois_choisi).css("margin-left",30)
			$("#day"+ladate.getDate()).css({position:"relative",fontSize:12,width:"calc(100%/7)",backgroundColor:"#2295EC",color:"rgb(240,240,240)"})
			$("#day"+jour_choisi).css({position:"relative",fontSize:12,width:"calc(100%/7)"})
			mois_retenu=mois_choisi
			$(".fleches_mois").show()
		}
		
	})

	$("body").on("mouseenter",".days",function(e){
		if ($("#icon_calendar").width()!=80) {
			$(this).css("font-size",20)
		};
	})
	$("body").on("mouseleave",".days",function(e){
		if (ok==1) {
			$(this).css("font-size",12)
		};
	})

	$("#icon_calendar").mouseenter(function(){
		if ($(this).width()==80) {
			$(this).css("transform","scale(1.1)")
		}
	})

	$("#icon_calendar").mouseleave(function(){
		if ($(this).width()==80) {
			$(this).css("transform","scale(1)")
		}
	})


	$(".fleches_mois").click(function() {
		var direct=eval($(this).attr("value"))
		var ladate=new Date()
		if (direct==-1 && mois_choisi>1) 
		{
			$("#month"+(mois_choisi+1)).css({marginLeft:230,opacity:0.15,textAlign:"left"})
			$("#month"+(mois_choisi)).css({marginLeft:130,opacity:0.15,textAlign:"left"})
			$("#month"+(mois_choisi-1)).css({marginLeft:30,opacity:1,textAlign:"center"})
			$("#month"+(mois_choisi-2)).css({marginLeft:-70,opacity:0.15,textAlign:"right"})
			mois_choisi--
			$scope.jours=[]
			for (var i = 1; i <=$scope.mois[mois_choisi-1]['days']; i++) {$scope.jours.push({day:i})}
			$scope.$apply()
			$(".days").css({fontFamily:"'openbold',sans-serif",display:"block"})
			if (mois_choisi==ladate.getMonth()+1) {
				$("#day"+ladate.getDate()).css({backgroundColor:"#2295EC",color:"rgb(240,240,240)"})
			};
			if (mois_choisi==1) {$("#fleche_mois1").hide()}
			else{$(".fleches_mois").show()}
		}

		else if (direct==1 && mois_choisi<12) 
		{
			$("#month"+(mois_choisi-1)).css({marginLeft:-170,opacity:0.15,textAlign:"right"})
			$("#month"+(mois_choisi)).css({marginLeft:-70,opacity:0.15,textAlign:"right"})
			$("#month"+(mois_choisi+1)).css({marginLeft:30,opacity:1,textAlign:"center"})
			$("#month"+(mois_choisi+2)).css({marginLeft:130,opacity:0.15,textAlign:"left"})
			mois_choisi++
			$scope.jours=[]
			for (var i = 1; i <=$scope.mois[mois_choisi-1]['days']; i++) {
				$scope.jours.push({day:i})
			}
			$scope.$apply()
			if (mois_choisi==ladate.getMonth()+1) {
				$("#day"+ladate.getDate()).css({backgroundColor:"#2295EC",color:"rgb(240,240,240)"})
			}
			$(".days").css({fontFamily:"'openbold',sans-serif",display:"block"})
			if (mois_choisi==12) {$("#fleche_mois2").hide()}
			else{$(".fleches_mois").show()}
		}
		return false
	})

	var ladate= new Date()
	var mois_choisi=ladate.getMonth()+1
	var jour_choisi=ladate.getDate()

	$scope.mois=[
	{name:"January",days:31},
	{name:"Febrary",days:28},
	{name:"March",days:31},
	{name:"April",days:30},
	{name:"May",days:31},
	{name:"June",days:30},
	{name:"July",days:31},
	{name:"August",days:31},
	{name:"September",days:30},
	{name:"October",days:31},
	{name:"November",days:30},
	{name:"December",days:31}]
	var ok=0
	$scope.jours=[]
	for (var i = 1; i <=$scope.mois[mois_choisi-1]['days']; i++) {
		$scope.jours.push({day:i})
	}

	setTimeout(function(){
		for (var i = 1; i <=12; i++) {
			var j=mois_choisi-i
			if (j==0) {$("#month"+i).css({marginLeft:0,opacity:1,textAlign:"center",display:"block"})}
			else if (j==1) {$("#month"+i).css({marginLeft:-70,opacity:0.15,textAlign:"right"})}
			else if (j>0) {$("#month"+i).css({marginLeft:-170,opacity:0.15,textAlign:"right"})}
			else if (j==-1) {$("#month"+i).css({marginLeft:130,opacity:0.15,textAlign:"left "})}
			else if (j<0) {$("#month"+i).css({marginLeft:230,opacity:0.15,textAlign:"left "})}
		}
	})

	$scope.$apply()

	setTimeout(function(){
		$("#day"+jour_choisi).css({
			position:"absolute",
			fontSize:30,
			width:"100%",
			display:"block"
		})
	},10)


}]);

