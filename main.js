import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { setupSim } from './sim'

document.querySelector('#app').innerHTML = `
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
`

setupSim(document.querySelector('.sim'), document.querySelector('#counter'), document.querySelector('#rval'), document.querySelector('#bin'), document.querySelector('#modes'), document.querySelector('#rlabel'), document.querySelector('#table'))
