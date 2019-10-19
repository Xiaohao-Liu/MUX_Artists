

/**** Top Board*******/
var top_imgs = d3.select("#top_imgs_B_")
for(var i =0; i < Artists_name.length; i++){
	if(i === 19)continue;
	for(var j = 0; j< 3; j++){
		var name__ = Artists_name[i].split(" ").join("_")
		top_imgs.append("img").attr("class", "img").attr("src", "./best-artworks-of-all-time/images/" + name__+"/"+name__+"_"+(j+1)+".jpg")
	}
}
top_imgs.html(top_imgs.html() + top_imgs.html())

/******SVG Draw *******/



var svg = d3.select("#main_svg").attr("height", h*10 ).attr("width", w * .8)
var main_div = d3.select("#main_div").style("height", h*10 ).style("width", w * .8)

let life_y =  (year_length[1] - year_length[0])  * scale_y +130  ;
let year_line = [[50,10], [50, (year_length[1] - year_length[0])  * scale_y +180]]
var year = svg.append("path").attr("d", curve_generator(year_line)).attr("stroke", "black").attr("stroke-width", 2)
var year_note = svg.append("text").attr("stroke", "black").attr("x", 10).attr("y", 20)
	.text("age")
var year_toplim = svg.append("path").attr("d", curve_generator([[45,150], [50,150]])).attr("stroke", "black");
var year_topnote = svg.append("text").attr("stroke", "black").attr("x", 10).attr("y", 150)
	.text("0");
// var year_botlim = svg.append("path").attr("d", curve_generator([[45,year_line[1][1]-30], [50,year_line[1][1]-30]])).attr("stroke", "black")
// var year_botnote = svg.append("text").attr("stroke", "black").attr("x", 10).attr("y", year_line[1][1]-30)
// 	.text("1987")




var img_board = d3.select("#imgs_show");

img_board.style("display", "none");
var def_life_line = -1;
var life_line = main_div.selectAll("path_life_B") .data(Life).enter().append("div").attr("class","path_life_B").attr("id", function(d,i){return "path_life_B"+i;})
	.style("top", function(d, i){
		return  50;
	})
	.style("left",function(d, i){
		return mapping[i]*life_x_step + life_x_margin - 4;
	});

life_line.append("div").attr("class","path_life").attr("id", function(d,i){return "path_life"+i;})
.style("top", function(d, i){
	return  0;
})
.style("height", function(d, i){
	return (d[1] - d[0]) * scale_y;
}).style("background",function(d,i){
	return Artists_colors[i];
})
.on("click",  function(d,i){
	// d3.select(this)
	// .style("left",function(d, i){
	// 	return w*.8*.2;
	// })
	// .style("height", function(d, i){
	// 	return 500;
	// }).style("z-index", 5).style("width", "60%").style("padding","0px 0px").style("border-radius",5)
	// img_board.style("display", "block");
	// show_imgs(i, (d[0] - year_length[0] ) * scale_y+ 50);
	//
	// def_life_line = i;
})

life_line.append("div").attr("class", "path_life_name").text(function(d,i){return Artists_name[i]})


/**********TEST*****/
// var life_line_name = main_div.selectAll("path_life") .data(Life).enter().append("div").attr("id", function(d,i){return "path_life"+i;})
// 	.style("position", "absolute").style("top", function(d, i){
// 		return  (d[0] - year_length[0] ) * scale_y+ 50;
// 	})
// 	.style("left",function(d, i){
// 		return mapping[i]*life_x_step + life_x_margin + 10;
// 	}).text(function(d,i){
// 		return Artists_name[i]
// 	}).style("font-size", 14)


d3.select("#close").on("click",function(){
	img_board.style("display", "none");
	mode = 0;
		show_imgs_show();
		mode_change.style("background-color","#8d8de0");
	life_line.filter(function(d,i){
		if(i === def_life_line)return true;
		else return false;
	})
	.style("left",function(d, i){
		return mapping[def_life_line]*life_x_step + life_x_margin - 30;
	}).style("z-index", 1).style("width", 10).style("border-radius",10).select(".path_life").style("height", function(d, i){
		return (d[1] - d[0]) * scale_y;
	})


})


