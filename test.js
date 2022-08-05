let a = 0
setInterval(tick, 200)
console.log ('Start')

function tick() {
    console.log (a)
    if (a >= 10) {
    console.log ('a', a%10)
        if (!(a%10)) {
            console.log ('Signal in 1 sec')
        }
    }
    if (a > 30) {
        console.log ('Exit')
        process.exit()
    }
    a++
}