function Workoutlast10seconds () {
    Temp = 0
    for (let index2 = 0; index2 <= 4; index2++) {
        Temp += list[index2]
    }
    return Temp
}
function Conversion_of_rev_to_pinout (counter: number) {
    if (counter <= 2) {
        return 4
    } else if (counter <= 4) {
        return 3
    } else if (counter <= 7) {
        return 2
    } else if (counter <= 11) {
        return 1
    } else {
        return 0
    }
}
let Hours = 0
let Minutes = 0
let Seconds = 0
let a_counter = 0
let tmp = 0
let Revolution_total = 0
let Temp = 0
let list: number[] = []
list = [0, 0, 0, 0, 0]
basic.forever(function () {
    while (pins.analogReadPin(AnalogPin.P0) > 2) {
        basic.pause(1)
    }
    Revolution_total += 1
    tmp += 1
    while (pins.analogReadPin(AnalogPin.P0) <= 2) {
        continue;
    }
})
basic.forever(function () {
    tmp = 0
    basic.pause(2000)
    list.push(tmp)
    list.shift()
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        basic.pause(100)
        if (a_counter >= 2) {
            a_counter = 0
        } else {
            a_counter += 1
        }
    } else if (input.buttonIsPressed(Button.B)) {
        ScrolText.showNumber(
        Revolution_total,
        SCROLL_DIR.LEFT,
        SCROLL_ROTATE.SR_0,
        75
        )
        ScrolText.showString(
        "" + Math.round(Revolution_total / (input.runningTime() / 60000) / 3.25) + "rpm",
        SCROLL_DIR.LEFT,
        SCROLL_ROTATE.SR_0,
        75
        )
        Seconds = Math.trunc(input.runningTime() / 1000)
        if (Seconds <= 60) {
            ScrolText.showString(
            "" + Seconds + "s",
            SCROLL_DIR.LEFT,
            SCROLL_ROTATE.SR_0,
            75
            )
        } else {
            Minutes = Math.floor(Seconds / 60)
            Seconds = Seconds % 60
            if (Minutes < 60) {
                ScrolText.showString(
                "" + Minutes + "m" + Seconds + "s",
                SCROLL_DIR.LEFT,
                SCROLL_ROTATE.SR_0,
                75
                )
            } else {
                Hours = Math.floor(Minutes / 60)
                Minutes = Minutes % 60
                ScrolText.showString(
                "" + Hours + "hr" + Minutes + "m" + Seconds + "s",
                SCROLL_DIR.LEFT,
                SCROLL_ROTATE.SR_0,
                75
                )
            }
        }
    }
    if (a_counter == 0) {
        basic.clearScreen()
        for (let index2 = 0; index2 <= 3; index2++) {
            led.plot(index2, Conversion_of_rev_to_pinout(list[index2 + 1]))
        }
        led.plot(4, Conversion_of_rev_to_pinout(tmp))
    } else if (a_counter == 1) {
        whaleysans.showNumber(Math.round(Workoutlast10seconds() * 6 / 3.25))
    } else if (a_counter == 2) {
        led.plotBarGraph(
        Math.round(Workoutlast10seconds() * 6 / 3.25),
        120
        )
    }
})
