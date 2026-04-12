def numeric_check(value: str) -> bool:
    try:
        float(value)
        return True
    except ValueError:
        return False