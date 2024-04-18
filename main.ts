function display64 () {
    matrix.line(50, 0, 127, 0)
    matrix.line(50, 47, 127, 47)
    matrix.line(127, 47, 127, 0)
    matrix.line(50, 0, 50, 47)
    matrix.writeTextEEPROM(5, 7, rtcpcf85063tp.getDate(rtcpcf85063tp.ePart.ohne, rtcpcf85063tp.ePart.mit), 7, -4, matrix.eTransparent.t)
}
function display128 () {
    matrix.clearMatrix()
    matrix.rasterCircle(64, 64, 63)
    matrix.rasterCircle(64, 96, 31)
    matrix.line(64, 64, 127, 127)
    matrix.writeTextEEPROM(0, 0, rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.ohne))
    matrix.comment("rückwärts nach oben")
    matrix.writeTextEEPROM(1, 14, rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.ohne), -10, -2, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f2))
    matrix.comment("*8")
    matrix.writeTextEEPROM(8, 0, rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.ohne), 25, -3, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f5), matrix.matrix_eFaktor(matrix.eFaktor.f8))
    matrix.imageArrayEEPROM(rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.ohne))
    matrix.writeImage(matrix.imageDrehen(matrix.getImage(0), matrix.eZeichenDrehen.rechts), 0, 22, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f3))
    matrix.writeImage(matrix.imageDrehen(matrix.getImage(1), matrix.eZeichenDrehen.links), 25, 22, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f3))
    matrix.writeImage(matrix.imageDrehen(matrix.getImage(2), matrix.eZeichenDrehen.nicht), 50, 22, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f4))
    matrix.writeImage(matrix.imageDrehen(matrix.getImage(3), matrix.eZeichenDrehen.halb), 60, 22, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f3))
    matrix.writeImage(matrix.imageDrehen(matrix.getImage(4), matrix.eZeichenDrehen.xspiegeln), 85, 22, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f3))
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    rtcpcf85063tp.writeDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Sekunde), [0, -1 + rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC)])
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    rtcpcf85063tp.writeDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Sekunde), [0, 1 + rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC)])
})
matrix.comment("elssner/matrix-rtc-62")
matrix.init(matrix.ePages.y128, true)
matrix.init(matrix.ePages.y64, false, false, matrix.eI2C.I2C_x3D)
matrix.displayMatrix()
matrix.displayMatrix(0, 7, matrix.eI2C.I2C_x3D)
rtcpcf85063tp.beimStart(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
loops.everyInterval(1000, function () {
    rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
    if (rtcpcf85063tp.isChanged(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute))) {
        matrix.comment("6 blaue Zeilen")
        matrix.clearMatrix(0, 5)
        matrix.writeClock(24, 23, 24, rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Stunde), rtcpcf85063tp.eFormat.DEC), rtcpcf85063tp.getByte(rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Minute), rtcpcf85063tp.eFormat.DEC))
        display64()
        matrix.displayMatrix(0, 5, matrix.eI2C.I2C_x3D)
        matrix.comment("großes Display")
        display128()
        matrix.displayMatrix()
    }
    matrix.comment("2 gelbe Zeilen")
    matrix.clearMatrix(6, 7)
    matrix.writeTextEEPROM(6, 0, rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit), 16, 0, matrix.eTransparent.u, matrix.matrix_eFaktor(matrix.eFaktor.f2))
    matrix.displayMatrix(6, 7, matrix.eI2C.I2C_x3D)
})
