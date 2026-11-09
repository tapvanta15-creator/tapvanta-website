const rates={Normal:{1:399,5:379,10:349,25:329,50:299,100:279},Premium:{1:599,5:569,10:549,25:499,50:449,100:399},Customized:{1:699,5:669,10:649,25:599,50:549,100:499}};
const category=new URLSearchParams(location.search).get("category")||"Google Review Card";
document.getElementById("categoryTitle").textContent=category;document.title=category+" | TAPVANTA";
["Normal","Premium","Customized"].forEach(type=>{
 const select=document.getElementById("qty"+type);
 [1,5,10,25,50,100].forEach(q=>{const o=document.createElement("option");o.value=q;o.textContent=q+" "+(q===1?"card":"cards");select.appendChild(o);});
 function update(){const q=Number(select.value),unit=rates[type][q],total=q*unit,fmt=n=>"₹"+n.toLocaleString("en-IN");document.getElementById("unit"+type).textContent=fmt(unit)+" per card";document.getElementById("total"+type).textContent=fmt(total);document.getElementById("large"+type).textContent=fmt(unit)+" / card";}
 select.addEventListener("change",update);update();
});
document.querySelectorAll("[data-order]").forEach(button=>button.addEventListener("click",()=>{
 const type=button.dataset.order,q=Number(document.getElementById("qty"+type).value),unit=rates[type][q],total=q*unit,fmt=n=>"₹"+n.toLocaleString("en-IN");
 const message=["Hi TAPVANTA! I want to order NFC cards.","Category: "+category,"Card type: "+type,"Quantity: "+q,"Price per card: "+fmt(unit),"Total amount: "+fmt(total),"Please share the next steps."].join("\n");
 window.open("https://ig.me/m/tap_vanta?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
}));
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