var life_line_dash = svg.selectAll("path_life_dash") .data(Life).enter().append("path")
.attr("d", function(d, i){
	_0 = [mapping[i]*life_x_step + life_x_margin, (d[1] - year_length[0] ) * scale_y+ 150]
	_1 = [mapping[i]*life_x_step + life_x_margin,  (year_length[1] - year_length[0])  * scale_y    +185]
	return curve_generator([_0, _1])
}).attr("stroke", function(d,i){return Artists_colors[i];}).attr("stroke-width", 1)



function circle_show(){
	var artists_circle = main_div.selectAll("circle_").data(Artists_name).enter().append("div").attr("class","cicle_price")
		.style("left", function(d,i){
			return mapping[i]*life_x_step + life_x_margin - (Artists_price[mapping[i]] / 10000000 + 3)/2;
		})
		.style("top", function(d,i){
			return(year_length[1] - year_length[0])  * scale_y +180 + 5  - (Artists_price[mapping[i]] / 10000000 + 3)/2
		})
		.style("height", function(d,i){
			return Artists_price[mapping[i]] / 10000000 + 3;
		}).style("width", function(d,i){
			return Artists_price[mapping[i]] / 10000000 + 3;
		})

		.style("background-color", function(d,i){return Artists_colors[i];}).on("mouseenter", function(d,i){
			if(Artists_price[mapping[i]] == 0)return null;
			else d3.select(this).text(Artists_price[mapping[i]]).style("z-index", 2)
		}).on("mouseout",function(d,i){d3.select(this).text("").style("z-index", 1)})

}

function lifenodes_(){
var life_nodes0= main_div.select("#path_life0").selectAll("path_life_nodes").data(Colors0).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes1= main_div.select("#path_life1").selectAll("path_life_nodes").data(Colors1).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes2= main_div.select("#path_life2").selectAll("path_life_nodes").data(Colors2).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes3= main_div.select("#path_life3").selectAll("path_life_nodes").data(Colors3).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes4= main_div.select("#path_life4").selectAll("path_life_nodes").data(Colors4).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes5= main_div.select("#path_life5").selectAll("path_life_nodes").data(Colors5).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes6= main_div.select("#path_life6").selectAll("path_life_nodes").data(Colors6).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes7= main_div.select("#path_life7").selectAll("path_life_nodes").data(Colors7).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes8= main_div.select("#path_life8").selectAll("path_life_nodes").data(Colors8).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes9= main_div.select("#path_life9").selectAll("path_life_nodes").data(Colors9).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes10= main_div.select("#path_life10").selectAll("path_life_nodes").data(Colors10).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes11= main_div.select("#path_life11").selectAll("path_life_nodes").data(Colors11).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes12= main_div.select("#path_life12").selectAll("path_life_nodes").data(Colors12).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes13= main_div.select("#path_life13").selectAll("path_life_nodes").data(Colors13).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes14= main_div.select("#path_life14").selectAll("path_life_nodes").data(Colors14).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes15= main_div.select("#path_life15").selectAll("path_life_nodes").data(Colors15).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes16= main_div.select("#path_life16").selectAll("path_life_nodes").data(Colors16).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes17= main_div.select("#path_life17").selectAll("path_life_nodes").data(Colors17).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes18= main_div.select("#path_life18").selectAll("path_life_nodes").data(Colors18).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes19= main_div.select("#path_life19").selectAll("path_life_nodes").data(Colors19).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes20= main_div.select("#path_life20").selectAll("path_life_nodes").data(Colors20).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes21= main_div.select("#path_life21").selectAll("path_life_nodes").data(Colors21).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes22= main_div.select("#path_life22").selectAll("path_life_nodes").data(Colors22).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes23= main_div.select("#path_life23").selectAll("path_life_nodes").data(Colors23).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes24= main_div.select("#path_life24").selectAll("path_life_nodes").data(Colors24).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes25= main_div.select("#path_life25").selectAll("path_life_nodes").data(Colors25).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes26= main_div.select("#path_life26").selectAll("path_life_nodes").data(Colors26).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes27= main_div.select("#path_life27").selectAll("path_life_nodes").data(Colors27).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes28= main_div.select("#path_life28").selectAll("path_life_nodes").data(Colors28).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes29= main_div.select("#path_life29").selectAll("path_life_nodes").data(Colors29).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes30= main_div.select("#path_life30").selectAll("path_life_nodes").data(Colors30).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes31= main_div.select("#path_life31").selectAll("path_life_nodes").data(Colors31).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes32= main_div.select("#path_life32").selectAll("path_life_nodes").data(Colors32).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes33= main_div.select("#path_life33").selectAll("path_life_nodes").data(Colors33).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes34= main_div.select("#path_life34").selectAll("path_life_nodes").data(Colors34).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes35= main_div.select("#path_life35").selectAll("path_life_nodes").data(Colors35).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes36= main_div.select("#path_life36").selectAll("path_life_nodes").data(Colors36).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes37= main_div.select("#path_life37").selectAll("path_life_nodes").data(Colors37).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes38= main_div.select("#path_life38").selectAll("path_life_nodes").data(Colors38).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes39= main_div.select("#path_life39").selectAll("path_life_nodes").data(Colors39).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes40= main_div.select("#path_life40").selectAll("path_life_nodes").data(Colors40).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes41= main_div.select("#path_life41").selectAll("path_life_nodes").data(Colors41).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes42= main_div.select("#path_life42").selectAll("path_life_nodes").data(Colors42).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes43= main_div.select("#path_life43").selectAll("path_life_nodes").data(Colors43).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes44= main_div.select("#path_life44").selectAll("path_life_nodes").data(Colors44).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes45= main_div.select("#path_life45").selectAll("path_life_nodes").data(Colors45).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes46= main_div.select("#path_life46").selectAll("path_life_nodes").data(Colors46).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes47= main_div.select("#path_life47").selectAll("path_life_nodes").data(Colors47).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes48= main_div.select("#path_life48").selectAll("path_life_nodes").data(Colors48).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
var life_nodes49= main_div.select("#path_life49").selectAll("path_life_nodes").data(Colors49).enter().append("div").attr("class","rect_artwork").style("background",function(d,i){return "linear-gradient(to left,"+d.colors[0]+", "+d.colors[1]+")"});
}
lifenodes_()

