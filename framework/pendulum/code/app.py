import numpy as np
import matplotlib.pyplot as plt

# Constants
a = 1  # Scale factor for the lemniscate
v_max = 1  # Maximum velocity
omega = 0.1  # Angular frequency
time_steps = 1000  # Number of time steps for the simulation

# Lemniscate function in parametric form
def lemniscate(t):
    theta = omega * t
    r = np.sqrt(a**2 * np.cos(2 * theta))
    x = r * np.cos(theta)
    y = r * np.sin(theta)
    return x, y

# Circle function
def circle(t):
    theta = omega * t
    x = np.pi * a * np.cos(theta)
    y = np.pi * a * np.sin(theta)
    return x, y

# Kinematic model
def velocity(t):
    return v_max * np.sin(omega * t)

# Main simulation loop
x_values, y_values = [], []
for t in np.linspace(0, 2*np.pi, time_steps):
    if velocity(t) >= 0:  # Condition to switch between paths
        x, y = lemniscate(t)
    else:
        x, y = circle(t)
    x_values.append(x)
    y_values.append(y)

# Plotting the path
plt.plot(x_values, y_values)
plt.title('Path of the Point')
plt.xlabel('X')
plt.ylabel('Y')
plt.axis('equal')
plt.show()
