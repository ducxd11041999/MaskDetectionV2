import serial
import time
def setup(COM , baudrate , time):
    serialcomm = serial.Serial(COM, baudrate, timeout = time)
    #serialcomm.timeout = 1
    print("connect driver successfully")
    return serialcomm

def send_data(data, serialcomm):
    while True:
        serialcomm.write(data.encode())
        #time.sleep(0.5)
        if(serialcomm.readline().decode('ascii')):
            return serialcomm.readline().decode('ascii')

if __name__ == '__main__':
    serialcomm = setup('COM9', 9600, 1)
    send_data("c", serialcomm)