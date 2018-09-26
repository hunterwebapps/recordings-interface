export function scrollToY (scrollTargetY = 0, speed = 2000) {
    const requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
    })()

    const scrollY = window.scrollY || document.documentElement.scrollTop

    let currentTime = 0

    const time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8))

    function tick () {
        currentTime += 1 / 60

        var p = currentTime / time
        var t = (p /= 0.5) < 1 ?
            0.5 * Math.pow(p, 5)
            :
            0.5 * (Math.pow((p - 2), 5) + 2)

        if (p < 1) {
            requestAnimFrame(tick)

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t))
        } else {
            window.scrollTo(0, scrollTargetY)
        }
    }

    tick()
}

export function secondsToTimestamp (totalSeconds) {
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)
    const hours = Math.floor(minutes / 60)

    let timestamp = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')

    if (hours) timestamp = hours.toString().padStart(2, '0') + ':' + timestamp

    return timestamp
}

export function timestampToSeconds (timestamp) {
    const times = timestamp.split(':')
    let seconds = 0
    for (let i = 0; i < times.length; i++)
        seconds += +times[i] * (60 * (times.length - 1 - i) || 1)

    return seconds
}