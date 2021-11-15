# Log all pairs of array
# ie get all permutations

def log_pairs(boxes):
    pairs = []
    for item in boxes:
        for item_other in boxes:
            pairs.append((item, item_other))
    print(pairs)

boxes = [1, 2, 3, 4, 5]
log_pairs(boxes)