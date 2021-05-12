import autopy
import time
import random


def cursor():
    a = random.randint(1,1000)
    b= random.randint(1,1000)
    autopy.mouse.move(a,b)
    time.sleep(15)
    cursor()
# autopy.mouse.move(a,b)


cursor()


