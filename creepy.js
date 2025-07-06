// Set fixed size for the canvas
w = a.width = 640;
h = a.height = 480;

// and a nice dusk gradient
a.style = "background:linear-gradient(0,#522E19 0%,#002845 21%,#001F21 73%);filter:blur(2px)"

// Define some shortcuts
R=Math.random;
c.F=c.fill;
c.R=c.rect;
F="fillStyle";

// Timestamp (milliseconds).
D=()=>+new Date();

// Draw a shape, then close the path and fill.
// Scale every coordinate by 5, as it shortens the numbers to double digits, saving us some bytes.
S=(a,x,y)=>{
    c.beginPath();
    [x,y]=a
    c.moveTo(x*5,y*5)
    do {
        [x,y]=a=a.slice(2);
        c.lineTo(x*5, y*5);
    }while(a.length);
    c.closePath();
    c.F()
}


// Noise canvas - doble the size. We need to generate it once, then just draw it at random location.
N = document.createElement("canvas");
N.width = w*2;
N.height = h*2;

// Generate the actual noise pixels.
C = N.getContext("2d");
I = C.createImageData(w*2,h*2);
buffer = new Uint32Array(I.data.buffer);
len = buffer.length - 1;
while(len--) buffer[len] = R() < 0.60 ? 0 : 0x80C0FFC0;
C.putImageData(I, 0, 0);




// Start of animation.
T=D();


// Scale it double.
c.scale(2,2);

// Draw single frame.
f = ()=>{
    // Clear all for rendering
    c.clearRect(0, 0, w, h);
    
    // Add a slight cam shaking.
    c.translate(X=R()*5-2, X)

    // Draw the church
    c[F]="#001210"
    S([41, 48, 
       51, 48-4,
       55, 48-2,
       60, 48-4,
       64, 48-2,
       64, 48]);
    
    c[F] = "black";
    S([0,  48-20,
       30, 48-20,
       30, 48-26,
       39, 48-41,
       48, 48-26,
       48, 48-0,
       0,  48-0])
    c.R(192.5,240-225, 5, 25)
    c.R(187.5,240-220, 15, 5)
    c.F()

    // Draw the window after some small timeout - lights come on in the church.
    if (D()-T > 4000) {
        c[F] = "#252b02";
        
        S([35.5, 48-25,
            38.5, 48-25,
            38.5, 48-30])
        c.F();

        S([39.5, 48-25,
            42.5, 48-25,
            39.5, 48-30]);
        c.R(197.5, 240-120, 15, 40);
        c.R(177.5, 240-120, 15, 40);
        c.F();
    }
    // Draw the noise over everything.
    c.drawImage(N, -(w * R()), -(h * R()));
    
    // Reset the translation back
    c.translate(-X, -X)

    requestAnimationFrame(f);
}

f();