/************Part1-2***************/

function marriage_show(){
	for(var  n = 0; n < 50; n++)
	{
		main_div.select("#path_life"+n+"").selectAll("path_life_nodes").data(Artists_marriage[n]).enter().append("div").attr("class", "marriage_bar")
				.style("top", function(d,i){
					// if(d[0] - Life[n][0] < 0){alert(n)}
					return (d[0] - Life[n][0])*scale_y;
				}).style("height",function(d){
					return (d[1]-d[0])*scale_y;
				})
	}
}
var work_B = d3.select("#work_B")
function works_show(){
	for(var n = 0; n < 50; n++){
		main_div.select("#path_life"+n+"").selectAll("path_life_nodes").data(Artists_work[n]).enter().append("div").attr("class", "work_bar")
				.style("top", function(d,i){
					// if(d[1] > Life[n][1] ){alert(n);alert(Life[n])}
					return (d[1] - Life[n][0])*scale_y;
				}).style("background",function(d){
					return "linear-gradient(to left,"+d[0][0]+", "+d[0][1]+")";
				}).on("mouseover", function(d){
					console.log(d)
					work_B.style("display","block")
					.style("top", parseInt(this.style.top.split("px")) +(year_length[1] - year_length[0])  * scale_y    +150 - 100*scale_y + 25 )
					.style("background-image",
						"url(./best-artworks-of-all-time/resized/resized/"+d[2]+".jpg)"
					)
				}).on("mouseout", function(d){	img_board.style("width", "30%");

					work_B.style("display","none")
					
				})
	}
}


function marriage_and_work_show(){
	year_note.transition().duration(500).attr("y", ((year_length[1] - year_length[0])  * scale_y    - 100*scale_y))
		.text("age")
	year_toplim.transition().duration(500).attr("d", curve_generator([[45,(year_length[1] - year_length[0])  * scale_y    +150 - 100*scale_y], [50,(year_length[1] - year_length[0])  * scale_y    +50 - 100*scale_y]]))
	year_topnote.transition().duration(500).attr("y", ((year_length[1] - year_length[0])  * scale_y    +150 - 100*scale_y))
		.text("0")
	// year_botnote.transition().duration(1000).attr("y", (year_line[1][1]-30))
	// 	.text("100")
	life_line.select(".path_life").html("")
	svg.selectAll(".lims").remove()
	marriage_show();
	works_show();

	life_line
		.style("top", function(d, i){
			return  (year_length[1] - year_length[0])  * scale_y    +150 - 100*scale_y - 3;
		})
		.style("left",function(d, i){
			return mapping[i]*life_x_step + life_x_margin -1.5;
		})
		.style("width", 3);
	life_line.select(".path_life").style("overflow", "visible").style("padding","0").style("display", "block")



	life_line_dash.transition().duration(500).attr("d", function(d, i){
		_0 = [mapping[i]*life_x_step + life_x_margin, (year_length[1] - year_length[0])  * scale_y    +130 -  (100 - (d[1]-d[0])) * scale_y]
		_1 = [mapping[i]*life_x_step + life_x_margin,  (year_length[1] - year_length[0])  * scale_y    +180]
		return curve_generator([_0, _1])
	}).attr("stroke", function(d,i){return Artists_colors[i];}).attr("stroke-width", 1)

}
// var change_button = d3.select("body").append("div").attr("id", "button_1").style("top",(year_length[1] - year_length[0])  * scale_y +60).on("click",function(){
// 	marriage_and_work_show();
// })


