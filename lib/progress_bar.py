def progress_bar(current, total=2000, bar_length=20, label="Complete"):
    """
    Create a text-based progress bar.
    
    Args:
        current: Current progress value
        total: Total value (default: 2000)
        bar_length: Length of the progress bar in characters (default: 20)
        label: Label to display after the percentage (default: "Complete")
    
    Returns:
        A formatted string with progress bar, percentage, and label
    
    Raises:
        ValueError: If total is 0
    
    Examples:
        >>> progress_bar(1179)
        '████████████ 59% Complete'
        >>> progress_bar(200)
        '██ 10% Complete'
        >>> progress_bar(2000)
        '████████████████████ 100% Complete'
        >>> progress_bar(2500)
        '█████████████████████████ 125% Complete'
    """
    if total == 0:
        raise ValueError("total cannot be zero")
    
    ratio = current / total
    blocks = round(ratio * bar_length)
    bar = "█" * blocks
    percent = f"{ratio:.0%}"
    return f"{bar} {percent} {label}"
