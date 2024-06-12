export class mathFunction
{
    //Linear interpolation
    //A is start value, B is end value, t is the percentage between
    static Lerp(a,b,t)
    {
        if(t>1){t=1}
        if(t<0){t=0}
        return a+(b-a)*t;
    }
    //Quadratic formula with the form a(x-b)^2+c
    static quadraticFormula(a,b,c,x)
    {
        return a*((x-b)*(x-b))+c;
    }
}