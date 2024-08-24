const elMouseIdentifier = () => {
    let x, y;
    let moveActions = [];

    const onDragOn = (e) => {
        window.removeEventListener('mousemove', onDragOff);
        mouseX = e.clientX;
        mouseY = e.clientY;
        isDrag = true;
    }
    
    const onDragOff = () => {
        stopDrag();
        if(once){
            unDrag();
        }
    } 

    const unDrag = () => {
        stopDrag();
        el.removeEventListener('mousedown', onDragOn);
    }

    const calcDiff = (e) => {
        let newX, newY;
        newX = e.clientX;
        newY = e.clientY;

        const dX = mouseX - newX;
        const dY = mouseY - newY;

        mouseX = newX;
        mouseY = newY;

        return [dX, dY];
    }

    const onDragMove = (e) => {
        if(!isDrag){ return }

        const [dX, dY] = calcDiff(e);

        moveActions.forEach(a => a(dx, dy));
    }

    const stopDrag = () => {
        isDrag = false;

        window.removeEventListener('mouseup', onDragMove);
    }

}

const easeFormulas = (c, t, d, b) => {
    return {
        easeLinear: () => c * t / d + b,
        easeInQuad: () => c * (t /= d) * t + b,
        easeOutQuad: () => -c * (t /= d) * (t - 2) + b,

    }
}

const easer = (setPosition) => {
    const ease = () => {

    }
     
    requestAnimationFrame(ease);
}

const drag = ({el, once, symetrical, isTransition}) => {
    const display = el.display;
    let x, y;
    let width, height;
    let isDrag = false;
    const result = {};
    Object.defineProperty(result, 'x', {
        value: x,
        writable: false
      });

    const setBound = () => {
        const a = { opacity: 0, }
        
        el = {
            opacity = 0;
            display = 0;
        }
        el.opacity = 0;
        el.dispaly = 'block';
        setTimeout(() => {
            getPosition();
            ({x, y, width, height} = getPosition()); 
            
            el.display = display;             
        }, 0);
        
    }

    const getPosition = () => {
        ({x, y, width, height} = el.getBoundingClientRect());

        if(isTransition){
            const styles = window.getComputedStyle(el);
            const matrix = new DOMMatrixReadOnly(styles.transform);

            x = matrix.m41;
            y = matrix.m42;
            console.log(matrix);
        }

        return {x, y, width, height};
    }



   
    


    const setPosition = (dX, dY) => {
        const posX = (x -= dX) + "px";
        const posY = (y -= dY) + "px";

        if(isTransition){
            el.style.transform = `translate(${posX}, ${posY})`;
        }else{
            el.style.left = posX;
            el.style.top = posY;
        }
    }



 


    setBound();
    // ease(setPosition);

    return result
}