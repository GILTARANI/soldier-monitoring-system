let map,marker;
let bpmChart,spo2Chart,tempChart,bpChart,motionChart;
let demoInterval;

init();

function init(){
initMap();
initCharts();
startDemo();
}

function initMap(){

map=L.map('map').setView([12.9716,77.5946],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

marker=L.marker([12.9716,77.5946]).addTo(map);

}

function initCharts(){

bpmChart=createChart('bpmChart','#00ff41');
spo2Chart=createChart('spo2Chart','#00ffff');
tempChart=createChart('tempChart','#ffcc00');
bpChart=createChart('bpChart','#ff4444');
motionChart=createChart('motionChart','#ffaa00');

}

function createChart(id,color){

return new Chart(document.getElementById(id),{
type:'line',
data:{labels:[],datasets:[{data:[],borderColor:color,tension:0.4}]},
options:{responsive:true,plugins:{legend:{display:false}}}
});

}

function startDemo(){

demoInterval=setInterval(()=>{

let data={

bpm:Math.floor(Math.random()*40+70),

spo2:Math.floor(Math.random()*8+92),

temp:(Math.random()*1.5+36).toFixed(1),

bp:Math.floor(Math.random()*30+110),

motion:Math.random()>0.85?"DANGER":"SAFE",

lat:12.9716+(Math.random()*0.002-0.001),

lng:77.5946+(Math.random()*0.002-0.001)

};

updateUI(data);

},2000);

}

function updateUI(data){

document.getElementById("val-bpm").innerText=data.bpm;
document.getElementById("val-spo2").innerText=data.spo2;
document.getElementById("val-temp").innerText=data.temp;
document.getElementById("val-bp").innerText=data.bp;
document.getElementById("val-motion").innerText=data.motion;

document.getElementById("lat-val").innerText=data.lat.toFixed(4);
document.getElementById("lng-val").innerText=data.lng.toFixed(4);

let newLoc=[data.lat,data.lng];

marker.setLatLng(newLoc);
map.panTo(newLoc);

updateChart(bpmChart,data.bpm);
updateChart(spo2Chart,data.spo2);
updateChart(tempChart,data.temp);
updateChart(bpChart,data.bp);
updateChart(motionChart,data.motion==="SAFE"?1:0);

checkAlert(data);

}

function updateChart(chart,value){

if(chart.data.labels.length>20){

chart.data.labels.shift();
chart.data.datasets[0].data.shift();

}

chart.data.labels.push(new Date().toLocaleTimeString());
chart.data.datasets[0].data.push(value);

chart.update();

}

function checkAlert(data){

let bpmLimit=document.getElementById("limit-bpm").value;
let spo2Limit=document.getElementById("limit-spo2").value;
let tempLimit=document.getElementById("limit-temp").value;
let bpLimit=document.getElementById("limit-bp").value;

toggle("card-bpm",data.bpm>bpmLimit);
toggle("card-spo2",data.spo2<spo2Limit);
toggle("card-temp",data.temp>tempLimit);
toggle("card-bp",data.bp>bpLimit);

if(data.motion==="DANGER")
document.getElementById("card-motion").classList.add("danger");
else
document.getElementById("card-motion").classList.remove("danger");

}

function toggle(id,cond){

let el=document.getElementById(id);

if(cond)
el.classList.add("danger");
else
el.classList.remove("danger");

}