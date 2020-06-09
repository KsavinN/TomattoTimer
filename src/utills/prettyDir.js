

export default function prettyDir(obj,str = "") {
    const type = typeof obj;
    const blue = 'color: lightblue';
    const red = 'color: red';
    const pink = 'color: pink';
    const green = 'color: lightgreen';
    
    const map = {
        'string': red,
        'number': blue,
        'object': pink
    } 

    if(type === 'object') {
        if (Array.isArray(obj)) {
            console.group('%c ' + str + '%c [' + obj + ']',pink, green);
            for (let i of obj) {
                prettyDir(i);
            }
            console.groupEnd();
        } else {
            console.group('%c ' + obj, pink);
            for (let i in obj) {
                prettyDir(obj[i],i);
            }
            console.groupEnd();
        }
    } else {
        console.log('%c ' + str + '%c ' + obj, pink, map[type]);
    }
    


    

}
