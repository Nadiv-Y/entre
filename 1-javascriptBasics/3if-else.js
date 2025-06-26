const TEN_THOUSAND = 10 ** 4

let salary = 9000
let tax

if(salary <= TEN_THOUSAND){
    tax = 0.17
} else if (salary <= 2 * TEN_THOUSAND){
    tax = 0.2
} else if (salary <= 3 * TEN_THOUSAND){
    tax = 0.3
} else {
    tax = 0.4
}



function getNeto(salary) {
    if(salary <= TEN_THOUSAND){
        return salary * 0.83
    }
    if(salary <= 2 * TEN_THOUSAND){
        return salary * 0.8
    }
    if(salary <= 3 * TEN_THOUSAND){
        return salary * 0.65
    }
    return salary * 0.55
}


let gross = 3.2 * TEN_THOUSAND
let neto = getNeto(gross)

console.log(neto);

