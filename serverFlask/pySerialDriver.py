import time
import serial

def set_up(com, baud_rate, time_out):
    ser = serial.Serial(com, baud_rate, timeout=time_out)
    print("serial connected")
    return ser

def serial_write_data(data, ser):
    with ser as s:
        print(data)
        s.write(data)
        time.sleep(1)
def serial_read_data(ser):
    with ser as s:
        reading = s.readline()
        return reading

if __name__ == '__main__':
    ser = set_up("COM8", 9600, 1)
    serial_write_data('a'.encode(), ser)
    print(serial_read_data(ser))