/********Part1-3 imgs-show***********/
var imgs_B = d3.select("#imgs_B_");

function show_imgs(num, top){
	imgs_B.html("")
	desc.html("")
	desc.text(Artists_desc[num])
	img_board.style("top", top);
	var name__ = Artists_name[num].split(" ").join("_")
	var imgs_info = d3.select("#info")

	imgs_info.text(Artists_name[num])
	setTimeout(function(){
		for(var i = 0; i < number_Paintings[num]; i++)
		{
			if(i > 50)break;
			imgs_B.append("img").attr("class", "img").attr("src", "./best-artworks-of-all-time/images/" + name__+"/"+name__+"_"+(i+1)+".jpg")
		}
	}, 500)
}
var mode_change = d3.select("#mode_change_btn");
var desc = d3.select("#desc");
var mode = 0
mode_change.on("click",function(){
	judge_mode_and_do();
})

function judge_mode_and_do(){
	if(mode == 0){
		mode = 1;
		show_imgs_all();
		mode_change.style("background-color","#6c9c6c");
	}
	else{
		mode = 0;
		show_imgs_show();
		mode_change.style("background-color","#8d8de0");
	}
}
function show_imgs_all(){
	img_board.style("width", "280px");
	life_line.filter(function(d,i){
		if(i === def_life_line)return true;
		else return false;
	}).style("width","280px")
	desc.style("width", "300px").style("max-height","460px").style("top",0).style("left", 290)
	imgs_B.style("transform","rotate(0deg)").style("width","100%").style("display","flex").style("flex-flow","column").style("overflow-y", "scroll").style("overflow-x", "hidden")
	.selectAll("img").style("width","250px").style("height","auto")
}
function show_imgs_show(){
	img_board.style("width", "60%");
	life_line.filter(function(d,i){
		if(i === def_life_line)return true;
		else return false;
	}).style("width","60%");
	desc.style("width", 400).style("max-height","380px").style("top",60).style("left", "calc(50% - 200px)")
	imgs_B.style("transform","rotate(45deg)").style("width","200%").style("padding-right",0).style("display","block").style("overflow", "visible")
	.selectAll("img").style("width","auto").style("height","150px")
}
/***********Part2 *************/
/*
(year_length[1] - year_length[0])  * scale_y +85
*/


// var main_period_bar = main_div.append("div").attr("id", "main_period_bar").style("top", (year_length[1] - year_length[0])  * scale_y +80+genre_y_length )
// var period_bar = main_period_bar.selectAll("period_bar").data(period_nums).enter().append("div").attr("class", "period_bar").style("width", function(d){
// 	return (w*.8) * d / 63
// }).style("background",function(d,i){
// 	if(i==0) return "#AAA"
// 	else return "#CCC"
// })

left_margin = 0
right_margin = 0
var position_genre = []

var genre_bar = main_div.selectAll("genre_bar").data(genres_num) .enter().append("div").attr("class", "genre_bar").style("top", (year_length[1] - year_length[0])  * scale_y +180+genre_y_length)
.style("width",function(d,i){
	return  d * genre_x_step
}).style("left",function(d,i){
	if(genre2period_mapping[i]  == 1){
		left_margin += d;
		position_genre[i] = (left_margin - d)
		return (left_margin - d) * genre_x_step + genre_x_margin ;}
	if(genre2period_mapping[i]  == 0){
		right_margin += d;
		position_genre[i] = (right_margin - d  +21)
		return (right_margin - d  +21) * genre_x_step + genre_x_margin ;}
}).style("background",function(d,i){return genres_color[i]}).style("opacity", .8).on("mouseenter",function(d,i){
	d3.select(this).text(genres[i]).style("z-index",2)
	})
	.on("mouseout",function(d,i){
		d3.select(this).text("").style("z-index",1)
	})

