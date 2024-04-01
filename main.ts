input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    rtcpcf85063tp.writeDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Sekunde), [0, -1 + rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC)])
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    rtcpcf85063tp.writeDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Sekunde), [0, 1 + rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC)])
})
matrix.init(matrix.ePages.y64)
matrix.writeDisplay()
rtcpcf85063tp.beimStart(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
loops.everyInterval(1000, function () {
    rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
    if (rtcpcf85063tp.isChanged(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute))) {
        matrix.clearMatrix(0, 5)
        matrix.writeClock_radius24(30, 23, rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Stunde), rtcpcf85063tp.eFormat.DEC), rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC))
        matrix.writeDisplay(0, 5, matrix.eI2C.I2C_x3C)
    }
    matrix.writeDigitImageArray(rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit), 1, 49, 11, 0, matrix.eTransparent.u, matrix.oled_eFaktor(matrix.eFaktor.f2))
    matrix.writeDisplay(6, 7, matrix.eI2C.I2C_x3C)
})
