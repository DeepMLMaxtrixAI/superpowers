#!/usr/bin/env python3
"""
Test the progress_bar function.
"""

import sys
from pathlib import Path

# Add lib to path so we can import progress_bar
sys.path.insert(0, str(Path(__file__).parent.parent / 'lib'))

from progress_bar import progress_bar

def test_progress_bar():
    """Test the progress_bar function with the provided examples."""
    
    # Test case 1: 1179/2000 = 59%
    result1 = progress_bar(1179)
    expected1 = "████████████ 59% Complete"
    print(f"Test 1: progress_bar(1179)")
    print(f"  Expected: {expected1}")
    print(f"  Got:      {result1}")
    assert result1 == expected1, f"Expected '{expected1}', got '{result1}'"
    print("  ✓ PASSED\n")
    
    # Test case 2: 200/2000 = 10%
    result2 = progress_bar(200)
    expected2 = "██ 10% Complete"
    print(f"Test 2: progress_bar(200)")
    print(f"  Expected: {expected2}")
    print(f"  Got:      {result2}")
    assert result2 == expected2, f"Expected '{expected2}', got '{result2}'"
    print("  ✓ PASSED\n")
    
    # Test case 3: 2000/2000 = 100%
    result3 = progress_bar(2000)
    expected3 = "████████████████████ 100% Complete"
    print(f"Test 3: progress_bar(2000)")
    print(f"  Expected: {expected3}")
    print(f"  Got:      {result3}")
    assert result3 == expected3, f"Expected '{expected3}', got '{result3}'"
    print("  ✓ PASSED\n")
    
    # Test case 4: 2500/2000 = 125% (no cap)
    result4 = progress_bar(2500)
    expected4 = "█████████████████████████ 125% Complete"
    print(f"Test 4: progress_bar(2500)")
    print(f"  Expected: {expected4}")
    print(f"  Got:      {result4}")
    assert result4 == expected4, f"Expected '{expected4}', got '{result4}'"
    print("  ✓ PASSED\n")
    
    print("=" * 60)
    print("All tests passed! ✓")
    print("=" * 60)

def test_edge_cases():
    """Test edge cases for the progress_bar function."""
    
    print("\nTesting edge cases:")
    print("-" * 60)
    
    # Test division by zero
    try:
        progress_bar(100, total=0)
        print("  ✗ FAILED: Should raise ValueError for total=0")
        assert False
    except ValueError as e:
        print(f"  ✓ PASSED: Correctly raises ValueError for total=0")
        assert "total cannot be zero" in str(e).lower()

if __name__ == '__main__':
    test_progress_bar()
    test_edge_cases()