var genre_line_s = svg.selectAll("genre_inner_line").data(Artist2genre_mapping).enter().append("path").attr("d", function(d,i){
	index = i
	if(i > 16){index += 4}
	index += .5;
	let _0 = [index*genre_x_step+ genre_x_margin, (year_length[1] - year_length[0])  * scale_y +180+genre_y_length ]
	let _1 = [index*genre_x_step+ genre_x_margin, (year_length[1] - year_length[0])  * scale_y +180+genre_y_length + 50 ]
	return curve_generator([_0, _1])
}).attr("stroke", "#AAA").attr("fill", "transparent")

console.log(position_genre)

var inner_margin = []
for (var i = 0; i < 24; i++){
	inner_margin[i] = 0;
}

var genre_line = svg.selectAll("genre_line").data(Artist2genre_mapping).enter().append("path").attr("d", function(d){
	index = mapping[d[0]]
	dest = position_genre[d[1]] + inner_margin[d[1]] + .5

	let _0 = [index*life_x_step + life_x_margin, (year_length[1] - year_length[0])  * scale_y +175 + 10]
	let _1 = [ index*life_x_step + life_x_margin,  (year_length[1] - year_length[0])  * scale_y +180 + 10 + genre_y_length /3]

	let _2= [ dest*genre_x_step+ genre_x_margin,  (year_length[1] - year_length[0])  * scale_y +180+genre_y_length/3 * 2]
	let _3 = [dest*genre_x_step+ genre_x_margin,  (year_length[1] - year_length[0])  * scale_y +180+genre_y_length ]
	let _4 = [dest*genre_x_step+ genre_x_margin,  (year_length[1] - year_length[0])  * scale_y +180+genre_y_length +50]
	inner_margin[d[1]] +=1
	return curve_generator([_0, _1, _2,_3])
}).attr("stroke", function(d,i){return Artists_colors[d[0]];}).attr("fill", "transparent")
genre_y_length = genre_y_length  +50
var genre_y_length_a = 100


circle_show()
/******** Part 3 Map ***************/

/******** first assemble path********/



var map_y = (year_length[1] - year_length[0])  * scale_y +780;
var projection = d3.geoMercator();
var oldScala = projection.scale();
var oldTranslate = projection.translate();
xy = projection.scale(oldScala * (w*.8*.8 / oldTranslate[0] / 2) * 0.7)
	.translate([w*.8*.5 - 20, 200 + map_y]);


// var map = svg
// map.attr("width", w*.8).attr("height", 400)
// map.style("position", "absolute").style("top", map_y)
d3.json("./source/world-countries.json").then(function(data) {
  /* Antarctica will not shown on the map */
  var features = data.features.filter(function(value) {
    return value.properties.name != 'Antarctica';
  });


  path = d3.geoPath().projection(xy);
	// map.attr('width', w*.8*.8).attr('height', 400);
	svg.selectAll('map_path').data(features).enter().append('svg:path')
    .attr('d', path)
    .on('mouseover', function() {
      d3.select(this).attr('fill', 'white');
    })
    .on('mouseout', function() {
      d3.select(this).attr('fill', 'rgba(128,124,139,0.61');
    })
    .attr('fill', "#AAA")
    .attr('stroke', '#AAA')
    .attr('stroke-width', 1);
/** points **/

	svg.selectAll("countries_point").data(countries_coordinate).enter().append('circle').attr('r', function(d,i){return countries_num_a[i]})
    .attr('fill', '#755f5f').attr("stroke","white").style("opacity", .5)
    .attr('transform', function(d){let xy_ = xy(d); return 'translate(' + xy_[0] + ', ' + xy_[1] + ')'});

	for (var i = 0; i < 24; i++){
		inner_margin[i] = 0;
	}
	var genre_line_a = svg.selectAll("genre_line_a").data(Artist2genre_mapping).enter().append("path").attr("d", function(d){
		index = mapping[d[0]]
		dest = position_genre[d[1]] + inner_margin[d[1]] + .5

		let country = Artists_countries[d[0]]


		let country_c = countries_coordinate[country[0]]

		let _0 = [dest*genre_x_step+ genre_x_margin,  (year_length[1] - year_length[0])  * scale_y +180 +genre_y_length ]
		inner_margin[d[1]] +=1

		let _1 = [dest*genre_x_step+ genre_x_margin , (year_length[1] - year_length[0])  * scale_y +180 + +genre_y_length + 60 ]

		let _3 = xy(country_c)

		let _2 = [_3[0] ,  _3[1] - 50]

		// let _1= [ dest*genre_x_step+ genre_x_margin,  (year_length[1] - year_length[0])  * scale_y + 80 +genre_y_length + genre_y_length_a/3]


		if(country.length > 1){
			let _4 = xy(countries_coordinate[country[1]])
			svg.append("path").attr("d",curve_generator([_0,_1,_2,_4])).attr("stroke", Artists_colors[d[0]]).attr("fill", "transparent")
		}

		return curve_generator([_0,_1,_2,_3])
	}).attr("stroke", function(d,i){return Artists_colors[d[0]];}).attr("fill", "transparent")



});


