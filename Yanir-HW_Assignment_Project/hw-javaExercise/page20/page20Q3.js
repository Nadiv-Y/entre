
let A = 1;
    B = 1;
    C = 2;
    D = 3;
    E = 1;
    F = 1;

    let mechane = A * E - B * D

    if ((mechane) !== 0)  {
        x = (C*E-B*F)/mechane
        y = (A*F-C*B)/mechane
        console.log('x=',x,'y=', y);
        
    }

    else {
        console.log('Equation has no solution');
        
    }

