(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))d(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function l(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(i){if(i.ep)return;i.ep=!0;const r=l(i);fetch(i.href,r)}})();const p=10,T=20,w=(a,o)=>a*o*(1-o),M=[0,3,3.44948974278317,3.55409035955192,3.56440726609543],_=a=>{let o=a.toExponential(2),[l,d]=o.split(/e\+?/);return`${l}*10^(${d})`};function q(a,o,l,d,i,r,c){M.forEach(t=>{const n=document.createElement("button");n.innerHTML=t,n.addEventListener("click",()=>{l.value=t,e.r=t,r.innerHTML=`Value of r: ${e.r}`}),d.appendChild(n)});const v=document.createElement("button");v.innerHTML="Reset ($x = x', \\Delta_0 = 0$)",v.addEventListener("click",()=>{e.x=.2,e.x2=.2}),i.appendChild(v),[1,2,3,4,6,8,10,12,14].forEach(t=>{const n=document.createElement("button");n.innerHTML=`$\\Delta_0 = 10^{-${t}}$`,n.addEventListener("click",()=>{e.x=.2,e.x2=.2+.1**t}),i.appendChild(n)});const h=[],m=[];let u=!0;const s=document.createElement("canvas"),y=s.width,f=s.getContext("2d");let x=0;const g=1e3/8;let e={r:3,t:0,x:.2,x2:.2,step:0};l.addEventListener("input",t=>{e.r=t.target.value,r.innerHTML=`Value of r: ${e.r}`});function E(t=0){e.step+=1,e.t+=t,e.x=w(e.r,e.x),e.x2=w(e.r,e.x2),h.push(e.x),m.push(e.x2),h.length>T&&(h.shift(),m.shift()),c&&(c.innerHTML=h.slice(0,10).map((n,$)=>`<tr><td></td><td>${$+e.step}</td><td>${n}</td><td>${m[$]}</td><td>${_(Math.abs(n-m[$]))}</td></tr>`).join("")),console.log(e)}function S(){f.fillStyle="#FFFFFFF0",f.fillRect(0,0,s.width,s.height),f.fillStyle="blue",m.forEach((t,n)=>{f.fillRect(t*y,15*n,p,p)}),f.fillStyle="red",h.forEach((t,n)=>{f.fillRect(t*y,15*n,p,p)})}function b(t=0){const n=t-x;console.log({elapsedTime:n,frameInterval:g,active:u}),n>g&&(console.log("update"),x=t,E(n),S()),u&&requestAnimationFrame(b)}s.width=400,s.height=300,a.appendChild(s);const L=t=>{u=t,o.innerHTML=`${u?"Pause":"Play"}`,u&&b()};o.addEventListener("click",()=>L(!u)),L(!0)}document.querySelector("#app").innerHTML=`
  <div>
    <h2>The Logistic Map</h2>
    <h3>Justin Lee</h3>
    <div style="display:flex">
    <div style="margin-right: 50px">
    <h4>The logistic map is a model that can describe populations measured in discrete time units. It is defined by the relation $x_{n+1} = rx_n(1-x_n)$, where $x_n$ is the population at time $n$ and $r$ is a growth rate parameter.</h4>
    <h4> When $r$ is small, the population stabilizes at a fixed point. However, as $r$ increases, the values of $x_n$ can exhibit chaotic behavior. Two sequences, $x$ and $x'$ are shown. Even when their initial difference is extremely small, eventually for some values of $r$ the sequences diverge from each other.</h4>
    <h3>Try adjusting the 'r' slider to see how different growth rates affect the population over time.</h3>
    </div>
    <div>
    <div style="display:inline-flex">

      <div class="sim"></div>
      <table style="width:500px">
      <th><td>$n$</td><td>$x_n$</td><td>$x'_n$</td><td>$x_n - x'_n$</td></th>
      <tbody  id="table">
      </tbody>
      </table>
    </div>
    <div class="card" style="width:75%;margin-left:auto;transform:translateX(-12%)">
      <button id="counter" type="button"></button>
      <br>
      <label id="rlabel">Value of r: 3</label>
      <input type="range" style="width:100%" id="rval" name="slider" min="0" max="4" step="0.01" value="3"><br>
      <div id="bin"></div>
      Reset the position and compare with different initial offsets:
      <div id="modes"></div>
    </div>
    </div>
    </div>
  </div>
`;q(document.querySelector(".sim"),document.querySelector("#counter"),document.querySelector("#rval"),document.querySelector("#bin"),document.querySelector("#modes"),document.querySelector("#rlabel"),document.querySelector("#table"));
