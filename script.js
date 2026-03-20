// script.js - JavaScript for AI Robot Portfolio Interactions

document.addEventListener('DOMContentLoaded', function() {
    const robot = document.querySelector('.robot');
    const head = document.querySelector('.head');
    const leftEye = document.querySelector('.left-eye');
    const rightEye = document.querySelector('.right-eye');

    let mouseX = 0;
    let mouseY = 0;
    let lastMouseMove = Date.now();
    let isIdle = false;

    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMouseMove = Date.now();
        isIdle = false;
        robot.classList.remove('idle');
    });

    // Function to calculate angle between two points
    function getAngle(cx, cy, ex, ey) {
        const dy = ey - cy;
        const dx = ex - cx;
        const rad = Math.atan2(dy, dx);
        const deg = rad * (180 / Math.PI);
        return deg;
    }

    // Function to get element center position
    function getCenter(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    // Animation loop
    function animate() {
        const now = Date.now();

        // Check for idle state
        if (now - lastMouseMove > 3000 && !isIdle) {
            isIdle = true;
            robot.classList.add('idle');
        }

        if (!isIdle) {
            const headCenter = getCenter(head);
            const leftEyeCenter = getCenter(leftEye);
            const rightEyeCenter = getCenter(rightEye);

            // Calculate angles for eyes
            const leftEyeAngle = getAngle(leftEyeCenter.x, leftEyeCenter.y, mouseX, mouseY);
            const rightEyeAngle = getAngle(rightEyeCenter.x, rightEyeCenter.y, mouseX, mouseY);

            // Apply eye rotations with smooth transition
            leftEye.style.transform = `rotate(${leftEyeAngle}deg)`;
            rightEye.style.transform = `rotate(${rightEyeAngle}deg)`;

            // Calculate head rotation based on mouse position relative to screen center
            const screenCenterX = window.innerWidth / 2;
            const screenCenterY = window.innerHeight / 2;
            const headRotationY = (mouseX - screenCenterX) / screenCenterX * 15; // Max 15 degrees
            const headRotationX = (mouseY - screenCenterY) / screenCenterY * 10; // Max 10 degrees

            // Apply head rotation
            head.style.transform = `rotateY(${headRotationY}deg) rotateX(${headRotationX}deg)`;
        }

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Add some interactive effects
    robot.addEventListener('mouseenter', function() {
        // Add a subtle glow effect on hover
        head.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.3)';
    });

    robot.addEventListener('mouseleave', function() {
        // Reset glow effect
        head.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.2)';
    });

    // Add click interaction
    robot.addEventListener('click', function() {
        // Quick blink animation
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            eye.style.animation = 'none';
            setTimeout(() => {
                eye.style.animation = 'blink 5s infinite';
            }, 10);
        });
    });

    // Responsive adjustments
    window.addEventListener('resize', function() {
        // Recalculate positions on resize if needed
        // The animation loop will handle updates automatically
    });
});