# Test simple Python code execution simulation

# Variables
name = "Alice"
age = 25
score = 95.5
is_student = True

print("Basic Information:")
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Score: {score}")

# Functions
def greet(person):
    return f"Hello, {person}!"

def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    else:
        return "C"

# Function calls
greeting = greet(name)
print(greeting)

grade = calculate_grade(score)
print(f"Grade: {grade}")

# Loops
print("Counting to 5:")
for i in range(1, 6):
    print(f"Count: {i}")

# Lists
fruits = ["apple", "banana", "orange"]
print(f"Fruits: {fruits}")

for fruit in fruits:
    print(f"I like {fruit}")

# Interactive input simulation
favorite_color = input("What's your favorite color? ")
print(f"Nice choice! {favorite_color} is a great color.")

# Class definition
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def study(self, subject):
        print(f"{self.name} is studying {subject}")

# Object creation and usage
student = Student(name, grade)
student.study("Python")

print("Program completed successfully!")
