// export function setupSim(element) {
//     let active = true;
//     const setActive = (isActive) => {
//       active = isActive;
//       element.innerHTML = `Simulator is ${active ? 'active' : 'inactive'}`
//     }
//     element.addEventListener('click', () => setActive(!active));
//     setActive(true);
//   }

const BOX_R = 10;
const MAX_COUNT = 20;
const logisticMap = (r, x) => r * x * (1 - x);  
const fixedTimes = [0, 3, 3.44948974278317, 3.55409035955192, 3.56440726609543];
const toScientific = (x) => {
    let s = x.toExponential(2);
    let [mantissa, exponent] = s.split(/e\+?/);
    return `${mantissa}*10^(${exponent})`;
}
export function setupSim(element, button, slider, bin, modes, rlabel, table) {
    fixedTimes.forEach((r) => {
        // add a button to bin that sets the slider value to r.
        const button = document.createElement('button');
        button.innerHTML = r;
        button.addEventListener('click', () => {
            slider.value = r;
            simState.r = r;
            rlabel.innerHTML = `Value of r: ${simState.r}`;
        });
        bin.appendChild(button);
    });

    const resetButton = document.createElement('button');
    resetButton.innerHTML = "Reset ($x = x', \\Delta_0 = 0$)";
    resetButton.addEventListener('click', () => {
        simState.x = 0.2;
        simState.x2 = 0.2;
    });
    modes.appendChild(resetButton);

    [1, 2, 3, 4, 6, 8, 10, 12, 14].forEach((r) => {
        const initialOffsetButton = document.createElement('button');
        //initialOffsetButton.innerHTML = `Offset 0.${"0".repeat(r - 1)}1`;
        initialOffsetButton.innerHTML = `$\\Delta_0 = 10^{-${r}}$`;
        initialOffsetButton.addEventListener('click', () => {
            simState.x = 0.2;
            simState.x2 = 0.2 + 0.1 ** r;
       })
       modes.appendChild(initialOffsetButton);
    })
    const positions = [];
    const positions2 = [];
    let active = true;
    const canvas = document.createElement('canvas'); // Create a canvas element
    const w = canvas.width;
    const ctx = canvas.getContext('2d');

    let lastFrameTime = 0;
    const targetFrameRate = 8;
    const frameInterval = 1000 / targetFrameRate;
    let simState = {
        r: 3,
        t: 0,
        x: 0.2,
        x2: 0.2,
        step: 0,
    }

    slider.addEventListener('input', (e) => {
        simState.r = e.target.value;
        rlabel.innerHTML = `Value of r: ${simState.r}`;
    });
    function updateSim(elapsedTime = 0) {
        simState.step += 1;
        simState.t += elapsedTime; // Update time
        simState.x = logisticMap(simState.r, simState.x);
        simState.x2 = logisticMap(simState.r, simState.x2);
        positions.push(simState.x);
        positions2.push(simState.x2);
        if (positions.length > MAX_COUNT) {
            positions.shift();
            positions2.shift();
        }
        if (table) table.innerHTML = positions.slice(0,10).map((x, i) => `<tr><td></td><td>${i + simState.step}</td><td>${x}</td><td>${positions2[i]}</td><td>${toScientific(Math.abs(x - positions2[i]))}</td></tr>`).join('');

        console.log(simState)
    }
    function draw() {
        ctx.fillStyle = '#FFFFFFF0'
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw your simulation here
        // This might involve drawing shapes, lines, or any other graphical representation of your simulation
        
        // Example: Drawing a rectangle that moves horizontally
     
        //const x = (t * 0.2 % canvas.width); // Calculate x position based on time (t
        ctx.fillStyle = 'blue';
        positions2.forEach((x, i) => {
            ctx.fillRect(x * w, 15 * i, BOX_R, BOX_R); // Example rectangle
        });
        ctx.fillStyle = 'red';
        positions.forEach((x, i) => {
            ctx.fillRect(x * w, 15 * i, BOX_R, BOX_R); // Example rectangle
        });
    }
    function animate(t = 0) {
        const elapsedTime = t - lastFrameTime; // Calculate time elapsed since last frame
        console.log({elapsedTime, frameInterval, active})
        
        if (elapsedTime > frameInterval) {
            console.log("update")
            lastFrameTime = t; // Update last frame time
            updateSim(elapsedTime); // Update simulation state
            draw(); // Draw the simulation
        }
   
        // Clear the canvas
       

        // Move the rectangle horizontally
        // Update the position based on the simulation state

        if (active) {
            requestAnimationFrame(animate); // Request next frame if simulation is active
        }
    }

    // Set canvas size
    canvas.width = 400; // Set width as needed
    canvas.height = 300; // Set height as needed

    // Append canvas to the provided element
    element.appendChild(canvas);

    // Function to toggle simulation activity
    const setActive = (isActive) => {
        active = isActive;
        button.innerHTML = `${active ? 'Pause' : 'Play'}`;
        if (active) {
            animate(); // Start the animation if activated
        }
    }

    // Toggle simulation activity on click
    button.addEventListener('click', () => setActive(!active));

    // Initialize the simulation as active
    setActive(true);
}