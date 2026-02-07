#!/usr/bin/env python3
"""
Example usage of the progress_bar function.
"""

import sys
from pathlib import Path

# Add lib to path so we can import progress_bar
sys.path.insert(0, str(Path(__file__).parent.parent / 'lib'))

from progress_bar import progress_bar

# Examples from the problem statement
print(progress_bar(1179))  # ████████████ 59% Complete
print(progress_bar(200))   # ██ 10% Complete
print(progress_bar(2000))  # ████████████████████ 100% Complete
print(progress_bar(2500))  # █████████████████████████ 125% Complete (no cap)
