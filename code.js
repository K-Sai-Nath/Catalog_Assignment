const fs = require('fs');
const math = require('mathjs');
function decodeY(base, value) {
    return parseInt(value, parseInt(base)); 
}
function parseInput(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const n = data.keys.n;
    const k = data.keys.k;
    const points = [];
    for (const key in data) {
        if (key !== 'keys') {
            const x = parseInt(key);
            const base = data[key].base;
            const value = data[key].value;
            const y = decodeY(base, value);
            points.push([x, y]);
        }
    }

    return points.slice(0, k);
}

function findConstant(points) {
    const k = points.length;
    const matrix = [];
    const vector = [];

    for (let i = 0; i < k; i++) {
        const [x, y] = points[i];
        const row = [];
        for (let j = k - 1; j >= 0; j--) {
            row.push(Math.pow(x, j));
        }
        matrix.push(row);
        vector.push(y);
    }
    const coefficients = math.lusolve(matrix, vector);

    return Math.round(coefficients[k - 1][0]);
}

function main() {
    const files=['./t1.json','./t2.json']
    try {
        for(let i=0;i<files.length;i+=1){
            const points = parseInput(files[i]);
            const secret = findConstant(points);

            console.log('Secret (c):', secret);
        }
    } catch (err) {
        console.error('Error:', err.message);
}
}
main();
