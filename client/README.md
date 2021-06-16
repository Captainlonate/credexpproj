# Shapes and Simulation React

```
This is the ReactJS portion of the assignment. I spent about 85% of my time on this (leaving only about 10% for the API, and 5% for hosting).

There's so much I'd like to show and explain. But, I'll try to be respectful of your time.
```

## Ant Simulator
- The simulator only supports up to 20,000 steps because the grid size was so small that even on my 43" 4k monitor, I could barely see the cells.
- After 10,200 steps, the ant repeats a pattern, and tunnels to the top left
  - This drastically increased the board size necessary to display it
  - So, any value over about 11,000, is pretty pointless to simulate
- The speed at which the ant moves is based on how many total steps.
  - Fewer steps, slower ant. More steps, ant goes up to 60/second.
  - 20,000 steps took about 8 minutes to draw. Would you have preferred that I skip steps?
- I wrote all of the Ant Simulator code myself
  - I used the HTML5 `<canvas>` tag (which I've built many games with before).
  - Notice that the simulator resizes itself when the browser resizes, even during drawing 15,000 steps.
  - Notice it remains sharp on high resolution displays
  - Notice that the simulator is a perfect square.
    - The canvas resizes itself to fill it's parent, but remains a square and the drawings are not skewed.
  - I only draw the "dirty" squares that changed, not the entire board.
    - That's why even at 20,000 steps, you don't see a performance hit.
- The size of the grid is based on how many total steps.
  - Notice the difference between 15, 500, 10000, 15000 steps
- The grid lines are green when large cells need separated. They are white when cells are small.

## Shapes & Colors
- I wrote the Drag and Drop logic myself. I did not use a library on purpose.
- I wrote the color transition code and math myself. I did not use a library on purpose.
  - I support more than just 2 colors in a sequence.
  - For instance, if you choose 4 colors, you will see distinct colors at the 0%, 33%, 66%, and 100% intervals, with smooth transitions in between.
- To measure the distance traveled, I used the 4 corners of the screen as the "max distance".
  - I marked them with little boxes, which show the what color the shape should be at that area.
- The server returns SVG Path data for each shape, and I dynamically construct SVG's on the front-end.
- The moment you choose a(nother) color, I pre-calculate what color the shape should be at every % distance from 0 to 100.
  - In this way, I never have to calculate the same number twice, and I simply need to "look up" the value at that %.
  - For instance, at 13% distance from the center, I simply look in `colorSpectrum[13]` to get that color.
    - This makes it very performant.
- I did use a library for the dropdown menus (react-select) and I customized them.

## General Notes
- I used styled-components, create-react-app, react-router to create the actual website portion.
- I used chromaJS literally just for the react-select dropdown, so the options could have colorful options.
- All of the frontend code is behind a cloudfront distribution on AWS