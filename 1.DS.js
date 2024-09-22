d3.json("output_np_subacute.json").then(function(data) {
    // 데이터를 성공적으로 불러온 경우 점을 그리는 코드
    svg.append('g')
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d.Subacute_log10_padj); } )
        .attr("cy", function (d) { return y(d.np_score); } )
        .attr("r", 3)
        .style("fill", function(d) {
            if (d.color === "red") {
                return "red";
            } else if (d.color === "blue") {
                return "blue";
            } else {
                return "gray";
            }
        });
});

// 범례 추가
var legend = svg.selectAll(".legend")
    .data(["red", "blue", "gray"])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// 범례 색상 사각형 추가
legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d) { return d; });

// 범례 텍스트 추가
legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) {
        if (d === "red") return "subacute_up_deg";
        else if (d === "blue") return "subacute_down_deg";
        else return "other";
    });

// X축 라벨
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Subacute -log10(padj)");

// Y축 라벨
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -margin.top)
    .text("Network Propagation Score");

// 툴팁 생성
var tooltip = d3.select("body").append("div") 
    .attr("class", "tooltip")               
    .style("opacity", 0);

// 데이터 포인트에 마우스 오버 시 툴팁 표시
svg.selectAll("circle")
    .on("mouseover", function(event, d) {
        tooltip.transition()        
            .duration(200)      
            .style("opacity", .9);      
        tooltip.html("Gene: " + d.gene + "<br/>Score: " + d.np_score)  
            .style("left", (event.pageX) + "px")     
            .style("top", (event.pageY - 28) + "px");    
    })
    .on("mouseout", function(d) {
        tooltip.transition()        
            .duration(500)      
            .style("opacity", 0);   
    });
