import serial
import time
global serialcomm
def setup(COM , baudrate , time):
    serialcomm = serial.Serial(COM, baudrate, timeout = time)
    #serialcomm.timeout = 1
    #print("connect driver successfully")
    return serialcomm

def send_data(data, serialcomm):
    while True:
        serialcomm.write(data.encode())
        #time.sleep(0.5)
        if(serialcomm.readline()):
            return serialcomm.readline()

if __name__ == '__main__':
    serialcomm = setup('COM7', 19200, 1)
    send_data("o", serialcomm)