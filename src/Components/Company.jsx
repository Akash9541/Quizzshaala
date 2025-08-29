import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGoogle, FaMicrosoft, FaPaypal, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import { SiAdobe } from "react-icons/si";

// Data parsed from your uploaded PDF files with LeetCode URLs
const companyQuestions = {
    "Google": [
        { "title": "Fruit Into Baskets", "path": "https://leetcode.com/problems/fruit-into-baskets/" },
        { "title": "Unique Email Addresses", "path": "https://leetcode.com/problems/unique-email-addresses/" },
        { "title": "Next Closest Time", "path": "https://leetcode.com/problems/next-closest-time/" },
        { "title": "License Key Formatting", "path": "https://leetcode.com/problems/license-key-formatting/" },
        { "title": "Two Sum", "path": "https://leetcode.com/problems/two-sum/" },
        { "title": "K Empty Slots", "path": "https://leetcode.com/problems/k-empty-slots/" },
        { "title": "Longest Substring with At Most Two Distinct Characters", "path": "https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/" },
        { "title": "Odd Even Jump", "path": "https://leetcode.com/problems/odd-even-jump/" },
        { "title": "Evaluate Division", "path": "https://leetcode.com/problems/evaluate-division/" },
        { "title": "Guess the Word", "path": "https://leetcode.com/problems/guess-the-word/" },
        { "title": "Backspace String Compare", "path": "https://leetcode.com/problems/backspace-string-compare/" },
        { "title": "Minimum Cost to Hire K Workers", "path": "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/" },
        { "title": "Robot Room Cleaner", "path": "https://leetcode.com/problems/robot-room-cleaner/" },
        { "title": "Most Stones Removed with Same Row or Column", "path": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/" },
        { "title": "Range Sum Query 2D - Mutable", "path": "https://leetcode.com/problems/range-sum-query-2d-mutable/" },
        { "title": "Count Complete Tree Nodes", "path": "https://leetcode.com/problems/count-complete-tree-nodes/" },
        { "title": "Cracking the Safe", "path": "https://leetcode.com/problems/cracking-the-safe/" },
        { "title": "Bricks Falling When Hit", "path": "https://leetcode.com/problems/bricks-falling-when-hit/" },
        { "title": "Bulls and Cows", "path": "https://leetcode.com/problems/bulls-and-cows/" },
        { "title": "Split Array Largest Sum", "path": "https://leetcode.com/problems/split-array-largest-sum/" },
        { "title": "Find And Replace in String", "path": "https://leetcode.com/problems/find-and-replace-in-string/" },
        { "title": "Candy", "path": "https://leetcode.com/problems/candy/" },
        { "title": "Read N Characters Given Read4 II - Call multiple times", "path": "https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times/" },
        { "title": "Maximize Distance to Closest Person", "path": "https://leetcode.com/problems/maximize-distance-to-closest-person/" },
        { "title": "Minimum Area Rectangle", "path": "https://leetcode.com/problems/minimum-area-rectangle/" },
        { "title": "My Calendar II", "path": "https://leetcode.com/problems/my-calendar-ii/" },
        { "title": "Swap Adjacent in LR String", "path": "https://leetcode.com/problems/swap-adjacent-in-lr-string/" },
        { "title": "Design Search Autocomplete System", "path": "https://leetcode.com/problems/design-search-autocomplete-system/" },
        { "title": "Parse Lisp Expression", "path": "https://leetcode.com/problems/parse-lisp-expression/" },
        { "title": "Hand of Straights", "path": "https://leetcode.com/problems/hand-of-straights/" },
        { "title": "Meeting Rooms II", "path": "https://leetcode.com/problems/meeting-rooms-ii/" },
        { "title": "Word Abbreviation", "path": "https://leetcode.com/problems/word-abbreviation/" },
        { "title": "Strobogrammatic Number III", "path": "https://leetcode.com/problems/strobogrammatic-number-iii/" },
        { "title": "Isomorphic Strings", "path": "https://leetcode.com/problems/isomorphic-strings/" },
        { "title": "Optimal Account Balancing", "path": "https://leetcode.com/problems/optimal-account-balancing/" },
        { "title": "Repeated String Match", "path": "https://leetcode.com/problems/repeated-string-match/" },
        { "title": "RLE Iterator", "path": "https://leetcode.com/problems/rle-iterator/" },
        { "title": "24 Game", "path": "https://leetcode.com/problems/24-game/" },
        { "title": "Sentence Similarity", "path": "https://leetcode.com/problems/sentence-similarity/" },
        { "title": "Rectangle Area II", "path": "https://leetcode.com/problems/rectangle-area-ii/" },
        { "title": "Race Car", "path": "https://leetcode.com/problems/race-car/" },
        { "title": "Expressive Words", "path": "https://leetcode.com/problems/expressive-words/" },
        { "title": "Merge Intervals", "path": "https://leetcode.com/problems/merge-intervals/" },
        { "title": "Circular Array Loop", "path": "https://leetcode.com/problems/circular-array-loop/" },
        { "title": "Online Election", "path": "https://leetcode.com/problems/online-election/" },
        { "title": "Minimize Max Distance to Gas Station", "path": "https://leetcode.com/problems/minimize-max-distance-to-gas-station/" },
        { "title": "Sentence Screen Fitting", "path": "https://leetcode.com/problems/sentence-screen-fitting/" },
        { "title": "Logger Rate Limiter", "path": "https://leetcode.com/problems/logger-rate-limiter/" },
        { "title": "Longest Word in Dictionary through Deleting", "path": "https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/" },
        { "title": "Number of Islands", "path": "https://leetcode.com/problems/number-of-islands/" },
        { "title": "Unique Word Abbreviation", "path": "https://leetcode.com/problems/unique-word-abbreviation/" },
        { "title": "Minimum Window Subsequence", "path": "https://leetcode.com/problems/minimum-window-subsequence/" },
        { "title": "Decode String", "path": "https://leetcode.com/problems/decode-string/" },
        { "title": "Longest Line of Consecutive One in Matrix", "path": "https://leetcode.com/problems/longest-line-of-consecutive-one-in-matrix/" },
        { "title": "Encode and Decode Strings", "path": "https://leetcode.com/problems/encode-and-decode-strings/" },
        { "title": "Split BST", "path": "https://leetcode.com/problems/split-bst/" },
        { "title": "Longest Increasing Path in a Matrix", "path": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/" },
        { "title": "Redundant Connection", "path": "https://leetcode.com/problems/redundant-connection/" },
        { "title": "Add Two Numbers", "path": "https://leetcode.com/problems/add-two-numbers/" },
        { "title": "Toeplitz Matrix", "path": "https://leetcode.com/problems/toeplitz-matrix/" },
        { "title": "Missing Ranges", "path": "https://leetcode.com/problems/missing-ranges/" },
        { "title": "Design Snake Game", "path": "https://leetcode.com/problems/design-snake-game/" },
        { "title": "Exam Room", "path": "https://leetcode.com/problems/exam-room/" },
        { "title": "Median of Two Sorted Arrays", "path": "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
        { "title": "Heaters", "path": "https://leetcode.com/problems/heaters/" },
        { "title": "Strobogrammatic Number", "path": "https://leetcode.com/problems/strobogrammatic-number/" },
        { "title": "Number Of Corner Rectangles", "path": "https://leetcode.com/problems/number-of-corner-rectangles/" },
        { "title": "Random Pick with Weight", "path": "https://leetcode.com/problems/random-pick-with-weight/" },
        { "title": "New 21 Game", "path": "https://leetcode.com/problems/new-21-game/" },
        { "title": "Image Overlap", "path": "https://leetcode.com/problems/image-overlap/" },
        { "title": "Trapping Rain Water", "path": "https://leetcode.com/problems/trapping-rain-water/" },
        { "title": "Strobogrammatic Number II", "path": "https://leetcode.com/problems/strobogrammatic-number-ii/" },
        { "title": "Binary Tree Longest Consecutive Sequence II", "path": "https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii/" },
        { "title": "Maximum Vacation Days", "path": "https://leetcode.com/problems/maximum-vacation-days/" },
        { "title": "Redundant Connection II", "path": "https://leetcode.com/problems/redundant-connection-ii/" },
        { "title": "Frog Jump", "path": "https://leetcode.com/problems/frog-jump/" },
        { "title": "Insert Delete GetRandom O(1)", "path": "https://leetcode.com/problems/insert-delete-getrandom-o1/" },
        { "title": "Read N Characters Given Read4", "path": "https://leetcode.com/problems/read-n-characters-given-read4/" },
        { "title": "Cat and Mouse", "path": "https://leetcode.com/problems/cat-and-mouse/" },
        { "title": "LRU Cache", "path": "https://leetcode.com/problems/lru-cache/" },
        { "title": "Guess Number Higher or Lower II", "path": "https://leetcode.com/problems/guess-number-higher-or-lower-ii/" },
        { "title": "Reorganize String", "path": "https://leetcode.com/problems/reorganize-string/" }
    ],
    "Microsoft": [
        { "title": "Copy List with Random Pointer", "path": "https://leetcode.com/problems/copy-list-with-random-pointer/" },
        { "title": "Reverse Words in a String", "path": "https://leetcode.com/problems/reverse-words-in-a-string/" },
        { "title": "Remove K Digits", "path": "https://leetcode.com/problems/remove-k-digits/" },
        { "title": "Compare Version Numbers", "path": "https://leetcode.com/problems/compare-version-numbers/" },
        { "title": "Two Sum", "path": "https://leetcode.com/problems/two-sum/" },
        { "title": "Design Tic-Tac-Toe", "path": "https://leetcode.com/problems/design-tic-tac-toe/" },
        { "title": "Binary Tree Zigzag Level Order Traversal", "path": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
        { "title": "LRU Cache", "path": "https://leetcode.com/problems/lru-cache/" },
        { "title": "Merge Sorted Array", "path": "https://leetcode.com/problems/merge-sorted-array/" },
        { "title": "Meeting Rooms II", "path": "https://leetcode.com/problems/meeting-rooms-ii/" },
        { "title": "Spiral Matrix", "path": "https://leetcode.com/problems/spiral-matrix/" },
        { "title": "Number of Islands", "path": "https://leetcode.com/problems/number-of-islands/" },
        { "title": "Add Two Numbers II", "path": "https://leetcode.com/problems/add-two-numbers-ii/" },
        { "title": "Add Two Numbers", "path": "https://leetcode.com/problems/add-two-numbers/" },
        { "title": "Reverse Nodes in k-Group", "path": "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
        { "title": "String Compression", "path": "https://leetcode.com/problems/string-compression/" },
        { "title": "Valid Tic-Tac-Toe State", "path": "https://leetcode.com/problems/valid-tic-tac-toe-state/" },
        { "title": "Find the Closest Palindrome", "path": "https://leetcode.com/problems/find-the-closest-palindrome/" },
        { "title": "Regular Expression Matching", "path": "https://leetcode.com/problems/regular-expression-matching/" },
        { "title": "Rotate Image", "path": "https://leetcode.com/problems/rotate-image/" },
        { "title": "Median of Two Sorted Arrays", "path": "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
        { "title": "String to Integer (atoi)", "path": "https://leetcode.com/problems/string-to-integer-atoi/" },
        { "title": "Reverse Words in a String II", "path": "https://leetcode.com/problems/reverse-words-in-a-string-ii/" },
        { "title": "Maximum Subarray", "path": "https://leetcode.com/problems/maximum-subarray/" },
        { "title": "Reverse Linked List", "path": "https://leetcode.com/problems/reverse-linked-list/" },
        { "title": "Valid Parentheses", "path": "https://leetcode.com/problems/valid-parentheses/" },
        { "title": "Serialize and Deserialize Binary Tree", "path": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
        { "title": "Integer to English Words", "path": "https://leetcode.com/problems/integer-to-english-words/" },
        { "title": "Exclusive Time of Functions", "path": "https://leetcode.com/problems/exclusive-time-of-functions/" },
        { "title": "Sort Colors", "path": "https://leetcode.com/problems/sort-colors/" },
        { "title": "Maximal Rectangle", "path": "https://leetcode.com/problems/maximal-rectangle/" },
        { "title": "Remove Comments", "path": "https://leetcode.com/problems/remove-comments/" },
        { "title": "Inorder Successor in BST", "path": "https://leetcode.com/problems/inorder-successor-in-bst/" },
        { "title": "Swap Nodes in Pairs", "path": "https://leetcode.com/problems/swap-nodes-in-pairs/" },
        { "title": "Pacific Atlantic Water Flow", "path": "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
        { "title": "Best Time to Buy and Sell Stock", "path": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
        { "title": "Validate Binary Search Tree", "path": "https://leetcode.com/problems/validate-binary-search-tree/" },
        { "title": "Longest Palindromic Substring", "path": "https://leetcode.com/problems/longest-palindromic-substring/" },
        { "title": "Merge k Sorted Lists", "path": "https://leetcode.com/problems/merge-k-sorted-lists/" },
        { "title": "Word Search", "path": "https://leetcode.com/problems/word-search/" },
        { "title": "Boundary of Binary Tree", "path": "https://leetcode.com/problems/boundary-of-binary-tree/" },
        { "title": "Find Median from Data Stream", "path": "https://leetcode.com/problems/find-median-from-data-stream/" },
        { "title": "Design HashMap", "path": "https://leetcode.com/problems/design-hashmap/" },
        { "title": "Merge Two Sorted Lists", "path": "https://leetcode.com/problems/merge-two-sorted-lists/" },
        { "title": "Search a 2D Matrix II", "path": "https://leetcode.com/problems/search-a-2d-matrix-ii/" },
        { "title": "Roman to Integer", "path": "https://leetcode.com/problems/roman-to-integer/" },
        { "title": "Basic Calculator", "path": "https://leetcode.com/problems/basic-calculator/" },
        { "title": "Find the Duplicate Number", "path": "https://leetcode.com/problems/find-the-duplicate-number/" },
        { "title": "Wildcard Matching", "path": "https://leetcode.com/problems/wildcard-matching/" },
        { "title": "Letter Combinations of a Phone Number", "path": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
        { "title": "Majority Element II", "path": "https://leetcode.com/problems/majority-element-ii/" },
        { "title": "Delete Node in a BST", "path": "https://leetcode.com/problems/delete-node-in-a-bst/" },
        { "title": "Next Permutation", "path": "https://leetcode.com/problems/next-permutation/" },
        { "title": "Single Number III", "path": "https://leetcode.com/problems/single-number-iii/" },
        { "title": "Count of Smaller Numbers After Self", "path": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/" },
        { "title": "Missing Number", "path": "https://leetcode.com/problems/missing-number/" },
        { "title": "Spiral Matrix", "path": "https://leetcode.com/problems/spiral-matrix/" },
        { "title": "Edit Distance", "path": "https://leetcode.com/problems/edit-distance/" },
        { "title": "Department Top Three Salaries", "path": "https://leetcode.com/problems/department-top-three-salaries/" },
        { "title": "Add Binary", "path": "https://leetcode.com/problems/add-binary/" },
        { "title": "Perfect Squares", "path": "https://leetcode.com/problems/perfect-squares/" },
        { "title": "Longest Valid Parentheses", "path": "https://leetcode.com/problems/longest-valid-parentheses/" },
        { "title": "4Sum", "path": "https://leetcode.com/problems/4sum/" },
        { "title": "Climbing Stairs", "path": "https://leetcode.com/problems/climbing-stairs/" },
        { "title": "Trapping Rain Water", "path": "https://leetcode.com/problems/trapping-rain-water/" },
        { "title": "Permutations II", "path": "https://leetcode.com/problems/permutations-ii/" },
        { "title": "Min Stack", "path": "https://leetcode.com/problems/min-stack/" },
        { "title": "Binary Tree Right Side View", "path": "https://leetcode.com/problems/binary-tree-right-side-view/" },
        { "title": "Encode and Decode TinyURL", "path": "https://leetcode.com/problems/encode-and-decode-tinyurl/" },
        { "title": "Diameter of Binary Tree", "path": "https://leetcode.com/problems/diameter-of-binary-tree/" },
        { "title": "Simplify Path", "path": "https://leetcode.com/problems/simplify-path/" },
        { "title": "Design HashMap", "path": "https://leetcode.com/problems/design-hashmap/" },
        { "title": "Unique Binary Search Trees II", "path": "https://leetcode.com/problems/unique-binary-search-trees-ii/" },
        { "title": "Linked List Cycle", "path": "https://leetcode.com/problems/linked-list-cycle/" },
        { "title": "Basic Calculator", "path": "https://leetcode.com/problems/basic-calculator/" },
        { "title": "Max Increase to Keep City Skyline", "path": "https://leetcode.com/problems/max-increase-to-keep-city-skyline/" },
        { "title": "Remove Nth Node From End of List", "path": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
        { "title": "Palindrome Partitioning", "path": "https://leetcode.com/problems/palindrome-partitioning/" },
        { "title": "Ugly Number", "path": "https://leetcode.com/problems/ugly-number/" },
        { "title": "Longest Increasing Subsequence", "path": "https://leetcode.com/problems/longest-increasing-subsequence/" },
        { "title": "Kth Smallest Element in a Sorted Matrix", "path": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" },
        { "title": "Evaluate Division", "path": "https://leetcode.com/problems/evaluate-division/" },
        { "title": "Sum of Left Leaves", "path": "https://leetcode.com/problems/sum-of-left-leaves/" },
        { "title": "Add Digits", "path": "https://leetcode.com/problems/add-digits/" },
        { "title": "Rectangle Overlap", "path": "https://leetcode.com/problems/rectangle-overlap/" },
        { "title": "Sort Array By Parity", "path": "https://leetcode.com/problems/sort-array-by-parity/" },
        { "title": "Valid Parentheses", "path": "https://leetcode.com/problems/valid-parentheses/" },
        { "title": "Rotate Image", "path": "https://leetcode.com/problems/rotate-image/" },
        { "title": "Validate Binary Search Tree", "path": "https://leetcode.com/problems/validate-binary-search-tree/" },
        { "title": "Factorial Trailing Zeroes", "path": "https://leetcode.com/problems/factorial-trailing-zeroes/" },
        { "title": "Sum of Two Integers", "path": "https://leetcode.com/problems/sum-of-two-integers/" },
        { "title": "Max Area of Island", "path": "https://leetcode.com/problems/max-area-of-island/" },
        { "title": "ZigZag Conversion", "path": "https://leetcode.com/problems/zigzag-conversion/" },
        { "title": "Wildcard Matching", "path": "https://leetcode.com/problems/wildcard-matching/" },
        { "title": "Largest Rectangle in Histogram", "path": "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
        { "title": "Word Break", "path": "https://leetcode.com/problems/word-break/" },
        { "title": "Rotate Array", "path": "https://leetcode.com/problems/rotate-array/" },
        { "title": "Contains Duplicate II", "path": "https://leetcode.com/problems/contains-duplicate-ii/" },
        { "title": "Reverse String", "path": "https://leetcode.com/problems/reverse-string/" },
        { "title": "Palindromic Substrings", "path": "https://leetcode.com/problems/palindromic-substrings/" },
        { "title": "Jump Game II", "path": "https://leetcode.com/problems/jump-game-ii/" },
        { "title": "Pow(x, n)", "path": "https://leetcode.com/problems/powx-n/" },
        { "title": "House Robber", "path": "https://leetcode.com/problems/house-robber/" },
        { "title": "Permutations", "path": "https://leetcode.com/problems/permutations/" },
        { "title": "Group Anagrams", "path": "https://leetcode.com/problems/group-anagrams/" },
        { "title": "Reverse Linked List II", "path": "https://leetcode.com/problems/reverse-linked-list-ii/" },
        { "title": "Binary Tree Level Order Traversal II", "path": "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/" },
        { "title": "Sliding Window Maximum", "path": "https://leetcode.com/problems/sliding-window-maximum/" },
        { "title": "To Lower Case", "path": "https://leetcode.com/problems/to-lower-case/" },
        { "title": "Squares of a Sorted Array", "path": "https://leetcode.com/problems/squares-of-a-sorted-array/" },
        { "title": "Flatten Binary Tree to Linked List", "path": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/" },
        { "title": "Binary Tree Inorder Traversal", "path": "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
        { "title": "Symmetric Tree", "path": "https://leetcode.com/problems/symmetric-tree/" },
        { "title": "Construct Binary Tree from Preorder and Inorder Traversal", "path": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
        { "title": "Pascal's Triangle II", "path": "https://leetcode.com/problems/pascals-triangle-ii/" },
        { "title": "Single Number", "path": "https://leetcode.com/problems/single-number/" },
        { "title": "Number of Islands", "path": "https://leetcode.com/problems/number-of-islands/" },
        { "title": "Remove Linked List Elements", "path": "https://leetcode.com/problems/remove-linked-list-elements/" },
        { "title": "Robot Return to Origin", "path": "https://leetcode.com/problems/robot-return-to-origin/" },
        { "title": "Divide Two Integers", "path": "https://leetcode.com/problems/divide-two-integers/" },
        { "title": "Count and Say", "path": "https://leetcode.com/problems/count-and-say/" },
        { "title": "Length of Last Word", "path": "https://leetcode.com/problems/length-of-last-word/" },
        { "title": "Minimum Path Sum", "path": "https://leetcode.com/problems/minimum-path-sum/" },
        { "title": "Decode Ways", "path": "https://leetcode.com/problems/decode-ways/" },
        { "title": "Minimum Depth of Binary Tree", "path": "https://leetcode.com/problems/minimum-depth-of-binary-tree/" },
        { "title": "Count Primes", "path": "https://leetcode.com/problems/count-primes/" },
        { "title": "Find the Duplicate Number", "path": "https://leetcode.com/problems/find-the-duplicate-number/" },
        { "title": "Sort Colors", "path": "https://leetcode.com/problems/sort-colors/" },
        { "title": "Binary Tree Zigzag Level Order Traversal", "path": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
        { "title": "Convert Sorted Array to Binary Search Tree", "path": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
        { "title": "Invert Binary Tree", "path": "https://leetcode.com/problems/invert-binary-tree/" },
        { "title": "Lowest Common Ancestor of a Binary Search Tree", "path": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
        { "title": "Unique Paths", "path": "https://leetcode.com/problems/unique-paths/" },
        { "title": "Path Sum", "path": "https://leetcode.com/problems/path-sum/" },
        { "title": "Two Sum II - Input array is sorted", "path": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
        { "title": "Majority Element", "path": "https://leetcode.com/problems/majority-element/" },
        { "title": "Coin Change", "path": "https://leetcode.com/problems/coin-change/" },
        { "title": "Fibonacci Number", "path": "https://leetcode.com/problems/fibonacci-number/" },
        { "title": "Swap Nodes in Pairs", "path": "https://leetcode.com/problems/swap-nodes-in-pairs/" },
        { "title": "Letter Combinations of a Phone Number", "path": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
        { "title": "Implement strStr()", "path": "https://leetcode.com/problems/implement-strstr/" },
        { "title": "Merge Intervals", "path": "https://leetcode.com/problems/merge-intervals/" },
        { "title": "Move Zeroes", "path": "https://leetcode.com/problems/move-zeroes/" }
    ],
    "Paypal": [
        { "title": "Peeking Iterator", "path": "https://leetcode.com/problems/peeking-iterator/" },
        { "title": "Reverse Nodes in k-Group", "path": "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
        { "title": "K-diff Pairs in an Array", "path": "https://leetcode.com/problems/k-diff-pairs-in-an-array/" },
        { "title": "Valid Anagram", "path": "https://leetcode.com/problems/valid-anagram/" },
        { "title": "Spiral Matrix", "path": "https://leetcode.com/problems/spiral-matrix/" },
        { "title": "Basic Calculator", "path": "https://leetcode.com/problems/basic-calculator/" },
        { "title": "Binary Tree Right Side View", "path": "https://leetcode.com/problems/binary-tree-right-side-view/" },
        { "title": "Integer to English Words", "path": "https://leetcode.com/problems/integer-to-english-words/" },
        { "title": "Valid Palindrome", "path": "https://leetcode.com/problems/valid-palindrome/" },
        { "title": "Longest Palindromic Substring", "path": "https://leetcode.com/problems/longest-palindromic-substring/" },
        { "title": "Linked List Cycle", "path": "https://leetcode.com/problems/linked-list-cycle/" },
        { "title": "Median of Two Sorted Arrays", "path": "https://leetcode.com/problems/median-of-two-sorted-ararrays/" },
        { "title": "String to Integer (atoi)", "path": "https://leetcode.com/problems/string-to-integer-atoi/" },
        { "title": "Longest Common Prefix", "path": "https://leetcode.com/problems/longest-common-prefix/" },
        { "title": "Two Sum", "path": "https://leetcode.com/problems/two-sum/" },
        { "title": "Add Two Numbers", "path": "https://leetcode.com/problems/add-two-numbers/" },
        { "title": "Intersection of Two Arrays", "path": "https://leetcode.com/problems/intersection-of-two-arrays/" },
        { "title": "Number of Islands", "path": "https://leetcode.com/problems/number-of-islands/" },
        { "title": "Best Time to Buy and Sell Stock", "path": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
        { "title": "Unique Paths", "path": "https://leetcode.com/problems/unique-paths/" },
        { "title": "Reverse Linked List", "path": "https://leetcode.com/problems/reverse-linked-list/" },
        { "title": "Valid Parentheses", "path": "https://leetcode.com/problems/valid-parentheses/" },
        { "title": "Word Search", "path": "https://leetcode.com/problems/word-search/" },
        { "title": "Merge Two Sorted Lists", "path": "https://leetcode.com/problems/merge-two-sorted-lists/" },
        { "title": "Decode String", "path": "https://leetcode.com/problems/decode-string/" },
        { "title": "Meeting Rooms", "path": "https://leetcode.com/problems/meeting-rooms/" },
        { "title": "Set Matrix Zeroes", "path": "https://leetcode.com/problems/set-matrix-zeroes/" },
        { "title": "Path Sum II", "path": "https://leetcode.com/problems/path-sum-ii/" },
        { "title": "Linked List Cycle II", "path": "https://leetcode.com/problems/linked-list-cycle-ii/" },
        { "title": "Search in a Binary Search Tree", "path": "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
        { "title": "Flipping an Image", "path": "https://leetcode.com/problems/flipping-an-image/" },
        { "title": "Binary Tree Inorder Traversal", "path": "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
        { "title": "Binary Tree Level Order Traversal", "path": "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
        { "title": "Pascal's Triangle II", "path": "https://leetcode.com/problems/pascals-triangle-ii/" },
        { "title": "Binary Tree Right Side View", "path": "https://leetcode.com/problems/binary-tree-right-side-view/" },
        { "title": "Divide Two Integers", "path": "https://leetcode.com/problems/divide-two-integers/" },
        { "title": "Big Countries", "path": "https://leetcode.com/problems/big-countries/" },
        { "title": "Remove Linked List Elements", "path": "https://leetcode.com/problems/remove-linked-list-elements/" },
        { "title": "Reverse Words in a String", "path": "https://leetcode.com/problems/reverse-words-in-a-string/" },
        { "title": "Course Schedule", "path": "https://leetcode.com/problems/course-schedule/" },
        { "title": "Longest Substring Without Repeating Characters", "path": "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { "title": "Jump Game", "path": "https://leetcode.com/problems/jump-game/" },
        { "title": "3Sum", "path": "https://leetcode.com/problems/3sum/" },
        { "title": "Maximum Subarray", "path": "https://leetcode.com/problems/maximum-subarray/" },
        { "title": "Word Break", "path": "https://leetcode.com/problems/word-break/" },
        { "title": "Valid Parentheses", "path": "https://leetcode.com/problems/valid-parentheses/" },
        { "title": "Permutations", "path": "https://leetcode.com/problems/permutations/" },
        { "title": "Search in Rotated Sorted Array", "path": "https://leetcode.com/problems/search-in-rotated-sorted-array/" }
    ],
    "Adobe": [
        { "title": "Two Sum", "path": "https://leetcode.com/problems/two-sum/" },
        { "title": "Add Two Numbers", "path": "https://leetcode.com/problems/add-two-numbers/" },
        { "title": "Median of Two Sorted Arrays", "path": "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
        { "title": "3Sum", "path": "https://leetcode.com/problems/3sum/" },
        { "title": "Reverse Integer", "path": "https://leetcode.com/problems/reverse-integer/" },
        { "title": "Longest Substring Without Repeating Characters", "path": "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { "title": "Combine Two Tables", "path": "https://leetcode.com/problems/combine-two-tables/" },
        { "title": "Longest Palindromic Substring", "path": "https://leetcode.com/problems/longest-palindromic-substring/" },
        { "title": "Nth Highest Salary", "path": "https://leetcode.com/problems/nth-highest-salary/" },
        { "title": "Jewels and Stones", "path": "https://leetcode.com/problems/jewels-and-stones/" },
        { "title": "Number of Atoms", "path": "https://leetcode.com/problems/number-of-atoms/" },
        { "title": "Copy List with Random Pointer", "path": "https://leetcode.com/problems/copy-list-with-random-pointer/" },
        { "title": "Container With Most Water", "path": "https://leetcode.com/problems/container-with-most-water/" },
        { "title": "LRU Cache", "path": "https://leetcode.com/problems/lru-cache/" },
        { "title": "Merge Two Sorted Lists", "path": "https://leetcode.com/problems/merge-two-sorted-lists/" },
        { "title": "Reverse Linked List", "path": "https://leetcode.com/problems/reverse-linked-list/" },
        { "title": "Substring with Concatenation of All Words", "path": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/" },
        { "title": "Unique Email Addresses", "path": "https://leetcode.com/problems/unique-email-addresses/" },
        { "title": "Merge k Sorted Lists", "path": "https://leetcode.com/problems/merge-k-sorted-lists/" },
        { "title": "Big Countries", "path": "https://leetcode.com/problems/big-countries/" },
        { "title": "Consecutive Numbers Sum", "path": "https://leetcode.com/problems/consecutive-numbers-sum/" },
        { "title": "Word Frequency", "path": "https://leetcode.com/problems/word-frequency/" },
        { "title": "Largest Divisible Subset", "path": "https://leetcode.com/problems/largest-divisible-subset/" },
        { "title": "Maximum Subarray", "path": "https://leetcode.com/problems/maximum-subarray/" },
        { "title": "Count Binary Substrings", "path": "https://leetcode.com/problems/count-binary-substrings/" },
        { "title": "Next Greater Element III", "path": "https://leetcode.com/problems/next-greater-element-iii/" },
        { "title": "Longest Common Prefix", "path": "https://leetcode.com/problems/longest-common-prefix/" },
        { "title": "Convert Sorted Array to Binary Search Tree", "path": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
        { "title": "Invert Binary Tree", "path": "https://leetcode.com/problems/invert-binary-tree/" },
        { "title": "Lowest Common Ancestor of a Binary Search Tree", "path": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
        { "title": "Unique Paths", "path": "https://leetcode.com/problems/unique-paths/" },
        { "title": "Path Sum", "path": "https://leetcode.com/problems/path-sum/" },
        { "title": "Two Sum II - Input array is sorted", "path": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
        { "title": "Majority Element", "path": "https://leetcode.com/problems/majority-element/" },
        { "title": "Coin Change", "path": "https://leetcode.com/problems/coin-change/" },
        { "title": "Fibonacci Number", "path": "https://leetcode.com/problems/fibonacci-number/" }
    ]
};

const CompanyQuestionsPage = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();

    const getCompanyIcon = (company) => {
        switch (company) {
            case 'Google':
                return <FaGoogle className="text-white" />;
            case 'Microsoft':
                return <FaMicrosoft className="text-white" />;
            case 'Paypal':
                return <FaPaypal className="text-white" />;
            case 'Adobe':
                return <SiAdobe className="text-white" />;
            default:
                return <FaCode className="text-white" />;
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background from VerbalPage */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/5 via-transparent to-cyan-900/5" />
            </div>

            <div className="relative z-10 min-h-screen p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/Front')}
                        className="group flex items-center gap-3 px-6 py-3 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-white rounded-full transition-all duration-300 border border-slate-700 hover:border-slate-600 hover:scale-105"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                </div>

                {/* Main Content */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-300 to-pink-400 bg-clip-text text-transparent mb-4">
                        Company-Wise LeetCode Questions 💼
                    </h1>
                    <p className="text-xl text-gray-300">Explore and practice questions from top tech companies</p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {selectedCompany ? (
                        <>
                            {/* Questions List for Selected Company */}
                            <div className="bg-slate-800/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl mb-8">
                                <button
                                    onClick={() => setSelectedCompany(null)}
                                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 transition-colors"
                                >
                                    <FaArrowLeft /> Back to Companies
                                </button>
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                                    {getCompanyIcon(selectedCompany)} {selectedCompany} Questions
                                </h2>
                                <div className="space-y-4">
                                    {companyQuestions[selectedCompany].map((q, index) => (
                                        <div
                                            key={index}
                                            className="w-full text-left px-6 py-4 rounded-xl border border-white/20 hover:border-white/40 bg-white/10 backdrop-blur-md text-white transition-all duration-300 transform hover:scale-[1.01] cursor-pointer flex items-center justify-between"
                                            onClick={() => window.open(q.path, "_blank")}
                                        >
                                            <span className="text-lg">{q.title}</span>
                                            <FaExternalLinkAlt className="text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Company Selection Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {Object.keys(companyQuestions).map((company) => (
                                    <button
                                        key={company}
                                        onClick={() => setSelectedCompany(company)}
                                        className="group flex flex-col items-center justify-center p-8 bg-slate-800/30 backdrop-blur-md rounded-3xl border border-slate-700/50 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-700/50"
                                    >
                                        <div className="text-5xl mb-4 text-white group-hover:text-indigo-400 transition-colors">
                                            {getCompanyIcon(company)}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                            {company}
                                        </h3>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {companyQuestions[company].length} Questions
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyQuestionsPage;