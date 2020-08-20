let tmp = 0
let hr = 0
let min = 0
let s = 0
let Temp = 0
let Revolution = 0
let list = [0, 0, 0, 0, 0]
basic.forever(function () {
    while (pins.analogReadPin(AnalogPin.P0) > 2) {
        basic.pause(1)
    }
    Revolution += 1
    while (pins.analogReadPin(AnalogPin.P0) <= 2) {
        basic.pause(20)
    }
})
basic.forever(function () {
    for (let index = 0; index <= 4; index++) {
        Temp = Revolution
        basic.pause(2000)
        list.shift()
        list.push(Revolution - Temp)
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(Revolution)
        basic.showString("" + Math.round(Revolution / (input.runningTime() / 60000) / 3.25) + "rpm")
    } else if (input.buttonIsPressed(Button.B)) {
        s = Math.trunc(input.runningTime() / 1000)
        if (s <= 600) {
            basic.showString("" + s + "s")
        } else {
            min = Math.trunc(s / 60)
            s = s % 60
            if (min < 60) {
                basic.showString("" + min + "m" + s + "s")
            } else {
                hr = Math.trunc(min / 60)
                min = s % 60
                basic.showString("" + hr + "hr" + min + "m" + s + "s")
            }
        }
    } else if (input.buttonIsPressed(Button.AB)) {
        basic.showIcon(IconNames.Happy)
    }
    basic.clearScreen()
    for (let index2 = 0; index2 <= 4; index2++) {
        if (list[index2] < 2) {
            tmp = 4
        } else if (list[index2] < 5) {
            tmp = 3
        } else if (list[index2] < 8) {
            tmp = 2
        } else if (list[index2] < 12) {
            tmp = 1
        } else {
            tmp = 0
        }
        led.plot(index2, tmp)
    }
})
