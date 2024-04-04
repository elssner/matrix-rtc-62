function display64 (text: string) {
    matrix.line(49, 0, 127, 0)
    matrix.line(49, 47, 127, 47)
    matrix.line(49, 0, 49, 48)
}
function display128 (text: string) {
    matrix.clearMatrix()
    matrix.rasterCircle(64, 64, 63)
    matrix.rasterCircle(64, 96, 31)
    matrix.line(64, 64, 127, 127)
    matrix.writeDigitImageArray(text, 0, 0, 8, 0, matrix.eTransparent.u)
    matrix.writeDigitImageArray(text, 64, 24, -10, -2, matrix.eTransparent.t, matrix.oled_eFaktor(matrix.eFaktor.f2))
    matrix.writeDigitImageArray(text, 0, 64, 25, -3, matrix.eTransparent.t, matrix.oled_eFaktor(matrix.eFaktor.f5), matrix.oled_eFaktor(matrix.eFaktor.f8))
    matrix.writeDisplay()
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    rtcpcf85063tp.writeDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Sekunde), [0, -1 + rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC)])
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    rtcpcf85063tp.writeDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Sekunde), [0, 1 + rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC)])
})
matrix.init(matrix.ePages.y128, true)
matrix.init(matrix.ePages.y64, false, false, matrix.eI2C.I2C_x3D)
matrix.writeDisplay()
matrix.writeDisplay(0, 7, matrix.eI2C.I2C_x3D)
rtcpcf85063tp.beimStart(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
loops.everyInterval(1000, function () {
    rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
    if (rtcpcf85063tp.isChanged(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Sekunde))) {
        matrix.clearMatrix(0, 5)
        matrix.writeClock_radius24(24, 23, rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Stunde), rtcpcf85063tp.eFormat.DEC), rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC))
        display64(rtcpcf85063tp.getDate(rtcpcf85063tp.ePart.ohne, rtcpcf85063tp.ePart.ohne))
        matrix.writeDisplay(0, 5, matrix.eI2C.I2C_x3D)
    }
    matrix.clearMatrix(6, 7)
    matrix.writeDigitImageArray(rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit), 1, 49, 11, 0, matrix.eTransparent.u, matrix.oled_eFaktor(matrix.eFaktor.f2))
    matrix.writeDisplay(6, 7, matrix.eI2C.I2C_x3D)
    display128(rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.ohne))
})
