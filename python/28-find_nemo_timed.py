from datetime import datetime


def find_nemo(array):
    t1 = datetime.now()
    for item in array:
        if item == 'nemo':
            print('found NEMO')
    t2 = datetime.now()
    print(f'Call to find nemo took {t2 - t1} milliseconds')


nemo = ['nemo']
everyone = ['dory', 'bruce', 'marlin', "nemo", 'gill', 'bloat', 'nigel', 'squirt', 'darla', 'hank']
large = ['test' for _ in range(100000)]

find_nemo(nemo)
find_nemo(everyone)
find_nemo(large)
