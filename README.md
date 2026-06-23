# Snake Game

A simple classic Snake Game built with **HTML, CSS, and JavaScript**.

## Overview

This project is a browser-based snake game where the player controls a snake, collects food, grows in size, and tries to survive as long as possible without hitting walls or itself.

It supports:

* Keyboard controls (WASD + Arrow Keys)
* Mobile swipe controls
* Score tracking
* High score tracking
* Pause/Resume
* Restart option

---

## Features

* **20×20 grid game board**
* Smooth snake movement
* Random food generation
* Collision detection
* Game over overlay
* Touch support for mobile devices
* Real-time score updates

---

## Game Logic

### Snake Movement

The snake moves continuously in the current direction.

Directions:

* Up
* Down
* Left
* Right

The game updates every **150ms**.

---

### Food System

Food appears randomly on empty cells.

When the snake eats food:

* Score increases by `1`
* Snake grows longer
* New food is generated

---

### Collision System

The game ends when:

* Snake hits the wall
* Snake hits itself

---

## Controls

### Keyboard

| Key       | Action         |
| --------- | -------------- |
| `W` / `↑` | Move Up        |
| `S` / `↓` | Move Down      |
| `A` / `←` | Move Left      |
| `D` / `→` | Move Right     |
| `Space`   | Pause / Resume |

---

### Mobile

Swipe on the game board:

* Swipe Up → Move Up
* Swipe Down → Move Down
* Swipe Left → Move Left
* Swipe Right → Move Right

---

## Project Structure

```text
snake-game/
│── index.html
│── style.css
│── script.js
│── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/snake-game.git
```

Open the project folder:

```bash
cd snake-game
```

Run the project:

Open `index.html` in your browser.

---

## How to Play

1. Start the game.
2. Control the snake using keyboard or swipe.
3. Eat food to grow and increase score.
4. Avoid walls.
5. Avoid colliding with yourself.
6. Try to beat your high score.

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla)

---

## Future Improvements

* Sound effects
* Difficulty levels
* Local storage for high score
* Different themes
* Speed increase system

---

## License

This project is open-source and free to use.
