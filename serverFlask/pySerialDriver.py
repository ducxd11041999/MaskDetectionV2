import serial
import time
global serialcomm
def setup(COM , baudrate , time):
    serialcomm = serial.Serial(COM, baudrate, timeout = time)
    #serialcomm.timeout = 1
    #print("connect driver successfully")
    return serialcomm

def send_data(data, serialcomm):
    i = 0
    while i < 5:
        serialcomm.write(data.encode())
        i = i + 1
        time.sleep(0.1)

    # if(serialcomm.readline()):
    #     return serialcomm.readline()

if __name__ == '__main__':
    serialcomm = setup('COM9', 19200, 1)
    send_data("o", serialcomm)