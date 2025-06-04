document.addEventListener('DOMContentLoaded', () => {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const btn4 = document.getElementById('btn4');
    const select = document.getElementById('select');
    const cube = document.getElementById('cube');
    const spot = document.getElementById('spot');
    let point = localStorage.getItem('point') || 0;
    
    let posX = 0;
    let posY = 0;
    
    function moveCube(horizontal = 0, vertical = 0) {
        const px = parseInt(select.value);
        posX += horizontal * px;
        posY += vertical * px;
        cube.style.transform = `translate(${posX}px, ${posY}px)`;
        
        const cubeRect = cube.getBoundingClientRect();
        const spotRect = spot.getBoundingClientRect();
        
        if (isColliding(cubeRect, spotRect)) {
            point++;
            localStorage.setItem('point', point)
            alert(`You reached the target!\n You have beaten ${point} levels.`);
            resetGame();
        }
    }
    
    function isColliding(rect1, rect2) {
        return !(
            rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom
        );
    }
    
    function resetGame() {
        posX = 0;
        posY = 0;
        cube.style.transform = `translate(0, 0)`;
        
        const mapRect = document.querySelector('.map').getBoundingClientRect();
        const maxX = mapRect.width - 50;
        const maxY = mapRect.height - 50;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        spot.style.left = `${randomX}px`;
        spot.style.top = `${randomY}px`;
    }
    
    resetGame();
    
    btn1.addEventListener('click', () => moveCube(-1, 0));  
    btn2.addEventListener('click', () => moveCube(1, 0));   
    btn3.addEventListener('click', () => moveCube(0, -1)); 
    btn4.addEventListener('click', () => moveCube(0, 1));  
    
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                moveCube(-1, 0);
                break;
            case 'ArrowRight':
                moveCube(1, 0);
                break;
            case 'ArrowUp':
                moveCube(0, -1);
                break;
            case 'ArrowDown':
                moveCube(0, 1);
                break;
        }
    });
});