/******** Scroll Part *************/

// var slowdown = 100;

var front_1 = 550 ;
var front_2 = front_1 + 500;
var front_3 = front_2 + 500;
var front_4 = front_3 + 600;

var front_5 = (year_length[1] - year_length[0])  * scale_y - 550 + front_4;

var front_6 = front_5 + 500;

var front_7 = front_6+500;

var front_8 = front_7+500;

var front_end = $(document).height() - 10;

console.log(front_8)
$(window).scrollTop(0);

var windowTop = 0;
var main_board = $(".main_board");

var check_section_flag = [true, true,true,true, true,true,true,true,true,true];
var fixed_flag = false;
// var fronts = document.getElementsByClassName("front_b")

var svg_scroll = true;

// var front = d3.select("#front").style("height", front_8 + 500 ).style("width", w * .8);

life_line.style("top", function(d, i){
	return  150;
}).on("click", null)
life_line_dash.attr("d", function(d, i){
	_0 = [mapping[i]*life_x_step + life_x_margin, (d[1] - d[0] ) * scale_y+ 50]
	_1 = [mapping[i]*life_x_step + life_x_margin,  (year_length[1] - year_length[0])  * scale_y    +85]
	return curve_generator([_0, _1])
})

// d3.select(".main_board").style("height", 600).style("top", (h-600)/2);
$(window).scroll(function(){
	windowTop = $(window).scrollTop();
	if(windowTop <= front_1){
		if(!fixed_flag)d3.select(".main_board").style("position", "relative");
		top_imgs.style("transform", "rotate(45deg) translate("+(windowTop / front_1 * 100)+"px, -"+(+windowTop / front_1 * 50)+"px)")
		// check_section_flag[1] = true;
		return;
	}
	else {
		d3.select(".main_board").style("position", "fixed").style("top", 0);
	}
	if(windowTop >= front_1 && windowTop < front_2 && check_section_flag[1]){
		// main_board.scrollTop(windowTop - front_1)
		//0px 0px 0px 5px rgba(255, 0, 0, 0.55)
		d3.select("#front_top_1").style("opacity", 1);
		main_div.select("#path_life8").style("box-shadow","0px 0px 0px 5px rgba(255, 0, 0, 0.55)")


		check_section_flag[1] = false;
		return;

	}
	if(windowTop >= front_2 && windowTop < front_3 && check_section_flag[2]){
		// main_board.scrollTop(windowTop - front_1)
		//0px 0px 0px 5px rgba(255, 0, 0, 0.55)
		d3.select("#front_top_2").style("opacity", 1);

		main_div.select("#path_life8").style("box-shadow","0px 0px 0px 0px")

		main_div.select("#path_life19").style("box-shadow","#5d5d5d 0px 0px 0px 5px")
		main_div.select("#path_life41").style("box-shadow","#508e45 0px 0px 0px 5px")

		// d3.select(".main_board").style("position", "fixed").style("top", 0);
		check_section_flag[2] = false;
		return ;

	}
	if(windowTop >= front_3 && windowTop < front_4 && check_section_flag[3]){

		d3.select("#front_top_3").style("opacity", 1);

		main_div.select("#path_life8").style("box-shadow","0px 0px 0px 0px")

		main_div.select("#path_life19").style("box-shadow","0px 0px 0px 0px")
		main_div.select("#path_life41").style("box-shadow","0px 0px 0px 0px")

		year_note.text("year");
		year_topnote.text("1266");
		for(var i = 1; i < ( 1978-1266 )/10; i++ )
		{
			svg.append("path").attr("class", "lims").attr("d", curve_generator([[45,150 + scale_y * 10  *i], [50,150 + scale_y * 10  *i]])).attr("stroke", "black")
			svg.append("text").attr("class", "lims").attr("stroke", "black").attr("x", 10).attr("y", 150+ scale_y * 10 * i)
				.text(i*10 + 1266)
		}

		life_line.style("top", function(d, i){
			return  (d[0] - year_length[0] ) * scale_y+ 150;
		}).on("click", null)
		life_line_dash.attr("d", function(d, i){
			_0 = [mapping[i]*life_x_step + life_x_margin, (d[1] - year_length[0] ) * scale_y+ 150]
			_1 = [mapping[i]*life_x_step + life_x_margin,  (year_length[1] - year_length[0])  * scale_y    +185]
			return curve_generator([_0, _1])
		})
		check_section_flag[3] = false;
		return ;
	}
	/****Part 1-2 text_up *****/
	if(windowTop >= front_4 && windowTop < front_5 ){
		if(svg_scroll ) main_board.scrollTop(windowTop - front_4 - 0)
		if(check_section_flag[4]){
			d3.select("#front_top_4").style("opacity", 1);
			d3.select("#front_top_5").style("opacity", 1);
			d3.select("#front_top_6").style("opacity", 1);
			check_section_flag[4] = false;
		}
		// if(!check_section_flag[1]){
		// 	return;
		// }
		//check_section_flag[1] = false;
		// life_line.style("top", function(d, i){
		// 	return  (d[0] - year_length[0] ) * scale_y+ 50;
		// }).on("click", null)
		// life_line_dash.attr("d", function(d, i){
		// 	_0 = [mapping[i]*life_x_step + life_x_margin, (d[1] - year_length[0] ) * scale_y+ 50]
		// 	_1 = [mapping[i]*life_x_step + life_x_margin,  (year_length[1] - year_length[0])  * scale_y    +85]
		// 	return curve_generator([_0, _1])
		// })
		// d3.select(".main_board").style("position", "fixed").style("top", 0);

		// marriage_and_work_show();
		// check_section_flag[1] = false;

	}
	if(windowTop >= front_5 && windowTop < front_6 && check_section_flag[5] ){
		marriage_and_work_show();
		check_section_flag[5] = false;
		d3.select("#front_top_7").style("opacity", 1);

		return ;
	}
	if(windowTop >= front_6 ){
		if(svg_scroll ) main_board.scrollTop(windowTop - front_4 - 550)
		if(check_section_flag[6]){
			d3.select("#front_top_8").style("opacity", 1);
			check_section_flag[6] = false;
		}
			// marriage_and_work_show();
		// check_section_flag[2] = false;
		// return ;
	}
	if(windowTop >= front_7 && windowTop < front_8  &&  check_section_flag[7]  ) {
		d3.select("#front_top_9").style("opacity", 1);
		check_section_flag[7] = false;
	}
	if(windowTop >= front_8 && windowTop < front_end &&  check_section_flag[8]  ) {
		// svg_scroll = false;
		check_section_flag[8] = false;
	}
	if(windowTop + window.innerHeight >= front_end &&  check_section_flag[9]  ) {
		svg_scroll = false;

		d3.select("#end_show_button").style("opacity", 1).on("click",function(){
			life_line.select(".path_life").html("").style("display", "flex").style("overflow", "hidden")
			life_line.style("width", 10)
			main_board.scrollTop(front_end - front_4)
			lifenodes_()
			life_line.style("top", function(d, i){
					return  front_end - front_4 + (h - 500) / 2;
				})
				.style("left",function(d, i){
					return mapping[i]*life_x_step + life_x_margin - 30;
				})
				.on("click",  function(d,i){
					d3.select(this)
						.style("top", front_end - front_4 + (h - 500) / 2)
						.style("left",function(d, i){
							return w*.8*.2;
						})
						.style("z-index", 5).style("width", "60%").style("padding","0px").style("border-radius",5).select(".path_life").style("height", 500)
					img_board.style("display", "block");
					show_imgs(i, front_end - front_4+ (h - 500) / 2);

					def_life_line = i;
				})
			d3.selectAll(".front_b").remove()
			d3.select("#end_show_button").remove()
		})
		fixed_flag = true;
		check_section_flag[9] = false;
	}
})





